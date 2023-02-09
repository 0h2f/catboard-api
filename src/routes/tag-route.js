const express = require('express');
const router = express.Router();
const controller = require('../controllers/tag-controller');
const authHelper = require('../services/auth-service');

router.get('/', controller.get);
router.get('/:name', controller.getByName);
router.get('/category/:category', controller.getByCategory);
router.get('/_id/:id', authHelper.authenticateAdminToken, controller.getById);

router.post('/', authHelper.authenticateToken, controller.post);
router.put('/:name', authHelper.authenticateToken, controller.put);
router.delete('/', authHelper.authenticateToken, controller.delete);

module.exports = router;