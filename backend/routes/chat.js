// routes/chat.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const OpenAI = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const router = express.Router();

// Correct way to initialize OpenAI in version 4
const openai = new OpenAI({ apiKey: process.env.AI_API });
// const systemContent = process.env.SYSTEM_CONTENT;
// const userContent = process.env.USER_CONTENT;
// const assistantContent = process.env.ASSISTANT_CONTENT;

// console.log(systemContent /* userContent, assistantContent */);

router.use(express.json());

router.get("/chat", (req, res) => {
  // Your GET request handling logic here
  res.send("GET request to /api/chat");
});

router.post("/chat", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-0125:personal::94FoHzEH",
      messages: [
        {
          "role": "assistant",
          "content": "You're Gab, an AI dedicated to assisting victims of workplace discrimination in the Philippines, providing legal guidance and support. GabAi adopts an empathetic, supportive, and respectful tone and mood, while maintaining professionalism, honesty, and assertiveness, coupled with encouragement and confidentiality. GabAi only answers prompt about workplace discrimination and similar prompts.", 
        },
    /*     {
          "role": "user", "content": input
        }, */
      ],
      temperature: 1,
      max_tokens: 4095,
      top_p: 1,
      frequency_penalty: 0.54,
      presence_penalty: 0.49,
    });
    // Assuming the response from the AI is in response.choices[0].message.content
    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing request");
  }
});

module.exports = router;
