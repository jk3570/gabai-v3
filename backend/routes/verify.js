const express = require("express");


// controller functions
const { verifySignup } = require("../controllers/verifyController");

const router = express.Router();

// access sign up
router.post("/verify/:token", verifySignup);

module.exports = router;
