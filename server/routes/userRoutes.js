const express = require("express");
const router = express.Router();
const { getUsers, newUser, updateUser, deleteUser } = require("../controllers/userController");

router.route('/')
    .get(getUsers)
    .post(newUser);

router.route('/:id')
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;