const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (req, res) => {
  try {
    const { email, password, name,role } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ email, password,name, role: role || "user" });

    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    console.error("Error in registerUser:", error); 
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields are required" });
    
    const user = await User.findOne({ email });
    console.log("user",user)
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    console.error("Error in login:", error); 
    res.status(500).json({ message: "Server Error", error });
  }
};

// Logout User
const logoutUser = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.json({ message: "Logged out successfully" });
};

// Get Current User
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getCurrentUser };
