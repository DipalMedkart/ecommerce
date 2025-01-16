const express = require("express");
const { getAllUsers, deleteUser, getUsersCount, pendingOrders, getOrdersCount} = require("../controllers/adminController");
const { authenticate, authorize } = require("../middleware/authenticate");

const router = express.Router();

// Get all users (Admin only)
router.get("/", authenticate, authorize(["Admin"]), getAllUsers);

// Delete a user (Admin only)
router.delete("/:id", authenticate, authorize(["Admin"]), deleteUser);

// 
// router.get("/count", authenticate, authorize["Admin"], getUsersCount);
router.get("/users-count", authenticate, authorize(["Admin"]), getUsersCount);
router.get("/orders-count", authenticate, authorize(["Admin"]), getOrdersCount);
router.get("/pending-orders-count", authenticate, authorize(["Admin"]), pendingOrders);

router.get("/admin", authenticate, (req, res) => {
    const adminName = req.user.name; // Extract name from decoded token
    res.json({ name: adminName });
  });

module.exports = router;
