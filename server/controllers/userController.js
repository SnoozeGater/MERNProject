const asyncHandler = require('express-async-handler')

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler((req, res) => {
    res.status(200).json({message:"Get users"});
})

// @desc    Set new user
// @route   POST /api/users
// @access  Private
const newUser = asyncHandler((req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400);
        throw new Error('Missing user details!')
    }
    res.status(200).json({message:"New user", user:req.body});
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler((req, res) => {
    res.status(200).json({message:`Update user ${req.params.id}`});
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler((req, res) => {
    res.status(200).json({message:`Delete user ${req.params.id}`});
})

module.exports = {
    getUsers,
    newUser,
    updateUser,
    deleteUser
};