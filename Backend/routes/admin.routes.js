const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/userController");
const { authenticate, authorize } = require("../middleware/authenticate");

const router = express.Router();

// Get all users (Admin only)
router.get("/", authenticate, authorize(["Admin"]), getAllUsers);

// Delete a user (Admin only)
router.delete("/:id", authenticate, authorize(["Admin"]), deleteUser);

module.exports = router;
