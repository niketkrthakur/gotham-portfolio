import axios from "axios";

export const askAI = async (message: string) => {
  const res = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content:
            "You are BATCOMPUTER, Niket's AI system. Respond intelligently, briefly, and with confidence. Keep a dark-tech tone.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.choices[0].message.content;
};