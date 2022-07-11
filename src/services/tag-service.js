const repository = require('../repositories/tag-repository');
const authHelper = require('../helpers/auth-helper');
/*NOTE:
i think the authHelper should not be here, simply because
the service is calling a helper that is a generic service
basically stealing the purpose of the controller, but for now
authHelper stays here(dev convenience)
*/
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

exports.put = async (token, tagId, data) => {
    let tagDocument = await repository.getById(tagId);
    let user = await authHelper.decodeAccessToken(token);
    let isAuthor = await tagDocument.isAuthor(user.id);

    if (!isAuthor)
        throw new Error("User is not the author");

    await repository.update(tagId, data);
}

exports.delete = async (token, tagId) => {
    let tagDocument = await repository.getById(tagId);
    let user = await authHelper.decodeAccessToken(token);
    let isAuthor = await tagDocument.isAuthor(user.id);

    if (!isAuthor)
        throw new Error("User is not the author");

    await repository.delete(tagId);
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