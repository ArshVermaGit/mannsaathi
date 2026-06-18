import { NextResponse } from 'next/server';
import { analyzeSymptoms } from '@/lib/ai-client';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, duration, severity, pathway, language } = body;

    if (!text) {
      return NextResponse.json({ error: "Symptom text is required" }, { status: 400 });
    }

    // 1. Get or create anonymous session
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('mannsaathi_session')?.value;
    
    if (!sessionId) {
      const newId = uuidv4();
      cookieStore.set('mannsaathi_session', newId, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        path: '/',
      });
      sessionId = newId;
      
      // Ensure session exists in DB
      await prisma.anonymousSession.create({
        data: { id: sessionId, language: language === 'hi' ? 'HI' : 'EN' }
      }).catch(e => console.error("Error creating session:", e));
    }

    // 2. Call the AI Service
    const aiResponse = await analyzeSymptoms({
      text,
      duration_days: duration || 1,
      severity: severity || 5,
      pathway: pathway || "general",
      language: language || "en"
    });

    // 3. Save the interaction to Prisma HealthLog (Anonymous)
    try {
      // Map the string risk label to the Enum
      const enumRiskLevel = aiResponse.risk_label === "low" ? "LOW" 
                          : aiResponse.risk_label === "moderate" ? "MODERATE" 
                          : "WORTH_ATTENTION";

      // Map pathway
      const enumPathway = pathway === "mental" ? "MENTAL"
                        : pathway === "fatigue" ? "FATIGUE"
                        : "GENERAL";

      await prisma.healthLog.create({
        data: {
          sessionId,
          pathway: enumPathway,
          symptomIds: aiResponse.categories,
          durationDays: duration || 1,
          severity: severity || 5,
          language: language === 'hi' ? 'HI' : 'EN',
          riskLevel: enumRiskLevel,
          riskScore: aiResponse.risk_score,
          primaryMessage: aiResponse.primary_message,
          possibleReasons: aiResponse.possible_reasons,
          confidence: aiResponse.confidence,
          isUrgent: aiResponse.is_urgent,
        }
      });
      
      // Update session activity
      await prisma.anonymousSession.update({
        where: { id: sessionId },
        data: { 
          totalChecks: { increment: 1 },
          lastActiveAt: new Date()
        }
      }).catch(e => console.error("Could not update session:", e));
      
    } catch (dbError) {
      console.error("Database Error:", dbError);
      // We don't fail the request if saving logs fails, user experience first.
    }

    return NextResponse.json({
      analysisId: uuidv4(), // Generate temporary ID if DB failed
      ...aiResponse,
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
