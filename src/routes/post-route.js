const express = require('express');
const router = express.Router();
const authHelper = require('../helpers/auth-helper');
const controller = require('../controllers/post-controller');

router.get('/', controller.get);
router.get('/:number', controller.getByNumber);
router.get('/tags/:tag', controller.getByTag);
router.get('/id/:id', authHelper.authenticateToken, controller.getById);

router.post('/', authHelper.authenticateToken, controller.post);
router.put('/:id', authHelper.authenticateAdminToken, controller.put);
router.delete('/', authHelper.authenticateAdminToken, controller.delete);

module.exports = router