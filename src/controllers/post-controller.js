const service = require('../services/post-service');

exports.get = async (req, res, next) => {
    try {
        let data = await service.get();
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send({
            message: "Failed to process your request"
        });
    }
}

exports.getByNumber = async (req, res, next) => {
    try {
        let data = await service.getByNumber(req.params.number);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Failed to process your request"
        });
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        let data = await service.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Failed to process your request"
        });
    }
}

exports.getById = async (req, res, next) => {
    try {
        let data = await service.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Failed to process your request"
        });
    }
}

exports.post = async (req, res, next) => {

    try {
        await service.post({
            source: req.body.source,
            tags: req.body.tags,
            rawImage: req.body.image
        });

        res.status(201).send({
            message: "Post registered successfully!"
        });

    } catch (e) {
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

    } catch (e) {
        console.log(e);
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

    } catch (e) {
        res.status(500).send({
            message: "Failed to process your request"
        });

    }
};