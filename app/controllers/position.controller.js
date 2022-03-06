const { body, validationResult, param } = require('express-validator');
const HttpException = require('../utils/HttpException');
const dotenv = require('dotenv');
const PositionModel = require('../models/position.model');
var express = require('express')
var multer = require('multer')
const jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const db = require("../models");
const position = db.position;
const Op = db.Sequelize.Op;
const jwtKey = 'my_secret_key'
var fs = require('fs');
let i = 0;
const User = db.users;
const { v4: uuidv4 } = require('uuid');


var upload = multer({ dest: 'uploads/' })

class PositionController {

    insertPosition = async (req, res) => {
        console.log("intent to create product");
        this.checkValidation(req.body);

        await position.create({
            latitude: req.body.latitude, longitude: req.body.longitude,
            altitude: req.body.altitude
        }).then(() => {
            res.status(200).send('Position created');

        }).catch((errors) => {
            throw new HttpException(400, ' faild', errors)
        });

    }

    checkValidation = (req) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faildè', errors);
        }
    }



}


module.exports = new PositionController;