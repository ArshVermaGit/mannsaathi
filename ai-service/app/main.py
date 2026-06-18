from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import SymptomInput, SymptomOutput, ChatInput, ChatOutput
from app.services.model_runner import ModelRunner
from app.safety import check_for_crisis, soften_diagnosis
import uuid

app = FastAPI(title="MannSaathi AI Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://mannsaathi.in", "http://localhost:3000"],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

model_runner = ModelRunner()

@app.get("/health")
def health_check():
    return {"status": "healthy", "models_loaded": True, "mode": "mock"}

@app.post("/analyze-symptoms", response_model=SymptomOutput)
async def analyze_symptoms(input_data: SymptomInput):
    # 1. Safety Check for crisis
    if check_for_crisis(input_data.text):
        # Override and return crisis response
        return SymptomOutput(
            categories=["crisis"],
            risk_score=1.0,
            risk_label="worth-attention",
            confidence=1.0,
            is_urgent=True,
            primary_message="It sounds like you are going through a very difficult time. Please know you don't have to face this alone.",
            possible_reasons=[],
            reassurances=["Help is available right now."],
            next_steps=[{
                "tier": "now",
                "label": "Immediate Support",
                "description": "Speak to someone who cares right now.",
                "actionText": "Call iCall: 9152987821",
                "actionHref": "tel:9152987821",
                "actionType": "crisis_redirect"
            }]
        )
        
    # 2. Run Inference
    result = model_runner.analyze(input_data.text, input_data.duration_days, input_data.severity)
    
    # 3. Apply Safety Softening
    result["primary_message"] = soften_diagnosis(result["primary_message"])
    
    return result

@app.post("/chat", response_model=ChatOutput)
async def chat(input_data: ChatInput):
    # Simulated chat response
    response_text = "I hear you, and it's completely normal to feel that way. Taking the first step is the hardest part. Would you like to explore some free clinics nearby?"
    
    if check_for_crisis(input_data.message):
        response_text = "Please reach out to iCall at 9152987821. They are completely free, anonymous, and ready to listen."
        
    return ChatOutput(
        message_id=str(uuid.uuid4()),
        content=response_text,
        quick_replies=["Yes, show me clinics", "No, just talk to me"],
        language="en"
    )
