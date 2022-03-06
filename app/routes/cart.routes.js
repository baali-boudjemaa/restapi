const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart.controller.js');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const validate = require('../middleware/validators/validator.middleware');
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator/check');

var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
const { validateLogin } = require('../middleware/validators/validator.middleware');
const { body, query } = require('express-validator');

router.post('/AddItem', awaitHandlerFactory(CartController.insertProduct));
router.get('/getItem', awaitHandlerFactory(CartController.getProduct));
module.exports = router;
