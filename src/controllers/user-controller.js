const repository = require('../repositories/user-repository');
const authHelper = require('../services/auth-service');
const httpError = require('../services/error-handler/error-handler');

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
        next(error);

    }
}

exports.authenticate = async (req, res, next) => {
    try {
        let user = await repository.getByUsername(req.body.username);
        if ( !(user && await user.isPwdValid(req.body.password)) )
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
        next(error);

    }
}
exports.usernameExists = async (req, res, next) => {
    try {
        let userExist = await repository.getByUsername(req.params.username);
        
        if(userExist)
            res.status(200).send({"result":true});
        
        res.status(200).send({"result":false});

    } catch (error) {
        next(error);

    }
}

exports.put = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const tokenData = await authHelper.decodeAccessToken(token);
        
        let user = await repository.getById(tokenData.id);
        let isPwdValid = await user.isPwdValid(req.body.password);

        if (!isPwdValid)
            throw new httpError.unauthorized("Invalid password");
        
        let putData = { $set: {} };
        
        if(req.body.new_password)
            putData.$set["password"] = await user.hashPwd(req.body.new_password);
        
        if(req.body.email)
            putData.$set["email"] = req.body.email;
        
        if(req.body.username) {
            let userExists = await repository.getByUsername(req.body.username);

            if(userExists)
                throw new httpError.conflict("Username already exists");

            putData.$set["username"] = req.body.username;
        }

        await repository.update(user.id, putData);

        res.status(201).send({
            message: 'Post updated successfully!'
        });

    } catch (error) {
        next(error);

    }
}