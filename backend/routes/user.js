const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

// controller functions
const { loginUser, signupUser, getAllUsers, totalUsers,  loginWithGoogle, countsByGender, countsByRegion, countsByAge } = require("../controllers/userController");


const router = express.Router();

// Login with google
router.post("/google", loginWithGoogle);

// Get all users
router.get('/users', getAllUsers);
router.get('/total', totalUsers);

// Access login
router.post("/login", loginUser);

// Access sign up
router.post("/signup", signupUser);
router.get("/countsByGender", countsByGender);
router.get("/countsByRegion", countsByRegion);
router.get("/countsByAge", countsByAge);

// Update password
router.put("/update-password/:id", async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  try {
    // Find the user by their ID
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
