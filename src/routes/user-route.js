const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');
const authHelper = require('../services/auth-service');

router.get('/username-exists/:username', authHelper.authenticateToken, controller.usernameExists);
router.post('/refresh-token', authHelper.authenticateToken, controller.refreshAccessToken);
router.post('/register', controller.register);
router.post('/login', controller.authenticate);
router.put('/', authHelper.authenticateToken, controller.put);

module.exports = router;