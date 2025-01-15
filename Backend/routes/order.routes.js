const express = require("express");
const { createOrder, deleteOrder, getAllOrders, getOrdersByUserId, updateOrderStatus } = require("../controllers/orderController");
const { authenticate, authorize } = require("../middleware/authenticate");
const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/", authenticate, authorize(["Admin"]), getAllOrders);
router.get('/:id', authenticate, getOrdersByUserId);
router.patch('/:id', authenticate, authorize(['Admin']), updateOrderStatus);
router.delete('/:id', authenticate, deleteOrder);

module.exports = router;