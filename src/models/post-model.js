const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    number,
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

Schema.pre('save', function (next) {
    var number = 1;
    var post = this;
    post.find({}, (err, posts) => {
        if (err) throw err;
        number = post.length + 1;
        post.number = number;
        next();
    });

});
/*
userSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;

    var sno = 1;
    var user = this;
    User.find({}, function(err, users) {
    if (err) throw err;
        sno = users.length + 1;
        user.sno = sno;
        next();
    });
});
*/


module.exports = mongoose.model('Post', schema);
