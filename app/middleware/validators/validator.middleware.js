const { body,param } = require('express-validator');
const {check, validationResult} = require('express-validator/check');

exports.getItemClassSchema = [
    param('id')
        .exists()
        .isNumeric()
        .withMessage('Must be a number')

];
exports.signin=[
    check('username').isLength({ min: 3 }).not().isEmpty().withMessage('username must have more than 3 characters'),
    check('password', 'Your password must be at least 5 characters').not().isEmpty(),
];
exports.signup=[
    check('name').isLength({ min: 3 }).not().isEmpty().withMessage('username must have more than 10 characters'),
    check('username').isLength({ min: 3 }).not().isEmpty().withMessage('username must have more than 10 characters'),
    check('email', 'Your email is not valid').not().isEmpty().isEmail(),
    check('password', 'Your password must be at least 5 characters').not().isEmpty(),
];
