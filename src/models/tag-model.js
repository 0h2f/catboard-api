const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true }
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['general', 'character', 'copyright', 'artist', 'meta'],
        default: 'general'
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastUpdate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

schema.methods.isAuthor = async function (userId) {
    return this.author.toString() === userId;
}


module.exports = mongoose.model('Tag', schema);
