const express = require('express');
const router = express.Router();
const controller = require('../controllers/tag-controller');
const authHelper = require('../helpers/auth-helper');

router.get('/', controller.get);
router.get('/:name', controller.getByName);
router.get('/category/:category', controller.getByCategory);
router.get('/id/:id', authHelper.authenticateToken, controller.getById);

router.post('/', authHelper.authenticateToken, controller.post);
router.put('/:id', authHelper.authenticateToken, controller.put);
router.delete('/', authHelper.authenticateToken, controller.delete);

module.exports = router;