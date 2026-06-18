<div align="center">
  <img src="public/logo.png" alt="MannSaathi Logo" width="180" />
  <h1>MannSaathi</h1>
  <p><strong>Der Asli Bimari Hai. Hum Ilaaj Hai.</strong></p>
  <p><em>A behavioral companion that understands human hesitation and transforms it into confident, timely health action.</em></p>
</div>

<br />

## 🌟 Overview
In India, millions of people hesitate to visit a doctor due to anxiety, fear of judgment, or financial constraints. **MannSaathi** is not just a symptom checker—it's a 100% anonymous, highly accessible behavioral companion. It listens to your symptoms in English, Hindi, or Hinglish, determines the urgency using a massive medical AI model, and gently guides you toward taking the right medical action without causing panic.

## ✨ Key Features
- **Massive Multilingual AI Brain**: Powered by a custom `xlm-roberta-large` model fine-tuned on Kaggle with LoRA, capable of accurately parsing Hinglish and identifying 22+ complex medical symptom categories.
- **100% Anonymous & Private**: No sign-ups required. No data is tracked or stored.
- **Bhai Mode**: An empathetic, culturally resonant chat mode that speaks to users like an older brother to alleviate medical anxiety.
- **Ultra-Accessible Design**: Built for all. Features WCAG 2.1 Level AA compliance, robust screen reader support, keyboard navigation, and custom typography scaling for Hindi readers (Noto Sans Devanagari).
- **Smooth & Reassuring UI**: Implements subtle, hardware-accelerated Framer Motion micro-animations that respect `prefers-reduced-motion` settings to keep anxious users calm.

## 🏗️ Architecture & Tech Stack
MannSaathi is designed for global scale, running completely serverless:
- **Frontend**: Next.js 14, React, Tailwind CSS, Zustand, Framer Motion.
- **Backend / API**: FastAPI (Python) routing requests to the AI model.
- **AI Inference**: Hugging Face Serverless Inference API (Zero-cost hosting for massive models).
- **Testing**: Playwright (E2E) and Jest (Unit).

## 🚀 Quick Start (Local Development)

### 1. Set up the AI Backend
Navigate to the `ai-service` directory, install requirements, and start the FastAPI server:
```bash
cd ai-service
pip install -r requirements.txt

# Add your Hugging Face API token in .env first!
uvicorn app.main:app --reload --port 10000
```

### 2. Start the Next.js Frontend
In a new terminal window, start the main application:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## ☁️ Deployment
MannSaathi is built to be deployed seamlessly across the cloud:
1. **AI Model**: Hosted automatically on **Hugging Face** via the Inference API.
2. **Backend**: Deploy the `ai-service` folder as a Web Service on **Render** or **Railway**. Set your `HF_API_TOKEN` environment variable.
3. **Frontend**: Deploy the root Next.js project on **Vercel**. Set `NEXT_PUBLIC_API_URL` to point to your live Render backend.

## 🧠 Model Training (Kaggle)
If you wish to retrain the massive AI model on new datasets:
1. Open a new Kaggle Notebook with a T4x2 GPU.
2. Paste the contents of `ai-service/training/kaggle_train.py`.
3. The script will automatically download the datasets, inject LoRA adapters to prevent GPU Out-of-Memory errors, train the model, and push it directly back to Hugging Face.

---
<div align="center">
  <sub>Built with ❤️ for DesignVerse 2026</sub>
</div>
