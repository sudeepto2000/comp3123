const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User signup
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ 
            message: 'User created successfully',
            user_id: newUser._id
         });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// User login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const jwt_token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || require('crypto').randomBytes(64).toString('hex'),
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', jwt_token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { signup, login };
