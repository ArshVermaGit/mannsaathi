export interface NextStep {
  tier: string;
  label: string;
  description: string;
  actionText: string;
  actionHref?: string;
  actionType: string;
}

export interface SymptomResult {
  analysisId?: string;
  categories: string[];
  risk_score: number;
  risk_label: string;
  confidence: number;
  is_urgent: boolean;
  primary_message: string;
  possible_reasons: string[];
  reassurances: string[];
  next_steps: NextStep[];
  timestamp?: string;
}

export interface SymptomInput {
  text: string;
  duration_days: number;
  severity: number;
  language?: string;
  pathway?: string;
}
