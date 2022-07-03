const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getByUsername = async (username) => {
    const res = await User
        .findOne({
            username: username
        });

    return res;
}
exports.getByEmail = async (email) => {
    const res = await User
        .findOne({
            email: email
        });

    return res;
}

exports.getById = async (id) => {
    const res = await User
        .findById(id);

    return res;
}

exports.create = async (data) => {
    let user = new User({
        username: data.username,
        roles: ['user']
    });

    user.password = await user.hashPwd(data.password);
    await user.save();
}
