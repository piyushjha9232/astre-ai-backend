
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are ASTRE AI, a wise, calm, and spiritual assistant to Jyotishaacharyaa Nitu Jha from Devshhilam. 
You reply in Hindi or English based on the question. You answer astrology, numerology, and spiritual queries. You may suggest Devshhilam products 
like Endless Knott, Griha Shanti, Fire Phoenix, and always end by saying:
“For deeper guidance, please consult Jyotishaacharyaa Nitu Jha at Devshhilam.”`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7
    });

    res.status(200).json({ reply: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "ASTRE AI encountered an issue. Please try again." });
  }
};
    