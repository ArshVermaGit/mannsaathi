import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

// Helper: Call the Python trained model (optional enrichment)
async function getTrainedModelClassification(text: string, duration: number, severity: number, pathway: string, language: string) {
  const AI_SERVICE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
  try {
    const res = await fetch(`${AI_SERVICE_URL}/analyze-symptoms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, duration_days: duration, severity, pathway, language }),
      signal: AbortSignal.timeout(8000), // 8 second timeout
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Trained model unavailable, proceeding with AI-only mode:", err);
  }
  return null; // Model unavailable - that's fine, AI will handle everything
}

// Helper: Call OpenRouter LLM
async function getLLMAnalysis(text: string, duration: number, severity: number, trainedModelHint: string | null) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;

  const modelContext = trainedModelHint
    ? `Our trained classification model suggests categories: ${trainedModelHint}. Use this as supplementary context but form your own clinical judgment.`
    : `No trained model is available. Rely entirely on your medical knowledge.`;

  const systemPrompt = `You are an expert, empathetic medical AI for MannSaathi, a health platform in India.
The user has reported symptoms: "${text}"
Duration: ${duration || 1} day(s), Severity: ${severity || 5}/10.
${modelContext}

CRITICAL LANGUAGE RULE:
- Detect the language of the user's symptom text above.
- If written in Hindi (Devanagari), respond with ALL text fields in Hindi (Devanagari script).
- If written in English, respond in English.
- If written in Hinglish (Roman script Hindi-English mix like "sir mein dard ho raha hai"), respond in the SAME Hinglish style using Roman script.
- ALWAYS match the user's language exactly in every text field.

Analyze this deeply and return a JSON object with this EXACT structure (raw JSON only, no markdown):
{
  "primary_message": "A warm, empathetic 2-3 sentence summary in the SAME LANGUAGE as the user's input. Never mention 'mock', 'test', 'demo', or 'classification model'.",
  "possible_reasons": ["2-3 specific medical possibilities as strings, in the user's language"],
  "mechanics": "A clear explanation of WHY the user's body/mind is producing these symptoms, in the user's language",
  "lifestyle_advice": ["3 specific, actionable lifestyle/diet/home remedies, in the user's language"],
  "doctor_questions": ["3 specific questions the user should ask their doctor, in the user's language"],
  "risk_level": "low",
  "risk_score": 0.3,
  "is_urgent": false,
  "categories": ["relevant_category_in_english"]
}

IMPORTANT RULES:
- risk_level must be exactly one of: "low", "moderate", "worth-attention"
- risk_score must be a number between 0 and 1
- is_urgent must be true only for life-threatening situations
- For severity >= 8 or dangerous symptoms (chest pain, difficulty breathing, suicidal thoughts), set risk_level to "worth-attention" and is_urgent to true
- categories must always be in English (for internal use)
- ALL other text fields must be in the SAME language as the user's input
- Be medically accurate but warm and reassuring in tone`;

  const FREE_MODELS = [
    "qwen/qwen-2-7b-instruct:free",
    "microsoft/phi-3-mini-128k-instruct:free",
    "huggingfaceh4/zephyr-7b-beta:free",
    "openchat/openchat-7b:free",
    "meta-llama/llama-3.1-8b-instruct:free",
    "google/gemma-2-9b-it:free",
    "mistralai/mistral-7b-instruct:free",
  ];

  for (const model of FREE_MODELS) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
          "X-Title": "MannSaathi Symptom Analyzer",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Analyze these symptoms and respond in the SAME language as the symptom text below. If it's Hinglish (Roman script Hindi), respond in Hinglish. If it's Hindi (Devanagari), respond in Hindi. If it's English, respond in English.\n\nSymptom text: "${text}"` }
          ],
          response_format: { type: "json_object" },
          temperature: 0.3,
        }),
        signal: AbortSignal.timeout(30000),
      });

      if (!res.ok) {
        console.warn(`Model ${model} returned ${res.status}, trying next...`);
        continue;
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        const jsonStr = content.replace(/```json\n?|```/g, '').trim();
        const parsed = JSON.parse(jsonStr);
        
        // Validate the structure to ensure we didn't just get a lazy LLM response with empty arrays/strings
        const hasPrimaryMessage = parsed.primary_message && parsed.primary_message.trim().length > 0;
        const hasMechanics = parsed.mechanics && parsed.mechanics.trim().length > 0;
        const hasReasons = parsed.possible_reasons && Array.isArray(parsed.possible_reasons) && parsed.possible_reasons.length > 0;
        const hasLifestyle = parsed.lifestyle_advice && Array.isArray(parsed.lifestyle_advice) && parsed.lifestyle_advice.length > 0;
        const hasDoctorQs = parsed.doctor_questions && Array.isArray(parsed.doctor_questions) && parsed.doctor_questions.length > 0;

        if (!hasPrimaryMessage || !hasMechanics || !hasReasons || !hasLifestyle || !hasDoctorQs) {
          console.warn(`Model ${model} returned incomplete JSON structure (missing or empty essential fields), trying next...`);
          continue;
        }
        
        console.log(`✅ LLM analysis successful with model: ${model}`);
        return parsed;
      }
    } catch (err) {
      console.warn(`LLM model ${model} failed:`, err);
    }
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, duration, severity, pathway, language } = body;

    if (!text) {
      return NextResponse.json({ error: "Symptom text is required" }, { status: 400 });
    }

    const session = await auth();

    // 1. Try to get trained model classification (non-blocking enrichment)
    const trainedResult = await getTrainedModelClassification(
      text, duration || 1, severity || 5, pathway || "general", language || "en"
    );

    const trainedCategories = trainedResult?.categories?.join(", ") || null;

    // 2. Get LLM analysis (this is the PRIMARY source of truth)
    const llmResult = await getLLMAnalysis(text, duration || 1, severity || 5, trainedCategories);

    // 3. Build final response - LLM is primary, trained model is supplementary
    let finalResponse;

    if (llmResult) {
      // AI generated everything
      finalResponse = {
        categories: llmResult.categories || trainedResult?.categories || ["general"],
        risk_score: typeof llmResult.risk_score === 'number' ? llmResult.risk_score : (trainedResult?.risk_score || 0.3),
        risk_label: llmResult.risk_level || trainedResult?.risk_label || "low",
        confidence: trainedResult?.confidence || 0.85,
        is_urgent: llmResult.is_urgent === true,
        primary_message: llmResult.primary_message || "We've received your symptoms and processed them. While our AI is temporarily unavailable for deep analysis, we recommend consulting a healthcare provider for a thorough evaluation.",
        possible_reasons: llmResult.possible_reasons || [],
        reassurances: trainedResult?.reassurances || ["You did the brave thing by checking."],
        next_steps: trainedResult?.next_steps || [],
        mechanics: llmResult.mechanics || "",
        lifestyle_advice: llmResult.lifestyle_advice || [],
        doctor_questions: llmResult.doctor_questions || [],
      };
    } else if (trainedResult) {
      // Trained model only (LLM failed) - still no mock text
      finalResponse = {
        ...trainedResult,
        primary_message: trainedResult.primary_message?.includes("Mock")
          ? "We've analyzed your symptoms. Please review the details below for guidance."
          : (trainedResult.primary_message || "We've analyzed your symptoms. Please review the details below for guidance."),
        mechanics: trainedResult.mechanics || "Based on the symptoms you described, your body may be responding to stress, infection, or an underlying condition. We recommend consulting a healthcare provider for a thorough evaluation.",
        lifestyle_advice: trainedResult.lifestyle_advice || ["Stay hydrated and rest well", "Practice deep breathing exercises", "Maintain a balanced diet"],
        doctor_questions: trainedResult.doctor_questions || ["What could be causing these symptoms?", "Are there any tests I should take?", "What lifestyle changes would you recommend?"],
      };
    } else {
      // Both failed - pure fallback (still no mock text)
      finalResponse = {
        categories: ["general"],
        risk_score: 0.3,
        risk_label: "low",
        confidence: 0.5,
        is_urgent: false,
        primary_message: "We've received your symptoms and processed them. While our AI is temporarily unavailable for deep analysis, we recommend consulting a healthcare provider for a thorough evaluation.",
        possible_reasons: ["Further evaluation needed"],
        reassurances: ["You did the right thing by checking."],
        next_steps: [],
        mechanics: "Your symptoms warrant professional attention for proper diagnosis.",
        lifestyle_advice: ["Stay hydrated", "Get adequate rest", "Monitor your symptoms"],
        doctor_questions: ["What could be causing these symptoms?", "What tests should I take?", "What are my treatment options?"],
      };
    }

    // 4. Removed auto-save logic to allow explicit manual saving.

    return NextResponse.json({
      analysisId: uuidv4(),
      ...finalResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Symptom Analysis Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze symptoms", details: String(error) },
      { status: 500 }
    );
  }
}
