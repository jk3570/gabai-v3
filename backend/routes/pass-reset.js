const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const userModel = require("../models/userModel");
const emailjs = require("@emailjs/nodejs");
require("dotenv").config();
const { baseURL } = require('./baseURL.js'); // Replace 'filename.js' with the actual filename


const { SERVICE_ID, TEMPLATE_ID, EJS_PUBID, EJS_PRIVATE } = process.env;

// Middleware function to validate the email parameter
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    return res.status(400).send("Invalid email address");
  }
  next();
};

// Route to send password reset email
router.post("/forgot-password", validateEmail, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).send("User not found");
    }

    // Generate a unique token for the user
    const token = crypto.randomBytes(20).toString("hex");

    // Store the token in the database along with expiration time
    await userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000, // Token expires in 1 hour
        },
      }
    );

    // Send the email with the reset link
    const resetLink = `${baseURL}/password-reset/${token}`;
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        user_name: user.name,
        user_email: user.email,
        reset_link: resetLink,
      },
      { publicKey: EJS_PUBID, privateKey: EJS_PRIVATE }
    );

    console.log("Email sent successfully:", response);
    res.send("Reset password email sent");
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).send("Failed to send email");
  }
});

// Route to fetch user email by ID
router.get("/user/:id/email", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send({ email: user.email });
  } catch (error) {
    console.error("Failed to fetch user email:", error);
    res.status(500).send("Failed to fetch user email");
  }
});

module.exports = router;
