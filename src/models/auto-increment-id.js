const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true }
    },
    value: {
        type: Number
    }
});

module.exports = mongoose.model('AutoInc', schema);
