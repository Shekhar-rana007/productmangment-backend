const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/userroutes");
const orderRoutes = require("./Routes/orderroutes");
const productroutes = require("./Routes/productroutes");
const dbConn= require("./ConnectDb/Confing")
dotenv.config();
const path = require("path");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));
  dbConn();
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  // Routes
  app.use("/api/user", userRoutes);

app.use("/api/products", productroutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
