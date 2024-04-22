const express = require("express");

// controller functions
const { acceptRequest, getAllRequest } = require("../controllers/acceptController");

const router = express.Router();

//get all request
router.get('/get-all-requests', getAllRequest);

//insert request form
router.post('/confirm', acceptRequest);

module.exports = router;
