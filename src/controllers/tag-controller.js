const service = require('../services/tag-service');
const debug = require('debug')('nodeimageboard:tag-controller')

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

exports.getByName = async (req, res, next) => {
    try {
        let data = await service.getByName(req.params.name);
        res.status(200).send(data);
    } catch (error) {
        debug(error);

        res.status(500).send({
            message: "Failed to process your request"
        });
    }
}

exports.getByCategory = async (req, res, next) => {
    try {
        let data = await service.getByCategory(req.params.category);
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
                name: req.body.name,
                description: req.body.description,
                category: req.body.category
            }
        });

        res.status(201).send({
            message: "Tag registered successfully!"
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
        let accessToken = req.body.token || req.query.token || req.headers['x-access-token'];

        await service.put(accessToken, req.params.id, req.body);

        res.status(201).send({
            message: 'Tag updated successfully!'
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
            message: 'Tag removed successfully!'
        });

    } catch (error) {
        debug(error);

        res.status(500).send({
            message: "Failed to process your request"
        });

    }
};