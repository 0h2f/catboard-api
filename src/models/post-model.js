const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }]
});

/*TODO a better way to serialize the post number field*/

/*>>i dont want to create a new table to just do that,
even if this is the most correct method<<*/

/*
this function is here more to be a placeholder than anything,
because this method isnt reliable (breaks if any document is 
deleted :] ). 

>stackoverflow.com/a/41690744
 */

schema.pre('save', function (next) {
    let number = 1;
    let Post = this.constructor;

    Post.find({}, (err, posts) => {
        if (err) throw err;

        number = posts.length + 1;
        this.number = number;
        next();
    });

});

module.exports = mongoose.model('Post', schema);
