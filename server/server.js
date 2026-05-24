import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a mystical astrologer AI giving cosmic astrology readings.",
          },
          {
            role: "user",
            content: message,
          },
        ],

        model: "llama-3.3-70b-versatile",
      });

    const reply =
      completion.choices[0].message.content;

    res.json({
      reply,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Groq server error",
    });
  }
});

app.post(
  "/analyze-mood",
  async (req, res) => {
    try {
      const { text } = req.body;

      const completion =
        await groq.chat.completions.create({
          messages: [
            {
              role: "system",

              content:
                "You are a cosmic astrology AI that analyzes emotions and gives short spiritual mood insights.",
            },

            {
              role: "user",

              content: text,
            },
          ],

          model:
            "llama-3.3-70b-versatile",
        });

      res.json({
        reply:
          completion.choices[0]
            .message.content,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error:
          "Mood analysis failed",
      });
    }
  }
);

app.listen(5000, "0.0.0.0", () => {
  console.log(
    "✨ Groq Astrology AI Running on 5000"
  );
});