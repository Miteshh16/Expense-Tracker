const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(" ")[1];

        // 🔹 Check if token exists
        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        // 🔹 Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 🔹 Find user and exclude password
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found, authorization denied" });
        }

        // 🔹 Attach user to request
        req.user = user;
        next(); // Proceed to next middleware

    } catch (error) {
        res.status(401).json({ message: "Invalid token", error: error.message });
    }
};
