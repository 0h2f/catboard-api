const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');
const authHelper = require('../helpers/auth-helper');

router.post('/register', controller.register);
router.post('/login', controller.authenticate);
router.post('/refresh-token', authHelper.authenticateToken, controller.refreshAccessToken);

module.exports = router;