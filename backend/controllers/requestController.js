const { validationResult } = require('express-validator');
const Request = require('../models/requestModel');

// Insert request
const requestForm = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Log the request body
    console.log("Request Body:", req.body);

    try {
        // Extract the fields you want to save
        const { field1, field2, field3 } = req.body;
        const newData = new Request({ field1, field2, field3 });
        await newData.save();
        res.status(201).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all requests
const getAllRequest = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get total number of cases
const totalCases = async (req, res) => {
    try {
        const totalCases = await Request.countDocuments();
        res.json({ totalCases });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { requestForm, getAllRequest, totalCases };
