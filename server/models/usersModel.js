const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please add username'],
        },
        email: {
            type: String,
            required: [true, 'Please add email'],
        },
        password: {
            type: String,
            required: [true, 'Please add password'],
        },
    },
    {
        //timestamps: true,
        collection: 'users'
    }
);

module.exports = mongoose.model('User', userSchema);