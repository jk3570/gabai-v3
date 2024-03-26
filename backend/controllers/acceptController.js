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
        // Fetch all data from the database
        const allData = await Accept.find();
        // Send the fetched data as the response
        res.status(200).json(allData);
    } catch (error) {
        console.error(error);
        // Send an error response if something goes wrong
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { acceptRequest, getAllRequest };