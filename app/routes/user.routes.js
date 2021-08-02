const express = require('express');
const router = express.Router();
const Usercontroller = require('../controllers/User.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const auth = require('../middleware/auth')
const { body } = require('express-validator');
var multer = require('multer');
const { NText } = require('mssql');
var upload = multer({ dest: 'uploads/' })
router.post('/user', auth(),
    awaitHandlerFactory(Usercontroller.findUser));
router.post('/users/add', body('id').isNumeric().notEmpty(),
    body('username').isAlpha().notEmpty(),
    body('password').isAlpha().notEmpty(), awaitHandlerFactory(Usercontroller.insertUser));
//i remove auth() from hre
router.post('/users/addpic', upload.single("picture"), awaitHandlerFactory(Usercontroller.adduserpic))
router.get('/users/all', Usercontroller.getAllUsers);
router.post('/update_userdata',);
module.exports = router;
