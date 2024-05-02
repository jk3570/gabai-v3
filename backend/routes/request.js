const express = require("express");
const { validationResult } = require('express-validator');
const Request = require('../models/requestModel');

// Controller functions
const { requestForm, getAllRequest, totalForms, deleteRequest, getAllRequestLawyer } = require("../controllers/requestController");

const router = express.Router();

// Get all counts
router.get('/total', totalForms);

// Get all users
router.get('/all-requests/:userid', getAllRequest);
router.get('/all-requests', getAllRequestLawyer);








// Insert request form 
router.post('/request', requestForm);

// Check if conversation ID exists
// router.get('/check-request/:conversationId', async (req, res) => {
//   const { conversationId } = req.params;

//   try {
//     // Query the database to check if the conversation ID exists
//     const conversationExists = await Request.exists({ conversationId });
//     res.status(200).json({ exists: conversationExists });
//   } catch (error) {
//     console.error('Error checking conversation ID:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Delete one request
router.delete('/delete/:id', deleteRequest);

module.exports = router;
