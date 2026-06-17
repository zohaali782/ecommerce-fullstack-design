const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/user/:userId", getUserOrders);
router.get("/:orderId", getOrderById);

module.exports = router;
