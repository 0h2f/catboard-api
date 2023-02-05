const express = require('express');
const router = express.Router();
const authHelper = require('../helpers/auth-helper');
const controller = require('../controllers/post-controller');

router.get('/', controller.get);
router.get('/id/:number', controller.getByNumber);
router.get('/tags/', controller.getByTag);
router.get('/_id/:id', authHelper.authenticateAdminToken, controller.getById);

router.post('/', authHelper.authenticateToken, controller.post);
router.put('/:id', authHelper.authenticateToken, controller.put);
router.delete('/', authHelper.authenticateToken, controller.delete);

module.exports = router