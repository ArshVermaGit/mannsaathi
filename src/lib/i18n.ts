// Centralized translations for MannSaathi
// Every UI string in the app should come from here

export type Locale = 'en' | 'hi';

const translations = {
  // Navbar
  "nav.howItWorks": { en: "How It Works", hi: "कैसे काम करता है" },
  "nav.stories": { en: "Stories", hi: "कहानियाँ" },
  "nav.resources": { en: "Resources", hi: "संसाधन" },
  "nav.newCheck": { en: "New Check", hi: "नई जाँच" },
  "nav.startAnonymous": { en: "Start (Anonymous)", hi: "शुरू करें (गुमनाम)" },
  "nav.signIn": { en: "Sign In", hi: "साइन इन" },
  "nav.signOut": { en: "Sign Out", hi: "साइन आउट" },

  // Check Entry Page (Step 1)
  "check.title": { en: "How are you feeling today?", hi: "आज आप कैसा महसूस कर रहे हैं?" },
  "check.subtitle": { en: "Select an area to start. No medical jargon needed.", hi: "शुरू करने के लिए एक क्षेत्र चुनें। किसी चिकित्सा शब्दावली की ज़रूरत नहीं।" },
  "check.mindMood": { en: "Mind & Mood", hi: "मन और मूड" },
  "check.mindMoodDesc": { en: "Stress, anxiety, sleep, sadness", hi: "तनाव, चिंता, नींद, उदासी" },
  "check.bodyPhysical": { en: "Body & Physical", hi: "शरीर और शारीरिक" },
  "check.bodyPhysicalDesc": { en: "Pain, breathing, digestion", hi: "दर्द, साँस, पाचन" },
  "check.tiredStressed": { en: "Tired & Stressed", hi: "थकान और तनाव" },
  "check.tiredStressedDesc": { en: "Burnout, low energy, fatigue", hi: "बर्नआउट, कम ऊर्जा, थकान" },
  "check.notSure": { en: "Not Sure", hi: "पता नहीं" },
  "check.notSureDesc": { en: "General checkup", hi: "सामान्य जाँच" },

  // Symptoms Page (Step 2)
  "symptoms.title": { en: "What have you been noticing?", hi: "आपने क्या महसूस किया है?" },
  "symptoms.subtitle": { en: "Select all that apply or describe it below.", hi: "जो भी लागू हो उसे चुनें या नीचे बताएं।" },
  "symptoms.headaches": { en: "Headaches", hi: "सिर दर्द" },
  "symptoms.chestTightness": { en: "Chest tightness", hi: "सीने में जकड़न" },
  "symptoms.troubleSleeping": { en: "Trouble sleeping", hi: "नींद न आना" },
  "symptoms.lowEnergy": { en: "Low energy", hi: "कम ऊर्जा" },
  "symptoms.moodChanges": { en: "Mood changes", hi: "मूड बदलना" },
  "symptoms.bodyAches": { en: "Body aches", hi: "शरीर में दर्द" },
  "symptoms.describeLabel": { en: "Describe in your own words", hi: "अपने शब्दों में बताएं" },
  "symptoms.placeholder": { en: "I've been feeling unusually tired after work and having trouble falling asleep...", hi: "काम के बाद मुझे असामान्य रूप से थकान महसूस हो रही है और नींद नहीं आती..." },
  "symptoms.howLong": { en: "How long has this been happening?", hi: "यह कब से हो रहा है?" },
  "symptoms.fewDays": { en: "A few days", hi: "कुछ दिन" },
  "symptoms.weeks": { en: "Weeks", hi: "हफ्ते" },
  "symptoms.months": { en: "Months", hi: "महीने" },
  "symptoms.overYear": { en: "Over a year", hi: "एक साल से ज़्यादा" },
  "symptoms.continue": { en: "Continue", hi: "आगे बढ़ें" },

  // Result Page (Step 3)
  "result.title": { en: "Here is what we found.", hi: "हमने यह पाया।" },
  "result.lowRisk": { en: "Low Risk", hi: "कम जोखिम" },
  "result.moderate": { en: "Moderate", hi: "मध्यम" },
  "result.worthAttention": { en: "Worth Attention", hi: "ध्यान देने योग्य" },
  "result.whyFeeling": { en: "Why am I feeling this way?", hi: "मुझे ऐसा क्यों लग रहा है?" },
  "result.possibleConditions": { en: "Possible Conditions", hi: "संभावित स्थितियाँ" },
  "result.lifestyleAdvice": { en: "Lifestyle & Diet Advice", hi: "जीवनशैली और आहार सलाह" },
  "result.doctorQuestions": { en: "Questions for Your Doctor", hi: "डॉक्टर से पूछने के सवाल" },
  "result.doctorQuestionsDesc": { en: "Take these questions with you to your next appointment to get the best care:", hi: "सबसे अच्छी देखभाल के लिए अपनी अगली अपॉइंटमेंट में ये सवाल ज़रूर पूछें:" },
  "result.saveResults": { en: "Save my results", hi: "मेरे परिणाम सहेजें" },
  "result.seeNextSteps": { en: "See Next Steps", hi: "अगले कदम देखें" },
  "result.backToHome": { en: "Return Home", hi: "होम पर वापस जाएं" },
  "result.analyzing": { en: "Analyzing...", hi: "विश्लेषण कर रहा है..." },

  // Save Modal
  "saveModal.title": { en: "Save Your Results?", hi: "क्या आप अपने परिणाम सहेजना चाहते हैं?" },
  "saveModal.subtitle": { en: "You can save this analysis to your dashboard to track your health history over time.", hi: "आप समय के साथ अपने स्वास्थ्य इतिहास को ट्रैक करने के लिए इस विश्लेषण को अपने डैशबोर्ड में सहेज सकते हैं।" },
  "saveModal.save": { en: "Save to Dashboard", hi: "डैशबोर्ड में सहेजें" },
  "saveModal.dontSave": { en: "Don't Save", hi: "न सहेजें" },

  // Logout Modal
  "logoutModal.title": { en: "Sign Out?", hi: "साइन आउट करें?" },
  "logoutModal.subtitle": { en: "Are you sure you want to sign out of your account?", hi: "क्या आप वाकई अपने खाते से साइन आउट करना चाहते हैं?" },
  "logoutModal.confirm": { en: "Yes, Sign Out", hi: "हां, साइन आउट करें" },
  "logoutModal.cancel": { en: "Cancel", hi: "रद्द करें" },

  "result.timeout": { en: "Analysis Timeout", hi: "विश्लेषण समय समाप्त" },
  "result.timeoutDesc": { en: "The AI took too long to respond. Please click retry!", hi: "AI को जवाब देने में बहुत समय लगा। कृपया पुनः प्रयास करें!" },
  "result.retry": { en: "Retry Analysis", hi: "फिर से विश्लेषण करें" },

  // Loading messages
  "loading.msg1": { en: "There's no wrong answer here...", hi: "यहाँ कोई ग़लत जवाब नहीं है..." },
  "loading.msg2": { en: "Most symptoms are manageable...", hi: "ज़्यादातर लक्षण नियंत्रित किए जा सकते हैं..." },
  "loading.msg3": { en: "You did something brave today...", hi: "आज आपने कुछ बहादुरी का काम किया..." },

  // Next Steps Modal
  "nextSteps.title": { en: "What to do next", hi: "आगे क्या करें" },
  "nextSteps.subtitle": { en: "Take it one step at a time. Choose the pace that feels right for you.", hi: "एक-एक कदम बढ़ाएं। वह गति चुनें जो आपके लिए सही लगे।" },
  "nextSteps.rightNow": { en: "Right now, today", hi: "अभी, आज" },
  "nextSteps.rightNowDesc": { en: "Take immediate action for relief.", hi: "राहत के लिए तुरंत कदम उठाएं।" },
  "nextSteps.thisWeek": { en: "This week", hi: "इस हफ्ते" },
  "nextSteps.thisWeekDesc": { en: "Plan ahead and get checked in person.", hi: "आगे की योजना बनाएं और जाँच करवाएं।" },
  "nextSteps.learnMore": { en: "Learn more first", hi: "पहले और जानें" },
  "nextSteps.learnMoreDesc": { en: "Read up on what this could be without the scary jargon.", hi: "बिना डरावने शब्दों के जानें कि यह क्या हो सकता है।" },
  "nextSteps.close": { en: "Close", hi: "बंद करें" },

  // Steps
  "step": { en: "Step", hi: "चरण" },
  "of": { en: "of", hi: "का" },

  // Chat
  "chat.greeting": { en: "Namaste! I'm your MannSaathi — here to listen, not judge.", hi: "नमस्ते! मैं आपका मन-साथी हूँ — सुनने के लिए, जज करने के लिए नहीं।" },
  "chat.whatOnMind": { en: "What's on your mind today?", hi: "आज आपके मन में क्या है?" },
  "chat.quickReply1": { en: "I'm not feeling well", hi: "मुझे अच्छा नहीं लग रहा" },
  "chat.quickReply2": { en: "I need to find a doctor", hi: "मुझे डॉक्टर की ज़रूरत है" },
  "chat.quickReply3": { en: "I'm worried about something", hi: "मुझे किसी बात की चिंता है" },
  "chat.quickReply4": { en: "I just want to talk", hi: "बस बात करना चाहता हूँ" },
  "chat.placeholder": { en: "Type your message...", hi: "अपना संदेश लिखें..." },
  "chat.thinking": { en: "Thinking...", hi: "सोच रहा हूँ..." },

  // Footer / misc
  // Footer
  "footer.description": { en: "A behavioral companion that understands human hesitation and transforms it into confident, timely health action.", hi: "एक ऐसा साथी जो इंसानी झिझक को समझता है और उसे सही समय पर आत्मविश्वास से भरे स्वास्थ्य कदमों में बदल देता है।" },
  "footer.builtFor": { en: "Built for DesignVerse 2026", hi: "DesignVerse 2026 के लिए निर्मित" },
  "footer.product": { en: "Product", hi: "उत्पाद" },
  "footer.symptomChecker": { en: "Symptom Checker", hi: "लक्षण जाँचकर्ता" },
  "footer.aiCompanion": { en: "AI Companion", hi: "AI साथी" },
  "footer.healthMoments": { en: "Health Moments", hi: "स्वास्थ्य पल" },
  "footer.bhaiMode": { en: "Bhai Mode", hi: "भाई मोड" },
  "footer.resources": { en: "Resources", hi: "संसाधन" },
  "footer.freeCareFinder": { en: "Free Care Finder", hi: "मुफ्त देखभाल खोजक" },
  "footer.communityPulse": { en: "Community Pulse", hi: "सामुदायिक नब्ज" },
  "footer.realStories": { en: "Real Stories", hi: "सच्ची कहानियाँ" },
  "footer.aboutUs": { en: "About Us", hi: "हमारे बारे में" },
  "footer.copyright": { en: "© 2026 MannSaathi. 100% Anonymous.", hi: "© 2026 मन-साथी। 100% गुमनाम।" },
  "footer.privacy": { en: "Privacy Policy", hi: "गोपनीयता नीति" },
  "footer.terms": { en: "Terms of Service", hi: "सेवा की शर्तें" },
  "footer.links": { en: "Links", hi: "लिंक्स" },
  "footer.github": { en: "GitHub Repository", hi: "गिटहब रिपोजिटरी" },
  "footer.aiModel": { en: "AI Model (HuggingFace)", hi: "AI मॉडल (हगिंगफेस)" },
  "footer.anonymous": { en: "100% Anonymous", hi: "100% गुमनाम" },
  "footer.exitHome": { en: "Exit to Home", hi: "होम पर जाएँ" },

  // Legal Pages
  "privacy.title": { en: "Privacy Policy", hi: "गोपनीयता नीति" },
  "privacy.lastUpdated": { en: "Last updated: June 2026", hi: "अंतिम अपडेट: जून 2026" },
  "privacy.s1.title": { en: "1. Absolute Anonymity Guarantee", hi: "1. पूर्ण गुमनामी की गारंटी" },
  "privacy.s1.text": { en: "If you use MannSaathi without logging in, we absolutely guarantee that zero medical or behavioral data is saved to our databases. Your session data lives entirely in your browser and vanishes the moment you leave the site. We do not track IPs, we do not drop persistent cookies for anonymous users, and we do not sell data to third parties.", hi: "यदि आप लॉग इन किए बिना मन-साथी का उपयोग करते हैं, तो हम पूरी गारंटी देते हैं कि हमारे डेटाबेस में कोई चिकित्सा या व्यवहार संबंधी डेटा सहेजा नहीं जाता है। आपका सत्र डेटा पूरी तरह से आपके ब्राउज़र में रहता है और साइट छोड़ते ही मिट जाता है। हम आईपी ट्रैक नहीं करते हैं, हम गुमनाम उपयोगकर्ताओं के लिए कुकीज़ नहीं छोड़ते हैं, और हम तीसरे पक्ष को डेटा नहीं बेचते हैं।" },
  "privacy.s2.title": { en: "2. Authenticated Users", hi: "2. प्रमाणित उपयोगकर्ता" },
  "privacy.s2.text": { en: "If you actively choose to log in via Google to track your health history, we securely save your basic profile information (Name, Email, Avatar) and the historical symptom logs you generate. This data is strictly encrypted at rest using industry-standard protocols.", hi: "यदि आप अपने स्वास्थ्य इतिहास को ट्रैक करने के लिए Google के माध्यम से लॉग इन करना चुनते हैं, तो हम आपकी बुनियादी प्रोफ़ाइल जानकारी (नाम, ईमेल, अवतार) और आपके द्वारा उत्पन्न ऐतिहासिक लक्षण लॉग को सुरक्षित रूप से सहेजते हैं। यह डेटा उद्योग-मानक प्रोटोकॉल का उपयोग करके पूरी तरह से एन्क्रिप्ट किया गया है।" },
  "privacy.s3.title": { en: "3. AI Processing", hi: "3. AI प्रोसेसिंग" },
  "privacy.s3.text": { en: "The symptom text you enter is processed securely by our backend AI models. No personally identifiable information (PII) is ever sent to the AI unless you explicitly type it into the symptom box. The AI retains zero memory of your queries.", hi: "आपके द्वारा दर्ज किया गया लक्षण पाठ हमारे बैकएंड एआई मॉडल द्वारा सुरक्षित रूप से संसाधित किया जाता है। कोई भी व्यक्तिगत रूप से पहचान योग्य जानकारी (PII) कभी भी एआई को नहीं भेजी जाती है जब तक कि आप इसे स्पष्ट रूप से लक्षण बॉक्स में टाइप न करें। AI आपकी पूछताछ की कोई स्मृति नहीं रखता है।" },

  "terms.title": { en: "Terms of Service", hi: "सेवा की शर्तें" },
  "terms.lastUpdated": { en: "Last updated: June 2026", hi: "अंतिम अपडेट: जून 2026" },
  "terms.s1.title": { en: "1. Not Medical Advice", hi: "1. चिकित्सा सलाह नहीं" },
  "terms.s1.text": { en: "MannSaathi is a behavioral companion and AI triage tool designed to help you overcome hesitation. It is NOT a replacement for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.", hi: "मन-साथी एक व्यवहारिक साथी और AI ट्राइएज टूल है जिसे झिझक दूर करने में आपकी मदद करने के लिए डिज़ाइन किया गया है। यह पेशेवर चिकित्सा सलाह, निदान या उपचार का प्रतिस्थापन नहीं है। किसी भी चिकित्सीय स्थिति के संबंध में हमेशा अपने चिकित्सक या अन्य योग्य स्वास्थ्य प्रदाता की सलाह लें।" },
  "terms.s2.title": { en: "2. Emergency Situations", hi: "2. आपातकालीन स्थितियाँ" },
  "terms.s2.text": { en: "If you think you may have a medical emergency, call your doctor, go to the nearest hospital emergency department, or call emergency services immediately. Do not rely on electronic communications or this software for immediate, urgent medical needs.", hi: "यदि आपको लगता है कि आपको कोई चिकित्सीय आपात स्थिति हो सकती है, तो अपने डॉक्टर को कॉल करें, निकटतम अस्पताल के आपातकालीन विभाग में जाएँ, या तुरंत आपातकालीन सेवाओं को कॉल करें। तत्काल, जरूरी चिकित्सा आवश्यकताओं के लिए इलेक्ट्रॉनिक संचार या इस सॉफ़्टवेयर पर भरोसा न करें।" },
  "terms.s3.title": { en: "3. Account Responsibilities", hi: "3. खाते की जिम्मेदारियां" },
  "terms.s3.text": { en: "If you choose to create an account, you are responsible for maintaining the confidentiality of your login credentials via your Google account. We are not liable for any unauthorized access to your health history resulting from compromised Google credentials.", hi: "यदि आप खाता बनाना चुनते हैं, तो आप अपने Google खाते के माध्यम से अपने लॉगिन क्रेडेंशियल की गोपनीयता बनाए रखने के लिए जिम्मेदार हैं। हम Google क्रेडेंशियल से समझौता होने के परिणामस्वरूप आपके स्वास्थ्य इतिहास तक किसी भी अनधिकृत पहुंच के लिए उत्तरदायी नहीं हैं।" },

  // Landing Page - Hero
  "hero.tagline": { en: "DesignVerse 2026 — Real Ideas. Real Impact.", hi: "DesignVerse 2026 — असली विचार। असली प्रभाव।" },
  "hero.headline": { en: "Fear is the real disease. We are the cure.", hi: "डर असली बीमारी है। हम इलाज हैं।" },
  "hero.subtitle": { en: "Thousands of people avoid doctors every day — not because care doesn't exist, but because taking the first step feels impossible. MannSaathi meets you where you are.", hi: "हर दिन हज़ारों लोग डॉक्टर से बचते हैं — इसलिए नहीं कि इलाज मौजूद नहीं है, बल्कि इसलिए कि पहला कदम उठाना असंभव लगता है। मन-साथी वहीं मिलता है जहां आप हैं।" },
  "hero.checkBtn": { en: "Check Your Symptoms — Anonymous", hi: "अपने लक्षणों की जाँच करें — गुमनाम" },
  "hero.talkBtn": { en: "Or talk to MannSaathi", hi: "या मन-साथी से बात करें" },
  "hero.feature1": { en: "No login required", hi: "कोई लॉगिन आवश्यक नहीं" },
  "hero.feature2": { en: "No data sold", hi: "कोई डेटा बेचा नहीं जाता" },
  "hero.feature3": { en: "Under 5 minutes", hi: "5 मिनट से कम" },

  // Landing Page - Barriers
  "barriers.title": { en: "What's really stopping you?", hi: "आपको असल में क्या रोक रहा है?" },
  "barriers.b1.title": { en: "Fear of Diagnosis", hi: "बीमारी का डर" },
  "barriers.b1.desc": { en: "Knowing is better than wondering.", hi: "अटकलें लगाने से बेहतर है जानना।" },
  "barriers.b2.title": { en: "Social Stigma", hi: "सामाजिक कलंक" },
  "barriers.b2.desc": { en: "4,200+ people near you checked last month.", hi: "पिछले महीने आपके आस-पास 4,200+ लोगों ने जाँच की।" },
  "barriers.b3.title": { en: "Masculinity Norms", hi: "मर्दानगी के मानदंड" },
  "barriers.b3.desc": { en: "Getting checked is the smart move.", hi: "जाँच करवाना ही समझदारी है।" },
  "barriers.b4.title": { en: "Cost Concerns", hi: "खर्च की चिंता" },
  "barriers.b4.desc": { en: "Free options near you exist.", hi: "आपके आस-पास मुफ्त विकल्प मौजूद हैं।" },
  "barriers.b5.title": { en: "Lack of Time", hi: "समय की कमी" },
  "barriers.b5.desc": { en: "5 minutes. That's all we need.", hi: "5 मिनट। हमें बस इतना ही चाहिए।" },
  "barriers.b6.title": { en: "Uncertainty", hi: "अनिश्चितता" },
  "barriers.b6.desc": { en: "Let's find out together.", hi: "आइए मिलकर पता लगाएं।" },
  "barriers.overcome": { en: "Overcome this", hi: "इस पर काबू पाएं" },

  // Landing Page - How It Works
  "how.title": { en: "One step at a time.", hi: "एक बार में एक कदम।" },
  "how.subtitle": { en: "We never overwhelm you with choices.", hi: "हम आपको विकल्पों से कभी भ्रमित नहीं करते।" },
  "how.s1.title": { en: "Tell us how you're feeling", hi: "हमें बताएं आप कैसा महसूस कर रहे हैं" },
  "how.s1.desc": { en: "Tap symptoms or describe them in your own words. No medical jargon required.", hi: "लक्षणों पर टैप करें या उन्हें अपने शब्दों में बताएं। किसी मेडिकल शब्दावली की ज़रूरत नहीं।" },
  "how.s2.title": { en: "We listen without judgment", hi: "हम बिना जज किए सुनते हैं" },
  "how.s2.desc": { en: "Our AI analyzes your symptoms calmly, without alarmist language.", hi: "हमारा AI शांति से आपके लक्षणों का विश्लेषण करता है, बिना डरावने शब्दों के।" },
  "how.s3.title": { en: "We show you what's possible", hi: "हम आपको बताते हैं कि क्या संभव है" },
  "how.s3.desc": { en: "Real options, from 5-minute home relief to free local clinics.", hi: "असली विकल्प, 5 मिनट के घरेलू उपाय से लेकर मुफ्त स्थानीय क्लिनिक तक।" },

  // Landing Page - Cost Comparison
  // Features Grid
  "features.title": { en: "Why choose MannSaathi?", hi: "मन-साथी ही क्यों?" },
  "features.fast.title": { en: "Lightning Fast", hi: "बिजली सी तेज़" },
  "features.fast.desc": { en: "Get AI-powered health analysis instantly, anytime.", hi: "तुरंत एआई (AI) द्वारा स्वास्थ्य विश्लेषण प्राप्त करें, कभी भी।" },
  "features.free.title": { en: "100% Free", hi: "100% मुफ़्त" },
  "features.free.desc": { en: "Quality health screening shouldn't cost you a rupee.", hi: "अच्छी स्वास्थ्य जांच के लिए आपको एक रुपया भी खर्च नहीं करना चाहिए।" },
  "features.anonymous.title": { en: "Completely Anonymous", hi: "पूरी तरह से गुमनाम" },
  "features.anonymous.desc": { en: "No signup required. Your data is never saved or sold.", hi: "कोई साइनअप की आवश्यकता नहीं। आपका डेटा कभी सहेजा या बेचा नहीं जाता।" },
  "features.cultural.title": { en: "Culturally Aware", hi: "सांस्कृतिक रूप से जागरूक" },
  "features.cultural.desc": { en: "Speaks your language. Built to understand Hinglish & local context.", hi: "आपकी भाषा बोलता है। हिंग्लिश और स्थानीय संदर्भ को समझने के लिए बनाया गया।" },
  "cost.findFree": { en: "Find free care near me", hi: "मेरे पास मुफ्त देखभाल खोजें" },

  // Landing Page - Final CTA
  "cta.title": { en: "Be the reason you choose your health today.", hi: "आज अपने स्वास्थ्य को चुनने का कारण बनें।" },
  "cta.btn": { en: "Start Anonymous Check", hi: "गुमनाम जाँच शुरू करें" },
  // How It Works Page
  "howItWorks.title": { en: "How MannSaathi Works", hi: "मन-साथी कैसे काम करता है" },
  "howItWorks.subtitle": { en: "Taking the first step shouldn't be the hardest part of healthcare. We've designed a 3-step process to get you from uncertainty to action.", hi: "स्वास्थ्य देखभाल में पहला कदम उठाना सबसे कठिन नहीं होना चाहिए। हमने आपको अनिश्चितता से कार्रवाई तक ले जाने के लिए 3-चरणीय प्रक्रिया डिज़ाइन की है।" },

  // Dashboard Page
  "dashboard.welcome": { en: "Welcome back, {name}!", hi: "वापसी पर स्वागत है, {name}!" },
  "dashboard.subtitle": { en: "We're glad to have you here. This is your personal dashboard.", hi: "हमें खुशी है कि आप यहाँ हैं। यह आपका व्यक्तिगत डैशबोर्ड है।" },
  "dashboard.history": { en: "Your Health History", hi: "आपका स्वास्थ्य इतिहास" },
  "dashboard.noChecks": { en: "No symptom checks found.", hi: "कोई लक्षण जांच नहीं मिली।" },
  "dashboard.startCheck": { en: "Start your first check →", hi: "अपनी पहली जांच शुरू करें →" },
  "dashboard.duration": { en: "Duration", hi: "अवधि" },
  "dashboard.days": { en: "day(s)", hi: "दिन" },

  // Chat Window
  "chat.error": { en: "Sorry, I'm having trouble connecting right now. Please try again in a moment. 🙏", hi: "क्षमा करें, मुझे अभी जुड़ने में समस्या हो रही है। कृपया कुछ क्षणों में पुनः प्रयास करें। 🙏" },
  "chat.greeting1": { en: "Namaste! I'm your MannSaathi — here to listen, not judge.", hi: "नमस्ते! मैं आपका मन-साथी हूँ — यहाँ सुनने के लिए, न्याय करने के लिए नहीं।" },
  "chat.greeting2": { en: "What's on your mind today?", hi: "आज आपके मन में क्या है?" },
  "chat.quick1": { en: "I'm not feeling well", hi: "मैं ठीक महसूस नहीं कर रहा हूँ" },
  "chat.quick2": { en: "I need to find a doctor", hi: "मुझे डॉक्टर खोजने की जरूरत है" },
  "chat.quick3": { en: "I'm worried about something", hi: "मैं किसी बात को लेकर चिंतित हूँ" },
  "chat.quick4": { en: "I just want to talk", hi: "मैं बस बात करना चाहता हूँ" },

  // Sign In Page
  "signIn.title": { en: "You don't need an account.", hi: "आपको खाते की आवश्यकता नहीं है।" },
  "signIn.subtitle": { en: "Anonymous checking is fully supported. An account just helps you track your progress over time.", hi: "गुमनाम जाँच पूरी तरह से समर्थित है। एक खाता केवल समय के साथ आपकी प्रगति को ट्रैक करने में मदद करता है।" },
  "signIn.continueWithout": { en: "Continue without account", hi: "खाते के बिना जारी रखें" },
  "signIn.or": { en: "or", hi: "या" },
  "signIn.continueGoogle": { en: "Continue with Google", hi: "Google के साथ जारी रखें" },
  "signIn.privacy": { en: "We never share your health data", hi: "हम कभी भी आपका स्वास्थ्य डेटा साझा नहीं करते हैं" },

  // Resources Page
  "resources.title": { en: "Free Care Finder", hi: "मुफ्त देखभाल खोजक" },
  "resources.subtitle": { en: "Find zero-cost or heavily subsidized healthcare options near you.", hi: "अपने आस-पास शून्य-लागत या भारी सब्सिडी वाले स्वास्थ्य सेवा विकल्प खोजें।" },
  "resources.searchPlaceholder": { en: "Search clinics, schemes, or medicines...", hi: "क्लिनिक, योजनाएं या दवाएं खोजें..." },
  "resources.location": { en: "Lucknow", hi: "लखनऊ" },
  "resources.filterAll": { en: "All", hi: "सभी" },
  "resources.filterGeneral": { en: "General Checkup", hi: "सामान्य जाँच" },
  "resources.filterMental": { en: "Mental Health", hi: "मानसिक स्वास्थ्य" },
  "resources.filterMeds": { en: "Free Medicines", hi: "मुफ्त दवाएं" },
  "resources.filterWomen": { en: "Women's Health", hi: "महिलाओं का स्वास्थ्य" },
  "resources.storeName": { en: "Jan Aushadhi Store", hi: "जन औषधि केंद्र" },
  "resources.distance": { en: "Gomti Nagar, 0.8 km away", hi: "गोमती नगर, 0.8 किमी दूर" },
  "resources.openNow": { en: "Open Now", hi: "अभी खुला है" },
  "resources.tag1": { en: "Subsidized Medicines", hi: "सब्सिडी वाली दवाएं" },
  "resources.tag2": { en: "Walk-in", hi: "वॉक-इन" },
  "resources.directions": { en: "Directions", hi: "रास्ता" },
  "resources.call": { en: "Call", hi: "कॉल करें" },

} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, locale: Locale): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[locale] || entry['en'];
}

export default translations;
