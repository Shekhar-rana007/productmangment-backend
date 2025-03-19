const Order = require("../Model/ordermodel");
const Product = require("../Model/productModel");

const createOrder = async (req, res) => {
  try {
    const { products } = req.body; 
    if (!products || products.length === 0)
      return res.status(400).json({ message: "No products in the order" });

    let totalPrice = 0; 
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: `Product not found: ${item.product}` });

      totalPrice += product.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user.userId, 
      products,
      totalPrice,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "email").populate("products.product", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate("products.product", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { createOrder, getAllOrders, getUserOrders, updateOrderStatus, deleteOrder };
