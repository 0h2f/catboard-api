const repository = require('../repositories/user-repository');
const authHelper = require('../helpers/auth-helper');

exports.register = async ({ username, password }) => {
    await repository.create({
        username: username,
        password: password,
        roles: ["user"]
    });
}

exports.authenticate = async ({ username, password }) => {

    let user = await repository.getByUsername(username);
    let isPwdValid = await user.isPwdValid(password);
    if (user && isPwdValid) {
        let data = {
            id: user._id,
            username: user.username,
            roles: user.roles
        }

        let token = await authHelper.generateAccessToken(data);

        return {
            token: token,
            user: data
        }
    }
}

exports.refreshAccessToken = async (token) => {
    const tokenData = await authHelper.decodeAccessToken(token);
    let user = await repository.getById(tokenData.id);

    if (user) {
        let data = {
            id: user._id,
            username: user.username,
            roles: user.roles
        }

        let newToken = await authHelper.generateAccessToken(data);

        return {
            token: newToken,
            user: data
        }
    }
}