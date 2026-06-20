<div align="center">
  <img src="public/logo.png" alt="MannSaathi Logo" width="180" />
  <h1>MannSaathi</h1>
  <p><strong>Der Asli Bimari Hai. Hum Ilaaj Hai.</strong></p>
  <p><em>A behavioral companion that understands human hesitation and transforms it into confident, timely health action.</em></p>
</div>

<div align="center">
  <a href="https://mannsaathi-mukk.onrender.com"><strong>Live Website</strong></a> ·
  <a href="https://github.com/ArshVermaGit/mannsaathi"><strong>GitHub Repository</strong></a> ·
  <a href="https://huggingface.co/ArshVerma/mannsaathi-symptom-classifier-large"><strong>AI Model (HuggingFace)</strong></a>
</div>

<br />

## 🌟 What is MannSaathi? (Project Explanation)
**MannSaathi** is a web-based AI healthcare companion designed to break the hesitation people feel when seeking medical help. Many individuals avoid doctors due to fear, anxiety, or cost. MannSaathi acts as a non-judgmental, anonymous friend (or "Bhai") who listens to your symptoms in English, Hindi, or Hinglish. 

It uses an advanced, custom-trained AI model to understand what you're experiencing, assesses the urgency of the symptoms, and gently guides you on the next best steps—whether it's a home remedy for something minor or an urgent visit to the doctor for something serious. **No sign-ups, no data tracking, 100% privacy.**

## 🔗 Important Links
- **Live Website:** [https://mannsaathi-mukk.onrender.com](https://mannsaathi-mukk.onrender.com)
- **GitHub Repository:** [https://github.com/ArshVermaGit/mannsaathi](https://github.com/ArshVermaGit/mannsaathi)
- **Deployed AI Model:** [https://huggingface.co/ArshVerma/mannsaathi-symptom-classifier-large](https://huggingface.co/ArshVerma/mannsaathi-symptom-classifier-large)
- **Kaggle Training Code:** [https://www.kaggle.com/code/arshvermadev/massive-multilingual-medical-diagnostic-ai/edit](https://www.kaggle.com/code/arshvermadev/massive-multilingual-medical-diagnostic-ai/edit)

## 🧠 AI Model & Datasets
Our custom massive multilingual AI brain (`xlm-roberta-large`) was trained to accurately parse symptoms, especially in Hinglish, and categorize them into medical domains.

**Exact Datasets Used:**
- `gretelai/symptom_to_diagnosis`
- `medalpaca/medical_meadow_wikidoc`

**Training:**
The model was fine-tuned on **Kaggle** using LoRA. You can find the exact training notebook here: 
[Massive Multilingual Medical Diagnostic AI](https://www.kaggle.com/code/arshvermadev/massive-multilingual-medical-diagnostic-ai/edit)

## 🚀 How to Run Locally

To run the complete MannSaathi stack (Frontend + AI Backend) on your local machine, follow these exact steps:

### 1. Set up the AI Backend
Navigate to the `ai-service` directory, install requirements, and start the FastAPI server.
```bash
# Clone the repository if you haven't already
git clone https://github.com/ArshVermaGit/mannsaathi.git
cd mannsaathi

# Go to the backend folder
cd ai-service

# Install the required Python packages
pip install -r requirements.txt

# Create a .env file and add your Hugging Face API token
echo "HF_API_TOKEN=your_token_here" > .env

# Start the local API server
uvicorn app.main:app --reload --port 10000
```

### 2. Start the Next.js Frontend
Open a new terminal window, ensure you are in the root `mannsaathi` directory, and start the web app.
```bash
# Install Node.js dependencies
npm install

# Start the frontend development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application!

---
<div align="center">
  <sub>Built with ❤️</sub>
</div>
