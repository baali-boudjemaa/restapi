const express = require('express');
const router = express.Router();
const PositionController = require('../controllers/position.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const validate = require('../middleware/validators/validator.middleware');
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator/check');

var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
const { validateLogin } = require('../middleware/validators/validator.middleware');
const { body, query } = require('express-validator');
const positionController = require('../controllers/position.controller');
router.post('/postIn', awaitHandlerFactory(PositionController.insertPosition));
module.exports = router;
