const repository = require('../repositories/user-repository');
const authHelper = require('../helpers/auth-helper');
const httpError = require('../helpers/error-handler/error-handler');
const debug = require('debug')('nodeimageboard:user-controller');

exports.register = async (req, res, next) => {
    try {
        await repository.create({
            username: req.body.username,
            password: req.body.password,
            roles: ["user"]
        });

        res.status(201).send({
            message: "User registered successfully!"
        });

    } catch (error) {
        debug(error);
        next(error);

    }
}

exports.authenticate = async (req, res, next) => {
    try {
        let user = await repository.getByUsername(req.body.username);
        let isPwdValid = await user.isPwdValid(req.body.password);
    
        if (!user && isPwdValid)
            throw new httpError.unauthorized("User or password invalid");

        let acessToken = await authHelper.generateAccessToken({
            id: user._id,
            username: user.username,
            roles: user.roles
        });

        res.status(201).send({
            token: acessToken,
            data: {
                username: user.username,
                roles: user.roles
            }
        });

    } catch (error) {
        debug(error);
        next(error);

    }
}

exports.refreshAccessToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const tokenData = await authHelper.decodeAccessToken(token);

        let user = await repository.getById(tokenData.id);
    
        if (!user)
            throw new httpError.notFound("User not found");
    
        let newToken = await authHelper.generateAccessToken({
            id: user._id,
            username: user.username,
            roles: user.roles
        });

        res.status(201).send({
            token: newToken,
            data: {
                username: user.username,
                roles: user.roles
            }
        });

    } catch (error) {
        debug(error);
        next(error);

    }
}
