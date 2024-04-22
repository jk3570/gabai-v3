const express = require("express");

// controller functions
const {
  loginUser,
  signupUser,
  getAllUsers,
} = require("../controllers/userController");

const userModel = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");

//get all users
router.get("/users", getAllUsers);

// // Update user route
// router.put('/:userId', updateUser);
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send({ email: user.email });
  } catch (error) {
    console.error("Failed to fetch user email:", error);
    res.status(500).send("Failed to fetch user email");
  }
});

// access login
router.post("/login", loginUser);

// access sign up
router.post("/signup", signupUser);

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
