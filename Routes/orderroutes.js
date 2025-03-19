const express = require("express");
const { verifyToken, verifyAdmin } = require("../Middleware/authmiddleware");
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require("../Controller/orderController");

const router = express.Router();

router.post("/createorder", verifyToken, createOrder);
router.get("/getUserOrders", verifyToken, getUserOrders);
router.get("/all", verifyAdmin, getAllOrders); 
router.put("/:id", verifyAdmin, updateOrderStatus);

module.exports = router;
