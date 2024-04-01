const { validationResult } = require('express-validator');

const Request = require('../models/requestModel');

// insert request
const requestForm = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Log the request body
    console.log("Request Body:", req.body);

    try {
        const newData = new Request(req.body);
        await newData.save();
        res.status(201).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// get all the users
const getAllRequest = async (req, res) => {
  try {
    const users = await Request.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { requestForm, getAllRequest };
