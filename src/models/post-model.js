const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoInc = require("./auto-increment-id");

const schema = new Schema({
    number: {
        type: Number,
        index: { unique: true },
        default: 69024
    },
    source: {
        type: String,
        trim: true
    },
    postDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    imageInfo: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: String,
        required: true,
        enum: ['safe', 'questionable', 'explicit'],
        default: 'questionable'
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

schema.pre('save', function (next) {
    let Postpre = this;
    AutoInc.findOneAndUpdate({id: 'postId'}, {$inc: {value: 1}}, (err, autoincId) => {
        if(err) return next(err);
        Postpre.number = autoincId.value;
        next()
    });
});

schema.methods.isAuthor = async function (userId) {
    return this.author.toString() === userId;
}

module.exports = mongoose.model('Post', schema);
