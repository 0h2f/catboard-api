const repository = require('../repositories/tag-repository');
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

exports.getByName = async (req, res, next) => {
    try {
        let data = await repository.getByName(req.params.name);
        res.status(200).send(data);

    } catch (error) {
        next(error);

    }
}

exports.getByCategory = async (req, res, next) => {
    try {
        let data = await repository.getByCategory(req.params.category);
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

        await repository.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            author: user.id
        });

        res.status(201).send({
            message: "Tag registered successfully!"
        });

    } catch (error) {
        next(error);

    }
}
exports.put = async (req, res, next) => {
    try {
        let accessToken = req.body.token || req.query.token || req.headers['x-access-token'];

        let tagDocument = await repository.getByName(req.params.name);
        let user = await authHelper.decodeAccessToken(accessToken);
        let isAuthor = await tagDocument.isAuthor(user.id);
    
        if (!isAuthor)
            throw new httpError.unauthorized("User is not the author");
    
        let putData = { $set: {} };
    
        let editableParams = {
            name: "name",
            description: "description",
            category: "category",
        }
    
        Object.keys(req.body).forEach((key) => {
            if (editableParams[key])
                putData.$set[key] = req.body[key];
    
        });
    
        putData.$set['lastUpdate'] = Date.now();
        await repository.update(req.params.id, putData);

        res.status(201).send({
            message: 'Tag updated successfully!'
        });

    } catch (error) {
        next(error);

    }
};

exports.delete = async (req, res, next) => {
    try {
        let accessToken = req.body.token || req.query.token || req.headers['x-access-token'];
        let tagDocument = await repository.getByName(req.body.name);
        let user = await authHelper.decodeAccessToken(accessToken);
        let isAuthor = await tagDocument.isAuthor(user.id);

        if (!isAuthor)
            throw new httpError.unauthorized("User is not the author");

        await repository.delete(tagDocument.id);

        res.status(201).send({
            message: 'Tag removed successfully!'
        });

    } catch (error) {
        next(error);

    }
};