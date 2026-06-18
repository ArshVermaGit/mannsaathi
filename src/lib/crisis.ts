const CRISIS_KEYWORDS = [
  "suicide", "kill myself", "end my life", "want to die",
  "suicidal", "hurt myself", "no reason to live", "can't go on",
  "mujhe kuch nahi chahiye jeena", "marne ka man", "khatam karna"
];

export function detectCrisis(input: string): boolean {
  if (!input) return false;
  
  const normalizedInput = input.toLowerCase();
  
  for (const keyword of CRISIS_KEYWORDS) {
    if (normalizedInput.includes(keyword)) {
      return true;
    }
  }
  
  return false;
}
