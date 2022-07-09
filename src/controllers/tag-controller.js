const service = require('../services/tag-service');

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

exports.getByName = async (req, res, next) => {
    try {
        let data = await service.getByName(req.params.name);
        res.status(200).send(data);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Failed to process your request"
        });
    }
}

exports.getByCategory = async (req, res, next) => {
    try {
        let data = await service.getByCategory(req.params.category);
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
            name: req.body.name,
            description: req.body.description,
            category: req.body.category
        });

        res.status(201).send({
            message: "Tag registered successfully!"
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
            name: req.body.name,
            description: req.body.description,
            category: req.body.category
        });

        res.status(201).send({
            message: 'Tag updated successfully!'
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
            message: 'Tag removed successfully!'
        });

    } catch (e) {
        res.status(500).send({
            message: "Failed to process your request"
        });

    }
};