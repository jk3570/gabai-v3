const express = require("express");

// controller functions
const { acceptRequest, getAllRequest, getAllRequestLawyer, deleteRequest, totalAccepts } = require("../controllers/acceptController");

const router = express.Router();

router.get('/total', totalAccepts);

//get all request for user
router.get('/get-all-requests/:userid', getAllRequest);

//get all request for lawyer
router.get('/get-all-requests-lawyer/:email', getAllRequestLawyer);

//insert request form
router.post('/confirm', acceptRequest);

router.delete('/delete/:id', deleteRequest);

module.exports = router;
