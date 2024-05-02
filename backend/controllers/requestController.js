const { validationResult } = require('express-validator');
const Request = require('../models/requestModel');

// Insert request
const requestForm = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Extract the fields you want to save
        const { userid, firstname, lastname, email, address, summary, conversationId, createdAt = "", createdTime = "" } = req.body;
        // Use the extracted fields to create a new Request instance
        const newData = new Request({ userid, firstname, lastname, email, address, summary, conversationId, createdAt, createdTime });
        await newData.save();
        res.status(201).json({ message: 'Request submitted successfully' });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Function to handle fetching all data
const getAllRequest = async (req, res) => {
    try {
    // Retrieve the userid from the request parameters
    const { userid } = req.params;
    const requestspending = await Request.find({userid:userid});
    res.status(200).json(requestspending);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllRequestLawyer = async (req, res) => {
    try {
    const requestspending = await Request.find();
    res.status(200).json(requestspending);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get total number of cases
const totalForms = async (req, res) => {
    try {
        const totalForms = await Request.countDocuments();
        res.json({ totalForms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// delete one schedule
const deleteRequest = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await Request.findOneAndDelete({userid:id});
    if (deletedUser) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = { requestForm, getAllRequest, totalForms, deleteRequest, getAllRequestLawyer };
