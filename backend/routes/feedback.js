const express = require("express");

// controller functions
const { createFeedback, getAllFeedbacks, totalFeedbacks} = require("../controllers/feedbackController");

const router = express.Router();

//get all request for user
router.get('/get-all-feedbacks', getAllFeedbacks);

router.get('/total', totalFeedbacks);

//insert request form
router.post('/create', createFeedback);

module.exports = router;
