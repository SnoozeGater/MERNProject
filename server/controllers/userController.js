const asyncHandler = require('express-async-handler')

const User = require('../models/usersModel');

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    res.status(200).json(users);
})

// @desc    Set new user
// @route   POST /api/users
// @access  Private
const newUser = asyncHandler(async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400);
        throw new Error('Missing user details!')
    }

    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    res.status(200).json({message:"New user", user:user});
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

    res.status(200).json({message:'Updated user', user_details:updatedUser});
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
    res.status(200).json({message:'Deleted user', user_details:deletedUser});
})

module.exports = {
    getUsers,
    newUser,
    updateUser,
    deleteUser
};