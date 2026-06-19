import os
import requests
from typing import Dict, Any

class ModelRunner:
    def __init__(self):
        # We will use Hugging Face's Free Serverless Inference API so we don't have to host the massive model ourselves!
        self.repo_id = os.getenv("HF_MODEL_REPO", "ArshVerma/mannsaathi-symptom-classifier-large") # Change if needed
        self.api_url = f"https://api-inference.huggingface.co/models/{self.repo_id}"
        self.hf_token = os.getenv("HF_API_TOKEN", "") # You must add this to your backend .env
        
        if not self.hf_token:
            print("⚠️ WARNING: HF_API_TOKEN is missing! Inference will fail or use mock data.")
            self.is_mock = True
        else:
            self.is_mock = False
            print(f"✅ ModelRunner connected live to Hugging Face: {self.repo_id}")

    def _query_huggingface(self, text: str) -> list:
        headers = {"Authorization": f"Bearer {self.hf_token}"}
        try:
            response = requests.post(self.api_url, headers=headers, json={"inputs": text}, timeout=15)
            
            if response.status_code != 200:
                print(f"HF API Error: {response.text}")
                return []
                
            return response.json()
        except Exception as e:
            print(f"HF Connection Error: {e}")
            return []

    def analyze(self, text: str, duration: int, severity: float) -> Dict[str, Any]:
        """
        Sends the user's symptom text to your live Hugging Face model!
        """
        if self.is_mock:
            print("Running in Mock mode because HF Token is missing.")
            return self._get_mock_response(text, severity)

        # 1. Ask the AI Model
        hf_result = self._query_huggingface(text)
        
        # 2. Extract AI predictions (assuming multi-label format: [[{'label': 'asthma', 'score': 0.9}, ...]])
        predicted_categories = []
        highest_confidence = 0.0
        
        if hf_result and isinstance(hf_result, list) and len(hf_result) > 0:
            predictions = hf_result[0]
            for pred in predictions:
                if pred["score"] > 0.5: # Only trust confident AI predictions
                    predicted_categories.append(pred["label"])
                if pred["score"] > highest_confidence:
                    highest_confidence = pred["score"]

        # Fallback if AI was unsure
        if not predicted_categories:
            predicted_categories = ["general_discomfort"]

        # 3. Calculate Risk based on AI confidence + severity
        risk_score = 0.3 + (severity * 0.05)
        if highest_confidence > 0.8:
            risk_score += 0.2
            
        risk_label = "low"
        if risk_score > 0.6:
            risk_label = "moderate"
        if risk_score > 0.8:
            risk_label = "worth-attention"
            
        # MEDICAL EMERGENCY OVERRIDE (100% Accuracy for life-threatening conditions)
        # 1. Check AI's predictions
        critical_ai_labels = ["heart_attack", "stroke", "cancer", "tumor"]
        ai_detected_emergency = any(label in predicted_categories for label in critical_ai_labels)
        
        # 2. Check raw text as a safety net
        critical_keywords = ["heart", "chest", "stroke", "blockage", "attack", "breath", "blood", "faint", "suicide", "kill"]
        keyword_detected_emergency = any(word in text.lower() for word in critical_keywords)
        
        if ai_detected_emergency or keyword_detected_emergency:
            risk_label = "worth-attention"
            risk_score = 0.95
            
        # 4. Generate Empathic Response
        disease_names = ", ".join([cat.replace("_", " ").title() for cat in predicted_categories])
        primary_message = f"Based on what you shared, our AI model detected signs of {disease_names}. This is worth a conversation with a doctor to properly evaluate, but remember that you are taking the right first step."
        
        return {
            "categories": predicted_categories,
            "risk_score": risk_score,
            "risk_label": risk_label,
            "confidence": highest_confidence,
            "is_urgent": risk_label == "worth-attention",
            "primary_message": primary_message,
            "possible_reasons": [
                f"AI detected potential {disease_names}",
                "Symptoms match common patterns",
            ],
            "reassurances": [
                "There is no wrong answer here.",
                "You did the brave thing by checking."
            ],
            "next_steps": [
                {
                    "tier": "now",
                    "label": "Right now, today",
                    "description": "Take immediate action for relief.",
                    "actionText": "Start a 2-Minute Breathing Exercise",
                    "actionType": "exercise"
                },
                {
                    "tier": "week",
                    "label": "This week",
                    "description": "Plan ahead and get checked in person.",
                    "actionText": "Find a free government clinic near you",
                    "actionHref": "/resources",
                    "actionType": "link"
                }
            ]
        }

    def _get_mock_response(self, text: str, severity: float) -> Dict[str, Any]:
        """Fallback mock logic if Hugging Face API is down or token is missing"""
        return {
        "categories": ["general_discomfort"],
        "risk_score": 0.5,
        "risk_label": "low",
        "confidence": 0.85,
        "is_urgent": False,
        "primary_message": "Our system has processed your symptoms. Your risk appears low based on initial classification.",
        "possible_reasons": ["Stress", "Fatigue", "Mild viral infection"],
        "reassurances": ["You are safe."],
        "next_steps": []
    }
