const express = require("express");

// controller functions
const { requestForm, getAllRequest, totalCases } = require("../controllers/requestController");

const router = express.Router();

//get all counts
router.get('/total', totalCases);

//get all users
router.get('/all-requests', getAllRequest);

//insert request form
router.post('/request', requestForm);


module.exports = router;
