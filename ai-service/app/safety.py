import re

CRISIS_PATTERNS = [
    re.compile(r"(suicide|self.?harm|end my life|kill myself)", re.IGNORECASE),
    re.compile(r"(don't want to live|no reason to live)", re.IGNORECASE)
]

DIAGNOSIS_PATTERNS = [
    re.compile(r"you have (cancer|heart attack|stroke|tumor)", re.IGNORECASE)
]

def check_for_crisis(text: str) -> bool:
    """Checks if the user input contains emergency keywords."""
    for pattern in CRISIS_PATTERNS:
        if pattern.search(text):
            return True
    return False

def soften_diagnosis(text: str) -> str:
    """Ensures the AI does not provide definitive diagnoses."""
    for pattern in DIAGNOSIS_PATTERNS:
        # Replace definitive language with softer language
        text = pattern.sub(r"you might be experiencing symptoms related to \1, which requires a doctor's confirmation", text)
    return text
