const Feedback = require('../models/feedbackModel');

// Create a user
const createFeedback = async (req, res) => {
  try {
    // Create the user using the data from the request body
    const newFeedback = await Feedback.create(req.body);
    // Send the newly created user in the response
    res.status(201).json(newFeedback);
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error creating user:', error);
    // Send an error response to the client
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get all the request
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { createFeedback, getAllFeedbacks };
