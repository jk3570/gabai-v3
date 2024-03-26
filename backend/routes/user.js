const express = require("express");

// controller functions
const { loginUser, signupUser, getAllUsers } = require("../controllers/userController");

const router = express.Router();

//get all users
router.get('/users', getAllUsers);

// // Update user route
// router.put('/:userId', updateUser);

// access login
router.post("/login", loginUser);

// access sign up
router.post("/signup", signupUser);

module.exports = router;
