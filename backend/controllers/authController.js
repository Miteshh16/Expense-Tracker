const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.registerUser = async (req, res) => {
    const { fullname, email, password, profileImageUrl } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const user = await User.create({
            fullname,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({
            message: "Error registering user",
            error: err.message,
        });
    }
};

// Dummy placeholders for other routes
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // 🔹 Check if fields are provided
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // 🔹 Find user in the database
        const user = await User.findOne({ email });

        // 🔹 Check if user exists and password is correct
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 🔹 Send successful response
        res.status(200).json({
            id: user._id,  // ✅ Correct ID format
            user,
            token: generateToken(user._id),
        });

    } catch (err) {
        // 🔹 Handle errors properly
        res.status(500).json({
            message: "Error logging in user",
            error: err.message,
        });
    }
};

exports.getUserInfo = async (req, res) => {
    try{
        const user= await User.findById(req.user.id).select("-password")

        if(!user){
            return res.status(400).json({ message:"User not found"})
        }
        res.status(200).json(user)
    }catch(err){
        res.status(500).json({
            message: "Error logging in user",
            error: err.message,
        });
    }
};
