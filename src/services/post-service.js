const repository = require('../repositories/post-repository');
const config = require('../config');
const uuid = require('uuid');
const storageHelper = require('../helpers/storage-helper');

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

exports.put = async (id, data) => {
    await repository.update(id, data);
}

exports.delete = async (id) => {
    await repository.delete(id);
}

/*im wondering if just uploading the image without checks to
the container is safe, bc on php im basically building 
a backdoor on my server doing this, even if the container is 
isolated of the server. Php is weird...*/
exports.post = async ({ source, tags, rawImage }) => {

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
        tags: tags
    });
}