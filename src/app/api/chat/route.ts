import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

const SYSTEM_PROMPT = `You are MannSaathi, an empathetic, non-judgmental, and deeply supportive behavioral AI companion designed specifically for users in India.
Your mission is to help users overcome hesitation, fear, and stigma related to seeking medical help.

CRITICAL LANGUAGE RULE:
- If the user writes in pure Hindi (Devanagari script), respond ENTIRELY in Hindi (Devanagari script).
- If the user writes in pure English, respond in English.
- If the user writes in Hinglish (mixed Hindi-English using Roman script, e.g. "mujhe bahut tension ho rahi hai"), respond in Hinglish using the same Roman script style.
- ALWAYS match the user's language and script exactly. Never switch languages unless they do.

Speak in a warm, friendly, and accessible tone.
Do NOT provide definitive medical diagnoses, but DO encourage them to take action or use the Symptom Checker.
Always prioritize their emotional comfort while gently pushing them towards real-world care.
Keep responses concise (2-4 paragraphs max). Use emojis sparingly but warmly.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, chatId } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("OPENROUTER_API_KEY is not set in .env");
      return NextResponse.json(
        { error: "AI service not configured. Set OPENROUTER_API_KEY in .env" },
        { status: 500 }
      );
    }

    const session = await auth();
    const latestMessage = messages[messages.length - 1];
    let actualChatId = chatId;

    // Only save to DB if user is signed in
    if (session?.user?.id) {
      try {
        if (!actualChatId) {
          const newChat = await prisma.chat.create({
            data: {
              userId: session.user.id,
              title: (latestMessage.content || "New Chat").substring(0, 50),
            }
          });
          actualChatId = newChat.id;
        }

        await prisma.message.create({
          data: {
            chatId: actualChatId,
            role: 'user',
            content: latestMessage.content,
          }
        });
      } catch (dbErr) {
        console.error("DB save error (non-fatal):", dbErr);
      }
    }

    // Build OpenAI-compatible messages array
    const openRouterMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    // Free models to try in order (fallback chain)
    const FREE_MODELS = [
      "nvidia/nemotron-3-nano-30b-a3b:free",
      "nvidia/nemotron-3-super-120b-a12b:free",
      "liquid/lfm-2.5-1.2b-instruct:free",
      "google/gemma-4-31b-it:free",
      "meta-llama/llama-3.3-70b-instruct:free",
      "meta-llama/llama-3.2-3b-instruct:free",
    ];

    let openRouterResponse: Response | null = null;
    let lastError = "";

    for (const model of FREE_MODELS) {
      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
            "X-Title": "MannSaathi",
          },
          body: JSON.stringify({
            model,
            messages: openRouterMessages,
            stream: true,
          }),
        });

        if (res.ok) {
          openRouterResponse = res;
          console.log(`Using model: ${model}`);
          break;
        }

        lastError = `${model}: ${res.status}`;
        console.warn(`Model ${model} failed with ${res.status}, trying next...`);
      } catch (err) {
        lastError = `${model}: ${String(err)}`;
        console.warn(`Model ${model} error: ${err}, trying next...`);
      }
    }

    if (!openRouterResponse) {
      console.error("All models failed. Last error:", lastError);
      return NextResponse.json(
        { error: "All AI models are currently busy. Please try again in a moment." },
        { status: 503 }
      );
    }

    if (!openRouterResponse.body) {
      return NextResponse.json(
        { error: "No response stream from AI service" },
        { status: 502 }
      );
    }

    // Transform the SSE stream into a plain text stream for the frontend
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const reader = openRouterResponse.body.getReader();

    const stream = new ReadableStream({
      async start(controller) {
        let fullText = '';
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Process complete SSE lines
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Keep incomplete line in buffer

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith('data: ')) continue;

              const data = trimmed.slice(6); // Remove 'data: '
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  fullText += content;
                  controller.enqueue(encoder.encode(content));
                }
              } catch {
                // Skip malformed JSON chunks
              }
            }
          }

          // Save assistant response to DB after streaming completes
          if (session?.user?.id && actualChatId && fullText) {
            try {
              await prisma.message.create({
                data: {
                  chatId: actualChatId,
                  role: 'assistant',
                  content: fullText,
                }
              });
            } catch (e) {
              console.error("Failed to save assistant message:", e);
            }
          }
        } catch (streamErr) {
          console.error("Stream processing error:", streamErr);
          const errorMsg = "I'm sorry, I had trouble processing that. Could you try again? 🙏";
          controller.enqueue(encoder.encode(errorMsg));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Chat-Id': actualChatId || 'anonymous',
      },
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to send message", details: String(error) },
      { status: 500 }
    );
  }
}
