const repository = require('../repositories/post-repository');
const config = require('../config');
const uuid = require('uuid');
const storageHelper = require('../helpers/storage-helper');
const authHelper = require('../helpers/auth-helper');

exports.get = async () => {
    return await repository.get();
}

exports.getByNumber = async (number) => {
    return await repository.getByNumber(number);
}

exports.getByTag = async (tag) => {
    return await repository.getByTag(tag);
}

exports.getById = async (id) => {
    return await repository.getById(id);
}

exports.put = async (token, postId, body) => {
    let postDocument = await repository.getById(postId);
    let user = await authHelper.decodeAccessToken(token);
    let isAuthor = await postDocument.isAuthor(user.id);

    if (!isAuthor)
        throw new Error("User is not the author");

    let putData = { $set: {} };

    let editableParams = {
        source: "source",
        image: "image",
        imageInfo: "imageInfo",
        tags: "tags"
    }

    Object.keys(body).forEach((key) => {
        if (editableParams[key])
            putData.$set[key] = body[key];

    });

    await repository.update(postId, putData);
}

exports.delete = async (token, postId) => {
    let postDocument = await repository.getById(postId);
    let user = await authHelper.decodeAccessToken(token);
    let isAuthor = await postDocument.isAuthor(user.id);

    if (!isAuthor)
        throw new Error("User is not the author");

    await repository.delete(postId);
}

/*NOTE:
im wondering if just uploading the image without checks to
the container is safe, bc on php im basically building 
a backdoor on my server doing this, even if the container is 
isolated of the server. Php is weird...*/
exports.post = async ({ accessToken, data: { source, tags, rawImage } }) => {
    let user = await authHelper.decodeAccessToken(accessToken);

    let matches = rawImage.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let rawType = matches[1];
    let buffer = new Buffer.from(matches[2], 'base64');

    let filename = uuid.v4() + '.jpg';

    let image = await storageHelper.uploadBlockBlob('sample', {
        blobName: filename,
        blobBuffer: buffer
    });


    await repository.create({
        source: source,
        image: image,
        imageInfo: rawType,
        tags: tags,
        author: user.id
    });
}