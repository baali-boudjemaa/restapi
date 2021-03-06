const express = require('express');
const router = express.Router();
/*
const ClassListRouter = require('./Class.route');
const BlackListRouter = require('./BlackList.route');
*/
const UserRouter = require('./user.routes.js');
const PostionRouter = require('./position.routes.js');
const CartRouter = require('./cart.routes.js');
const auth = require('../middleware/auth')

//const route=require('../middleware/auth').router
/*

router.use(`/Class`,auth, ClassListRouter);
router.use(`/BlackList`, auth ,BlackListRouter);*/
router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.use(`/user`, UserRouter);
router.use(`/postion`, PostionRouter);
router.use("/cart", CartRouter);
module.exports = router;
