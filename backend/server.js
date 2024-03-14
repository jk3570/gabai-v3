//import modules
const fs = require("fs");

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const OpenAI = require("openai");

require("dotenv").config();

//OpenAI's API
const openai = new OpenAI({
  apiKey: process.env.AI_API,
});

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => res.send("Express on Vercel"));

// routes
app.use("/api/user", userRoutes);

app.post("/chat", async (req, res) => {
  try {
    // Read the JSON file containing messages
    fs.readFile("./messages.json", "utf8", async (err, data) => {
      if (err) {
        throw err;
      }

      // Parse the JSON data
      const messages = JSON.parse(data);

      try {
        // Call OpenAI API with messages from JSON file and request body
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: messages.concat(req.body.messages), // Concatenate JSON file messages with request messages
          temperature: 1,
          max_tokens: 4095,
          top_p: 1,
          frequency_penalty: 0.54,
          presence_penalty: 0.49,
        });

        // Send response from OpenAI API
        res.json(response.data);
      } catch (error) {
        // Handle OpenAI API call error
        res.status(500).json({ error: error.message });
      }
    });
  } catch (error) {
    // Handle file read error
    res.status(500).json({ error: error.message });
  }
});

// connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to Database (MongoDB Atlas) & listening on Port: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });


module.exports = app;
