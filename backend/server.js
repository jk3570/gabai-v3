// import modules
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors module
const userRoutes = require("./routes/user");
const OpenAI = require("openai");
require("dotenv").config();
const path = require("path");
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 4000;

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "../frontend/build")));

const client = new MongoClient(process.env.MONG_URI);

async function getData() {
  try {
    // Connect to the MongoDB Atlas cluster
    await client.connect();
    
    // Access the database and collection
    const database = client.db(process.env.DB_NAME);
    const collection = database.collection(process.env.USER_COLLECTION);
    
    // Query the collection to retrieve all documents
    const cursor = collection.find({});
    
    // Iterate over the cursor and log each document
    await cursor.forEach(doc => console.log(doc));
    
    // Close the connection
    await client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the getData function to retrieve and log data
getData();

// routes
app.use("/user", userRoutes);

// OpenAI's API
const openai = new OpenAI({
  apiKey: process.env.AI_API,
});

app.post("/chat", async (req, res) => {
  try {
    let messages = [];
    // Read the JSON file containing messages
    fs.readFile("./messages.json", "utf8", async (err, data) => {
      if (err) {
        throw err;
      }

      // Parse the JSON data
      messages = JSON.parse(data);
      if (!req.body.messages) {
        req.body.messages = [];
      }

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

// Wildcard route to serve the index.html file for all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log("Connected to Database (MongoDB Atlas) & listening on Port: ", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
