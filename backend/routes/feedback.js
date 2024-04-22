const express = require("express");

// controller functions
const { createFeedback, getAllFeedbacks} = require("../controllers/feedbackController");

const router = express.Router();

//get all request for user
router.get('/get-all-feedbacks', getAllFeedbacks);

//insert request form
router.post('/create', createFeedback);

module.exports = router;
