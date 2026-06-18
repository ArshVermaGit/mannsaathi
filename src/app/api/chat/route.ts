import { NextResponse } from 'next/server';
import { sendChatMessage } from '@/lib/ai-client';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, conversationId, language, messageHistory } = body;

    if (!message || !conversationId) {
      return NextResponse.json({ error: "Message and conversationId are required" }, { status: 400 });
    }

    // Ensure session exists
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
    }

    // Call the AI Service for chat response
    const aiResponse = await sendChatMessage({
      message,
      conversation_id: conversationId,
      language: language || "auto",
      message_history: messageHistory || []
    });

    return NextResponse.json(aiResponse);

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to send message", details: String(error) },
      { status: 500 }
    );
  }
}
