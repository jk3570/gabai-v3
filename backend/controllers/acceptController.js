const { validationResult } = require('express-validator');

const Accept = require('../models/acceptModel');

const acceptRequest = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Log the request body
    console.log("Request Body:", req.body);

    try {
        const newData = new Accept(req.body);
        await newData.save();
        res.status(201).json({ message: 'Request accepted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Function to handle fetching all data
const getAllRequest = async (req, res) => {
    try {
    // Retrieve the userid from the request parameters
    const { userid } = req.params;
    const requests = await Accept.find({userid:userid});
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Function to handle fetching all data
const getAllRequestLawyer = async (req, res) => {
    try {
    const { email } = req.params;
    const requests = await Accept.find({lawyeremail:email});
    res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        // Send an error response if something goes wrong
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { acceptRequest, getAllRequest, getAllRequestLawyer };