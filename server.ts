import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client
  let isAiConfigured = !!process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (isAiConfigured) {
    try {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    } catch (e) {
      console.error("Failed to initialize GoogleGenAI:", e);
      isAiConfigured = false;
    }
  }

  // AI Mascot tutoring API route
  app.post("/api/chat", async (req, res) => {
    const { text, history } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Missing message text" });
    }

    if (!isAiConfigured || !ai) {
      // Fallback kid-friendly automated teacher if API key is not yet set up
      const fallbackResponses = [
        "Great job! رائع جداً! Tell me: What is your favorite animal? ما هو حيوانك المفضل؟ 🦁",
        "Excellent! ممتاز! Let's learn colors! What color is an apple? ما لون التفاح؟ 🍎",
        "You are doing amazing! أنت رائع! Can you say 'hello'? 👋",
        "Wow! Let's sing together! 'ABCDEFG...' 🎶 What is your favorite song?",
        "Wonderful! Let's name fruits! I love bananas 🍌 and oranges 🍊. Do you like fruit?"
      ];
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      return res.json({
        text: randomResponse + " (Teacher is running in Offline Play Mode! ✨ Connect GEMINI_API_KEY in Secrets for full intelligent voice chat!)"
      });
    }

    try {
      // Format chat history for Gemini API
      // Content parts must be { role: 'user' | 'model', parts: [{ text: string }] }
      const contents: any[] = [];
      
      if (history && Array.isArray(history)) {
        history.forEach((msg: any) => {
          if (msg.role === "user" || msg.role === "model") {
            contents.push({
              role: msg.role === "model" ? "model" : "user",
              parts: [{ text: msg.text || "" }]
            });
          }
        });
      }

      // Add the current user message at the end
      contents.push({
        role: "user",
        parts: [{ text: text }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: `You are Leo, a friendly cartoon adventurer lion who is an expert children's English teacher.
Your target audience is Arabic-speaking children aged 5 to 10 years who are learning English. 

Here are your teaching rules:
1. Always be extremely encouraging, cheerful, warm, and playful.
2. Use very short, simple, clear English sentences.
3. Every response MUST include supportive Arabic translations or gentle bilingual hints in parentheses to assist absolute beginners. E.g., "Fantastic! (رائع!) What is your favorite toy? (ما هي لعبتك المفضلة؟) 🧸"
4. Keep the vocabulary focused on basic kids' categories: animals, fruit, colors, school supplies, family members, greetings, and simple actions.
5. Limit your total response to 2 key sentences maximum. Children lose focus with long replies.
6. Use plenty of expressive emojis (🦁, 🌟, 🍎, 🎉, 🎈, 🧸) to reward and delight the student!
7. If the child makes a spelling or general English error, gently point it out in a highly supportive, playful manner, then encourage them to try copying the correct word!
8. If the child writes in Arabic, respond in very simple English, translate your questions to help them, and reward them for trying!`,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I'm thinking! Let's play together! 🦁";
      res.json({ text: replyText });

    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ 
        error: "Oops, Leo had a small hiccup! Let's try again! 🦁",
        details: error?.message || "" 
      });
    }
  });

  // Serve static assets in production, otherwise mount Vite in middleware mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
