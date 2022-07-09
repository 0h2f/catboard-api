const mongoose = require('mongoose');
const Tag = mongoose.model('Tag');

exports.get = async () => {
    const res = await Tag
        .find({
        }, 'name description category');

    return res;
}

exports.getByName = async (name) => {
    const res = await Tag
        .find({
            name: name,
        });

    return res;
}

exports.getByCategory = async (category) => {
    const res = await Tag
        .find({
            category: category,
        });

    return res;
}


exports.getById = async (id) => {
    const res = await Tag
        .findById(id);

    return res;
}

exports.create = async (data) => {
    let tag = new Tag(data);
    await tag.save();
}

exports.update = async function (id, data) {
    await Tag
        .findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                description: data.description,
                category: data.category,
                lastUpdate: Date.now()
            }
        });
}

exports.delete = async (id) => {
    await Tag.findByIdAndRemove(id);
} 