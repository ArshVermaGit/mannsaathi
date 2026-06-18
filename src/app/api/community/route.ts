import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get('location') || 'Lucknow';
    const period = searchParams.get('period') || '2026-06';

    // In a real scenario, this fetches from community_stats
    // We provide some default populated data if the DB is empty
    let stats = await prisma.communityStats.findUnique({
      where: { location_period: { location, period } }
    });

    if (!stats) {
      // Mock stats for demo purposes
      stats = {
        id: "mock_1",
        location,
        period,
        totalChecks: 4230,
        fearCount: 1200,
        stigmaCount: 1500,
        masculinityCount: 800,
        costCount: 400,
        timeCount: 200,
        denialCount: 130,
        topSymptoms: ["Fatigue", "Anxiety", "Chest Tightness"],
        weeklyTrend: [320, 340, 410, 390, 500, 600, 450] as any,
        updatedAt: new Date()
      };
    }

    // Get recent approved community contributions
    const contributions = await prisma.communityContribution.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    return NextResponse.json({
      location,
      period,
      stats,
      feedItems: contributions
    });

  } catch (error) {
    console.error("Community API Error:", error);
    return NextResponse.json({ error: "Failed to fetch community data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { outcome, barrierOvercome, location, consent } = body;

    if (!consent || !outcome) {
      return NextResponse.json({ error: "Consent and outcome are required" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const sessionId = cookieStore.get('mannsaathi_session')?.value;

    const contribution = await prisma.communityContribution.create({
      data: {
        sessionId,
        outcome,
        barrierOvercome,
        location,
        consentGiven: true,
        // Require moderation before appearing in feed
        isApproved: false 
      }
    });

    return NextResponse.json({ success: true, id: contribution.id });

  } catch (error) {
    console.error("Community Contribution Error:", error);
    return NextResponse.json({ error: "Failed to submit contribution" }, { status: 500 });
  }
}
