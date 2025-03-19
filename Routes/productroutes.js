const express = require("express");
const { verifyAdmin, verifyToken } = require("../Middleware/authmiddleware");
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../Controller/productController");
const upload=require("../Middleware/uploadMiddleware");
const router = express.Router();

router.post("/create", verifyAdmin, upload.array("images", 5), createProduct);
router.get("/getall", getAllProducts,getAllProducts);
router.get("/getall/:id", getProductById,getProductById);
router.put("/update/:id", verifyAdmin, updateProduct);
router.delete("/delete/:id", verifyAdmin, deleteProduct);

module.exports = router;
