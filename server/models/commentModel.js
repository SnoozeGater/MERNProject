const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Please add author'],
        },
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Please add subject'],
        },
        text: {
            type: String,
            required: [true, 'Please add text'],
        },
        likes: {
            type: Number,
            required: false,
        },
        comments: {
            type: [mongoose.Schema.Types.ObjectId],
            required: false,
        },
    },
    {
        timestamps: true,
        collection: 'posts'
    }
);

module.exports = mongoose.model('Comment', commentSchema);