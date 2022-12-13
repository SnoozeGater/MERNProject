const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel');

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    res.status(200).json(users);
})

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Missing user details!')
    }

    // Check for existing username
    const userExists = await User.findOne({username: username});
    if (userExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            message:"Registered user", 
            _id: user.id, 
            username: user.username,
            token: generateToken(user.id)
        });
    } else {
        res.status(400)
        throw new Error('Invalid user data');
    }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            message:"User login", 
            _id: user.id, 
            username: user.username, 
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials');
    }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    // Check if user exists
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }

    const updatedUser = await User.findByIdAndUpdate(user.id, req.body, {new: true});

    res.status(200).json({
        message:'Updated user', 
        user_details:updatedUser
    });
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    // Check if user exists
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }

    const deletedUser = await User.findByIdAndDelete(user.id);
    res.status(200).json({
        message:'Deleted user', 
        user_details:deletedUser
    });
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, username, email } = await User.findById(req.user.id)

    res.status(200).json({
        username: username,
        email: email
    })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = {
    getAllUsers,
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getMe
};