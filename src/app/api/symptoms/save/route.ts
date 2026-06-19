import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { finalResponse, duration, severity, pathway, language } = body;

    const enumRiskLevel = finalResponse.risk_label === "low" ? "LOW"
      : finalResponse.risk_label === "moderate" ? "MODERATE"
        : "WORTH_ATTENTION";

    const enumPathway = pathway === "mental" ? "MENTAL"
      : pathway === "fatigue" ? "FATIGUE"
        : "GENERAL";

    await prisma.healthLog.create({
      data: {
        userId: session.user.id,
        pathway: enumPathway,
        symptomIds: finalResponse.categories || ["general"],
        durationDays: duration || 1,
        severity: severity || 5,
        language: language === 'hi' ? 'HI' : 'EN',
        riskLevel: enumRiskLevel,
        riskScore: finalResponse.risk_score || 0.3,
        primaryMessage: finalResponse.primary_message || "",
        possibleReasons: finalResponse.possible_reasons || [],
        confidence: finalResponse.confidence || 0.85,
        isUrgent: finalResponse.is_urgent || false,
      }
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        totalChecks: { increment: 1 },
        lastCheckAt: new Date()
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save Result Error:", error);
    return NextResponse.json(
      { error: "Failed to save results", details: String(error) },
      { status: 500 }
    );
  }
}
