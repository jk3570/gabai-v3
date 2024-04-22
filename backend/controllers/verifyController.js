const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const verifySignup = async (req, res) => {
  try {
    // Extract the verification token from the URL parameters
    const token = req.params.token;

    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.SECRET);

    // Find the user by email and verification token
    const user = await User.findOne({ email: decoded.email, verificationToken: token });

    // If the user is found and the verification token matches
    if (user) {
      // Update the user's isVerified status to true
      user.isVerified = true;
      // Clear the verification token
      // user.verificationToken = undefined;
      await user.save();

      // Redirect the user to the login page or success page
      return res.redirect('/success'); // or res.redirect('/success');
    } else {
      // Token is invalid or user not found
      return res.status(400).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { verifySignup };
