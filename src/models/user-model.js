const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        index: { unique: true }
    },
    email: {
        type: String,
        trim: true,
        index: {
            unique: true,
            partialFilterExpression: { email: { $type: "string" } }
        }
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }],
    joinDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

schema.methods.isPwdValid = async function (password) {
    return bcrypt.compare(password, this.password);
}

schema.methods.hashPwd = async function (password) {
    return bcrypt.hash(password, 8, null);
}

module.exports = mongoose.model('User', schema);