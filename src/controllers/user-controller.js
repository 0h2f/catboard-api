const service = require('../services/user-service')

/*TODO a sane method to handle errors.*/

exports.post = async (req, res, next) => {
    try {
        await service.register({
            username: req.body.username,
            password: req.body.password
        })

        res.status(201).send({
            message: "User registered successfully!"
        });

    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Failed to process your request"
        });

    }
}

exports.authenticate = async (req, res, next) => {
    try {

        let token = await service.authenticate({
            username: req.body.username,
            password: req.body.password
        });

        if (!token) {
            res.status(401).send({
                message: "Invalid username or password"
            });

            return;
        }

        res.status(201).send({
            token: token.token,
            data: {
                username: token.user.username,
                roles: token.user.roles
            }
        });

    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Failed to process your request"
        });

    }
}

exports.refreshAccessToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        let newToken = await service.refreshAccessToken(token);

        if (!newToken) {
            res.status(404).send({
                message: "User not found"
            });

            return;
        }

        res.status(201).send({
            token: newToken.token,
            data: {
                username: newToken.user.username,
                roles: newToken.user.roles
            }
        });

    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Failed to process your request"
        });

    }
}
