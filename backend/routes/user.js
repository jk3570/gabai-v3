const express = require("express");

// controller functions
const { loginUser, signupUser, getAllUsers} = require("../controllers/userController");

const router = express.Router();

//get all users
router.get('/users', getAllUsers);

// // Update user route
// router.put('/:userId', updateUser);

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

module.exports = router;
