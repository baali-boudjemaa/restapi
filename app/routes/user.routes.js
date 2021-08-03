const express = require('express');
const router = express.Router();
const Usercontroller = require('../controllers/User.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const auth = require('../middleware/auth')
const { body } = require('express-validator');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
const {  validateLogin } = require('../middleware/validators/validator.middleware');
router.post('/signin', body('username').notEmpty(),
    body('password').notEmpty(), Usercontroller.signin);
router.post('/signup', body('username').notEmpty(),
    body('password').notEmpty(), Usercontroller.signup);

router.post('/user', auth(),
    awaitHandlerFactory(Usercontroller.findUser));
//i remove auth() from hre
router.post('/users/addpic', upload.single("picture"), awaitHandlerFactory(Usercontroller.adduserpic))
router.get('/users/all', Usercontroller.getAllUsers);
router.get('/az', Usercontroller.findAll);
module.exports = router;
