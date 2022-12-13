const express = require("express");
const router = express.Router();
const { 
    getAllUsers, 
    registerUser, 
    loginUser, 
    updateUser, 
    deleteUser, 
    getMe 
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.route('/')
    .get(getAllUsers)
    .post(registerUser);

router.route('/:id')
    .put(updateUser)
    .delete(deleteUser);

router.route('/login').post(loginUser);

router.get('/me', protect, getMe);

module.exports = router;