const express = require("express");
const fetch = require("node-fetch");
const app = express();

const YOUR_TOKEN = "YOUR_TOKEN_HERE"; // Replace with your actual token
const sessionId = "your_sessionId";

const router = express.Router();

app.get("/", async (req, res) => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: YOUR_TOKEN,
        "Content-Type": "application/json",
      },
    };

    const url = `https://api.videosdk.live/v2/sessions/${sessionId}/participants/active?page=1&perPage=20`;
    const response = await fetch(url, options);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = router;
