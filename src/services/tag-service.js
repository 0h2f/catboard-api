const repository = require('../repositories/tag-repository');
const authHelper = require('../helpers/auth-helper');

exports.get = async () => {
    return await repository.get();
}

exports.getByName = async (name) => {
    return await repository.getByName(name);
}

exports.getByCategory = async (category) => {
    return await repository.getByCategory(category);
}

exports.getById = async (id) => {
    return await repository.getById(id);
}

exports.put = async (id, data) => {
    await repository.update(id, data);
}

exports.delete = async (id) => {
    await repository.delete(id);
}

exports.post = async ({ accessToken, data: { name, description, category } }) => {
    let user = await authHelper.decodeAccessToken(accessToken);

    await repository.create({
        name: name,
        description: description,
        category: category,
        author: user.id
    });
}