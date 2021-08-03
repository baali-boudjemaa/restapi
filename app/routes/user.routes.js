const express = require('express');
const router = express.Router();
const Usercontroller = require('../controllers/User.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const validate = require('../middleware/validators/validator.middleware');
const auth = require('../middleware/auth')
const {check, validationResult} = require('express-validator/check');

var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
const {  validateLogin } = require('../middleware/validators/validator.middleware');
const { body ,query} = require('express-validator');
router.post('/signin',validate.signin,awaitHandlerFactory( Usercontroller.signin));
router.post('/signup',validate.signup, Usercontroller.signup);

router.post('/data', auth,
    awaitHandlerFactory(Usercontroller.findAll));
//i remove auth() from hre
router.post('/users/addpic', upload.single("picture"), awaitHandlerFactory(Usercontroller.adduserpic))
router.get('/users/all', auth,Usercontroller.getAllUsers);
router.get('/az', auth,Usercontroller.findAll);
router.post('/azz', [

        check('username').isLength(10).not().isEmpty().withMessage('username must have more than 10 characters'),
        check('email', 'Your email is not valid').not().isEmpty(),
        check('password', 'Your password must be at least 5 characters').not().isEmpty(),
    ],
    function (req, res) {
        const errors = validationResult(req);
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            res.send({});
        }
    });

module.exports = router;
