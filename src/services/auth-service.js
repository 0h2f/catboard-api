const jwt = require('jsonwebtoken');
const config = require('../config');
const httpError = require('../services/error-handler/error-handler');

exports.generateAccessToken = async (data) => {
    return jwt.sign(data, config.TOKEN_SECRET, { expiresIn: '1d' });
}

exports.decodeAccessToken = async (token) => {
    return await jwt.verify(token, config.TOKEN_SECRET);
}

exports.authenticateToken = function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        throw new httpError.unauthorized("This request requires user authentication");
    }

    try {
        jwt.verify(token, config.TOKEN_SECRET);
        next();
    } catch (error) {
        throw new httpError.badRequest("Invalid token");
    }
}

exports.authenticateAdminToken = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        throw new httpError.unauthorized("This request requires user authentication");
    }

    try {
        let tokenData = jwt.verify(token, config.TOKEN_SECRET);

        if (tokenData.roles.includes('admin')) {
            next();
        } else {
            throw new httpError.unauthorized("This request requires administrator privillegies");
        }
    } catch (error) {
        throw new httpError.badRequest("Invalid token");
    }
}