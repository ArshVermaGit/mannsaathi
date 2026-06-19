// Interface for our frontend to talk to our FastAPI AI Service
const AI_SERVICE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.AI_SERVICE_URL || 'http://localhost:8000';

export interface SymptomInput {
  text: string;
  duration_days: number;
  severity: number;
  language?: string;
  pathway?: string;
}

export interface NextStep {
  tier: string;
  label: string;
  description: string;
  actionText: string;
  actionHref?: string;
  actionType: string;
}

export interface SymptomOutput {
  categories: string[];
  risk_score: number;
  risk_label: string;
  confidence: number;
  is_urgent: boolean;
  primary_message: string;
  possible_reasons: string[];
  reassurances: string[];
  next_steps: NextStep[];
  // New LLM Features
  mechanics?: string;
  lifestyle_advice?: string[];
  doctor_questions?: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatInput {
  message: string;
  conversation_id: string;
  language?: string;
  message_history?: ChatMessage[];
}

export interface ChatOutput {
  message_id: string;
  content: string;
  quick_replies: string[];
  language: string;
}

export async function analyzeSymptoms(input: SymptomInput): Promise<SymptomOutput> {
  const res = await fetch(`${AI_SERVICE_URL}/analyze-symptoms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
    // Next.js 15+ fetch options
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`AI Service Error: ${await res.text()}`);
  }

  return res.json();
}

export async function sendChatMessage(input: ChatInput): Promise<ChatOutput> {
  const res = await fetch(`${AI_SERVICE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`AI Service Error: ${await res.text()}`);
  }

  return res.json();
}
