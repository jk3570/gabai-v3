//import modules
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const cors = require("cors");
const OpenAI = require("openai");
const userRoutes = require("./routes/user");
const chatbotRoute = require("./routes/chat");

const router = express.Router();

require("dotenv").config();

const PORT = process.env.PORT;
const CHAT_PORT = process.env.CHAT_PORT;

console.log(PORT);

// express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(CHAT_PORT, () => console.log(`Server ready on port ${CHAT_PORT}`));

// routes
app.use("/api/user", userRoutes);

app.use("/api", chatbotRoute);
