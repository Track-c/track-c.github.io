// Vercel serverless function. API key lives ONLY in Vercel Environment Variables.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: "No API key set" });

  const { messages = [], summary = "", lang = "en" } = req.body || {};
  const clean = messages.slice(-8).map(m => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, 1500)
  }));

  const system =
    "You are the AI assistant of the 'Carbon Footprint Calculator' website. " +
    "Only discuss carbon footprint, greenhouse gases, sustainability and the user's data. " +
    "Be practical, short and friendly. Reply in " +
    (lang === "hi" ? "Hinglish (Hindi written in English letters)" : "English") +
    ". Safe per-person limit is about 2.3 tonnes CO2 per year (1.5C-aligned). " +
    "Emission numbers are approximate. User data: " + String(summary).slice(0, 800);

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL, // set in Vercel, take current model name from platform.openai.com/docs/models
        max_tokens: 600,
        messages: [{ role: "system", content: system }, ...clean]
      })
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: "AI error" });
    res.status(200).json({ reply: data.choices?.[0]?.message?.content || "" });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
}
