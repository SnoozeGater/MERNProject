const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Please add author'],
        },
        title: {
            type: String,
            required: [true, 'Please add title'],
        },
        content: {
            type: String,
            required: [true, 'Please add content'],
        },
    },
    {
        timestamps: true,
        collection: 'posts'
    }
);

module.exports = mongoose.model('Post', postSchema);