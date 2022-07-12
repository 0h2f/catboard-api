const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.get = async () => {
    const res = await Post
        .find({
        }, 'number image tags');

    return res;
}

exports.getByNumber = async (number) => {
    const res = await Post
        .findOne({
            number: number
        });

    return res;
}

exports.getByTag = async (tag) => {
    const res = await Post
        .find({
            tags: tag
        }, 'number image tags');

    return res;
}

exports.getById = async (id) => {
    const res = await Post.findById(id);
    return res;
}

exports.create = async (data) => {
    let post = new Post(data);
    await post.save();
}

exports.update = async function (id, data) {
    await Post
        .findByIdAndUpdate(
            id, data, { runValidators: true }
        );
}

exports.delete = async (id) => {
    await Post.findByIdAndRemove(id);
} 