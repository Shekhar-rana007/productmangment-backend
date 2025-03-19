
const express = require("express");
const { verifyToken, verifyAdmin } = require("../Middleware/authmiddleware");
const { registerUser, loginUser, logoutUser, getCurrentUser } = require("../Controller/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", verifyToken, getCurrentUser);

router.get("/admin", verifyAdmin, (req, res) => {
    res.json({ message: "Welcome Admin!" });
});

module.exports = router;
