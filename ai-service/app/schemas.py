from pydantic import BaseModel, Field
from typing import List, Optional

class SymptomInput(BaseModel):
    text: str = Field(..., description="The user's symptom description")
    duration_days: int = Field(..., description="Duration of symptoms in days")
    severity: float = Field(..., description="Severity from 1 to 10")
    language: str = Field("auto", description="Language preference: en, hi, or auto")
    pathway: str = Field("general", description="Mental, physical, or fatigue")

class NextStep(BaseModel):
    tier: str
    label: str
    description: str
    actionText: str
    actionHref: Optional[str] = None
    actionType: str

class SymptomOutput(BaseModel):
    categories: List[str]
    risk_score: float
    risk_label: str
    confidence: float
    is_urgent: bool
    primary_message: str
    possible_reasons: List[str]
    reassurances: List[str]
    next_steps: List[NextStep]

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatInput(BaseModel):
    message: str
    conversation_id: str
    language: str = "auto"
    message_history: List[ChatMessage] = []

class ChatOutput(BaseModel):
    message_id: str
    content: str
    quick_replies: List[str]
    language: str
