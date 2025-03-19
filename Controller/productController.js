const Product = require("../Model/productModel");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const images = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : []; 

    if (!name || !price || !category || stock === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = await Product.create({ name, description, price, category, stock, images });

    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error in createProduct:", error);
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a product (Admin only)
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a product (Admin only)
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
