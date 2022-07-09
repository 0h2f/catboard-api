const service = require('../services/post-service');
const postConDebug = require('debug')('nodeimageboard:post-controller')

exports.get = async (req, res, next) => {
    try {
        let data = await service.get();
        res.status(200).send(data);
    }
    catch (error) {
        debug(error);

        res.status(500).send({
            message: "Failed to process your request"
        });
    }
}

exports.getByNumber = async (req, res, next) => {
    try {
        let data = await service.getByNumber(req.params.number);
        res.status(200).send(data);
    } catch (error) {
        debug(error);

        res.status(500).send({
            message: "Failed to process your request"
        });
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        let data = await service.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (error) {
        debug(error);

        res.status(500).send({
            message: "Failed to process your request"
        });
    }
}

exports.getById = async (req, res, next) => {
    try {
        let data = await service.getById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        debug(error);

        res.status(500).send({
            message: "Failed to process your request"
        });
    }
}

exports.post = async (req, res, next) => {
    try {
        let accessToken = req.body.token || req.query.token || req.headers['x-access-token'];

        await service.post({
            accessToken: accessToken,
            data: {
                source: req.body.source,
                tags: req.body.tags,
                rawImage: req.body.image
            }
        });

        res.status(201).send({
            message: "Post registered successfully!"
        });

    } catch (error) {
        debug(error);

        res.status(500).send({
            message: "Failed to process your request"
        });

    }
}
exports.put = async (req, res, next) => {
    try {
        await service.put(req.params.id, {
            source: req.body.source,
            image: req.body.image,
            imageInfo: req.body.imageInfo,
            tags: req.body.tags
        });

        res.status(201).send({
            message: 'Post updated successfully!'
        });

    } catch (error) {
        debug(error);

        res.status(500).send({
            message: "Failed to process your request"
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await service.delete(req.body.id);
        res.status(201).send({
            message: 'Post removed successfully!'
        });

    } catch (error) {

        debug(error);
        res.status(500).send({
            message: "Failed to process your request"
        });

    }
};