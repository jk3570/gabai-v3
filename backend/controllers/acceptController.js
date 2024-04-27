const { validationResult } = require('express-validator');

const Accept = require('../models/acceptModel');

// Create a feedback
const acceptRequest = async (req, res) => {
  try {
    // Create the user using the data from the request body
    const newAccept = await Accept.create(req.body);
    // Send the newly created user in the response
    res.status(201).json(newAccept);
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error creating user:', error);
    // Send an error response to the client
    res.status(500).json({ error: 'Internal server error' });
  }
};


// delete one schedule
const deleteRequest = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await Accept.findOneAndDelete({userid:id});
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

module.exports = { acceptRequest, getAllRequest, getAllRequestLawyer, deleteRequest };