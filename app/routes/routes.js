const express = require('express');
const router = express.Router();
/*
const ClassListRouter = require('./Class.route');
const BlackListRouter = require('./BlackList.route');
*/
const UserRouter = require('./user.routes.js');

const auth=require('../middleware/auth')

//const route=require('../middleware/auth').router
/*

router.use(`/Class`,auth, ClassListRouter);
router.use(`/BlackList`, auth ,BlackListRouter);*/
router.use(`/user`, UserRouter);

module.exports=router;
