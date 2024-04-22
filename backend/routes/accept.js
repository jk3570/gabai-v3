const express = require("express");

// controller functions
const { acceptRequest, getAllRequest, getAllRequestLawyer } = require("../controllers/acceptController");

const router = express.Router();

//get all request for user
router.get('/get-all-requests/:userid', getAllRequest);

//get all request for lawyer
router.get('/get-all-requests-lawyer/:email', getAllRequestLawyer);

//insert request form
router.post('/confirm', acceptRequest);

module.exports = router;
