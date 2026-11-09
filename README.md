# Carbon Footprint Calculator

Know Your Impact. Control Your Carbon. Build a Greener Future.

## Features (Phase 1 + AI)
- Dark green dashboard UI, English and Hinglish toggle
- 7 calculators: Transport, Electricity, Food, Water, Waste, Shopping, Digital
- Safe per-person limit (about 2.3 t CO2/year, 1.5C-aligned) and Green Score
- Monthly carbon budget with 80% warning and limit-exceeded alert
- What-if Simulator, history, CSV export, print / save PDF
- AI Advisor and Eco Chatbot (OpenAI via serverless function, rule-based fallback if API is off)

## Files
- `index.html` : whole website
- `api/chat.js` : serverless AI backend (key stays hidden)

## Deploy (Vercel, free)
1. Upload all files to a GitHub repo.
2. vercel.com > Add New > Project > import repo.
3. Environment Variables: `OPENAI_API_KEY` (your key) and `OPENAI_MODEL` (current model name from platform.openai.com/docs/models).
4. Deploy. Never put the key in code or in the repo.

Without the API the site still works and shows rule-based tips.
Emission factors are approximate; verify with IPCC, DEFRA, CEA India.
