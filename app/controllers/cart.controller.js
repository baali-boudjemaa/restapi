const { body, validationResult, param } = require('express-validator');
const HttpException = require('../utils/HttpException');
const dotenv = require('dotenv');
const UserModel = require('../models/User.model');
var express = require('express')
var multer = require('multer')
const jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const db = require("../models");
const users = db.users;
const Op = db.Sequelize.Op;
const jwtKey = 'my_secret_key'
var fs = require('fs');
let i = 0;
const User = db.users;
const Cart = db.cart;
const { v4: uuidv4 } = require('uuid');


var upload = multer({ dest: 'uploads/' })
class CartController {
    insertProduct = async (req, res) => {
        this.checkValidation(req.body);
        console.log("bbbbbbbbb");
        await Cart.create({
            uid: req.body.uid,
            itemID: uuidv4(),
            productID: req.body.productid,
        }).then(() => {
            res.status(200).send('product created');

        }).catch((errors) => {
            throw new HttpException(400, ' faild', errors)
        });

    }
    getProduct = async (req, res) => {
        Cart.findAll({})
            .then(data => {
                res.send({ "carts": data });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            });
    };

    checkValidation = (req) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faildè', errors);
        }
    }

}




module.exports = new CartController;