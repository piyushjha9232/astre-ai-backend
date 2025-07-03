export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are ASTRE AI, an expert Vedic astrologer assistant for Devshhilam. Always give gentle, spiritual, meaningful responses.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
      }),
    });

    const result = await response.json();

    if (result.choices && result.choices.length > 0) {
      return res.status(200).json({ reply: result.choices[0].message.content });
    } else {
      return res.status(500).json({ error: "No response from OpenAI" });
    }

  } catch (err) {
    console.error("ASTRE AI Backend Error:", err);
    return res.status(500).json({ error: "ASTRE AI encountered an issue. Please try again." });
  }
}
