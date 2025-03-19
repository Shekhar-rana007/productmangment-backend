const jwt = require("jsonwebtoken");

// Verify Token Middleware
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// Admin Access Middleware
exports.verifyAdmin = (req, res, next) => {
    exports.verifyToken(req, res, () => {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ message: "Access Denied. Admins Only" });
        }
        next();
    });
};
