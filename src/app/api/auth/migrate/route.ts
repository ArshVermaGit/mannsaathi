import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sessionId = body.sessionId;
    const session = await auth();

    if (!session?.user?.id || !sessionId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Find anonymous health logs and assign to user
    await prisma.healthLog.updateMany({
      where: { sessionId },
      data: { userId: session.user.id, sessionId: null }
    });

    // 2. Mark anonymous session as migrated
    await prisma.anonymousSession.update({
      where: { id: sessionId },
      data: { migratedToUserId: session.user.id }
    });

    return NextResponse.json({ migrated: true });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
