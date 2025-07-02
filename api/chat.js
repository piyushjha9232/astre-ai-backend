import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
console.log("🔑 API Key from env:", apiKey); // 🐞 Check if API key is available

const openai = new OpenAI({
  apiKey: apiKey,
});

export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are ASTRE AI, a wise, calm, and spiritual assistant to Jyotishaacharyaa Nitu Jha from Devshhilam. You answer astrology, numerology, and spiritual queries. You may suggest Devshhilam products like yantras or consultations if appropriate.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
    });

    res.status(200).json({ reply: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("ASTRE AI Error:", error);
    res
      .status(500)
      .json({ error: "ASTRE AI encountered an issue. Please try again." });
  }
}
