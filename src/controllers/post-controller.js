const service = require('../services/post-service');
const debug = require('debug')('nodeimageboard:post-controller')

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
        next(error);
        /*
        res.status(500).send({
            message: "Failed to process your request"
        });

    */
    }
}

exports.put = async (req, res, next) => {
    try {
        let accessToken = req.body.token || req.query.token || req.headers['x-access-token'];

        await service.put(accessToken, req.params.id, req.body);

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
        let accessToken = req.body.token || req.query.token || req.headers['x-access-token'];

        await service.delete(accessToken, req.body.id);
        res.status(201).send({
            message: 'Post removed successfully!'
        });

    } catch (error) {
        debug(error);
        next(error)
    }
};