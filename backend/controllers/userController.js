const User = require('../modals/user');
const jwt = require('jsonwebtoken');

/**
 * Registers a new user.
 */
async function registerUser(req, res) {
    try {
        const { name, email, password, role, phone } = req.body;
        // Check if user already exists
        
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const user = new User({ name, email, password, role, phone });
        await user.save();
        if (role === 'driver') {
            res.status(201).json({ message: "Driver Registered", user });
        } else {
            res.status(201).json({ message: "User Registered", user });
        }
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: "Error registering user", error });
    }
}

/**
 * Logs in a user by verifying email and password.
 */
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
    
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        user.password = undefined;
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },

            process.env.JWT_SECRET || 'your_jwt_secret',
        
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: "Login successful", user ,token});
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
}

/**
 * Gets the user profile.
 */
async function getUserProfile(req, res) {
    try {
        // Get token from Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User Profile", user });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user profile", error });
    }
}
/**
 * Fetches all users with the role 'driver'.
 */
/**
 * Fetches all users by role.
 */
async function getAllByRole(req, res) {
    try {
        const { role } = req.query;
        if (!role) {
            return res.status(400).json({ message: "Role query parameter is required" });
        }
        const users = await User.find({ role }).select('-password');
        res.status(200).json({ message: `All users with role: ${role}`, users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users by role", error });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    getAllByRole
};
