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
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const systemContent = process.env.SYSTEM_CONTENT;
const userContent = process.env.USER_CONTENT;
const assistantContent = process.env.ASSISTANT_CONTENT;
console.log(systemContent, userContent, assistantContent);

router.use(express.json());

router.get("/chat", (req, res) => {
  // Your GET request handling logic here
  res.send("GET request to /api/chat");
});

router.post("/chat", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemContent,
        },
        {
          role: "assistant",
          content: assistantContent,
        },
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
