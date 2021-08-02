const auth=require('../middleware/auth')
const express = require('express');
const router = express.Router();
const SignIncontroller = require('../controllers/SignIn.controller');
const {  validateLogin } = require('../middleware/validators/validator.middleware');
const { body ,query} = require('express-validator');
router.post('/signin', body('username').notEmpty(),
body('password').notEmpty(), SignIncontroller.userLogin);
module.exports = router;