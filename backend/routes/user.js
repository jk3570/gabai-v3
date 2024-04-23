const express = require("express");

// controller functions
const { loginUser, signupUser, getAllUsers, totalUsers } = require("../controllers/userController");

const router = express.Router();

//get all users
router.get('/users', getAllUsers);
router.get('/total', totalUsers);

// // Update user route
// router.put('/:userId', updateUser);

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
