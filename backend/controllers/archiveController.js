const { validationResult } = require('express-validator');
const Archive = require('../models/archiveModel');




// Create a feedback
const sendArchive = async (req, res) => {
  try {
    // Create the user using the data from the request body
    const newArchive= await Archive.create(req.body);
    // Send the newly created user in the response
    res.status(201).json(newArchive);
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error archiving:', error);
    // Send an error response to the client
    res.status(500).json({ error: 'Internal server error' });
  }
};

// delete one schedule
const deleteSchedule = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await Archive.findOneAndDelete({userid:id});
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

// Get all requests
const getAllArchive = async (req, res) => {
    try {
        const archives = await Archive.find();
        res.status(200).json(archives);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get total number of cases
const totalArchives = async (req, res) => {
    try {
        const totalArchives = await Archive.countDocuments();
        res.json({ totalArchives });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {sendArchive, getAllArchive, totalArchives, deleteSchedule };
