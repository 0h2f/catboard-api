const repository = require('../repositories/post-repository');
const uuid = require('uuid');
const storageHelper = require('../services/storage-service');
const authHelper = require('../services/auth-service');
const httpError = require('../services/error-handler/error-handler');

exports.get = async (req, res, next) => {
    try {
        let data = await repository.get();
        res.status(200).send(data);

    }
    catch (error) {
        next(error);

    }
}

exports.getByNumber = async (req, res, next) => {
    try {
        let data = await repository.getByNumber(req.params.number);
        res.status(200).send(data);

    } catch (error) {
        next(error);

    }
}

exports.getByTag = async (req, res, next) => {
    try {
        let data = await repository.getByTag(req.body.tag);
        res.status(200).send(data);

    } catch (error) {
        next(error);

    }
}

exports.getById = async (req, res, next) => {
    try {
        let data = await repository.getById(req.params.id);
        res.status(200).send(data);

    } catch (error) {
        next(error);

    }
}

exports.post = async (req, res, next) => {
    try {
        let accessToken = req.body.token || req.query.token || req.headers['x-access-token'];
        let user = await authHelper.decodeAccessToken(accessToken);

        let matches = req.body.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let rawType = matches[1];
        let buffer = new Buffer.from(matches[2], 'base64');
    
        let filename = uuid.v4() + '.jpg';
    
        let image = await storageHelper.uploadBlockBlob('sample', {
            blobName: filename,
           blobBuffer: buffer
        });

        await repository.create({
            source: req.body.source,
            image: image,
            imageInfo: rawType,
            tags: req.body.tags,
            author: user.id
        });

        res.status(201).send({
            message: "Post registered successfully!"
        });

    } catch (error) {
        next(error);

    }
}

exports.put = async (req, res, next) => {
    try {
        let accessToken = req.body.token || req.query.token || req.headers['x-access-token'];

        let postDocument = await repository.getByNumber(req.params.number);
        let user = await authHelper.decodeAccessToken(accessToken);
        let isAuthor = await postDocument.isAuthor(user.id);
    
        if (!isAuthor)
            throw new httpError.forbidden("User is not the author");
    
        let putData = { $set: {} };
    
        let editableParams = {
            source: "source",
            imageInfo: "imageInfo",
            tags: "tags"
        }
    
        Object.keys(req.body).forEach((key) => {
            if (editableParams[key])
                putData.$set[key] = req.body[key];
    
        });
    
        await repository.update(req.params.id, putData);

        res.status(201).send({
            message: 'Post updated successfully!'
        });

    } catch (error) {
        next(error);

    }
};

exports.delete = async (req, res, next) => {
    try {
        let accessToken = req.body.token || req.query.token || req.headers['x-access-token'];
        let postDocument = await repository.getByNumber(req.body.number);
        let user = await authHelper.decodeAccessToken(accessToken);
        let isAuthor = await postDocument.isAuthor(user.id);
    
        if (!isAuthor)
            throw new httpError.forbidden("User is not the author");

        await repository.delete(req.body.id);

        res.status(201).send({
            message: 'Post removed successfully!'
        });

    } catch (error) {
        next(error);

    }
};