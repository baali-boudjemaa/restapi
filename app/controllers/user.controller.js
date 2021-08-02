const { validationResult, param } = require('express-validator');
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

var upload = multer({ dest: 'uploads/' })
class UserController {
    findAll = (req, res) => {


        users.findAll({  })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            });
    };
    getAllUsers = async (req, res) => {
        return await UserModel.getAllUsers().then(value => {
            console.log("")
            //  return value[0];
            res.send(value)
        });
    }
    findUser = async (req, res) => {
        //  this.checkValidation(req);
        let token = req.get('Authorization');
        var us = jwt.decode(token, jwtKey);
        console.log("eeeeeeeeeeeeeeeeeeeeee" + us.username);
        return await UserModel.getUser(us.username).then(value => {
            console.log(value)
            //  return value[0];



            let userinfo = {
                "user_id": value.id,
                "first_name": value.username,
                "last_name": value.username,
                "email": value.username,
                "role": "user",
                "validity": 1,
                "token": req.get('Authorization'),
                "image": value.image
            };
            console.log(userinfo);
            res.send(userinfo)
        });
        //  return {username,password} ;

        console.log("llllllllllllllllllllllllllllllllllllllllllll" + i++)

    }
    insertUser = async (req, res) => {

        this.checkValidation(req.body);
        console.log("bbbbbbbbb");
        await UserModel.getUser(req).then(user => {
            console.log("dddddddddddddd")
            if (user) {
                const error = new Error('User already exists');
                error.status = 409;
                throw error;
            }
            const hash = bcrypt.hashSync(req.body.password, 10);
            UserModel.AddUser({ id: req.body.id, username: req.body.username, password: hash }).then(() => {
                res.status(200).send('User created');
            })
        }).catch((errors) => {
            throw new HttpException(400, ' faild', errors)
        });

    }

    checkValidation = (req) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
    adduserpic = (req, res) => {

        this.checkValidation(req.query);
        console.log("Received file" + req.file.originalname);
        var src = fs.createReadStream(req.file.path);
        var dest = fs.createWriteStream('uploads/' + req.file.originalname);
        src.pipe(dest);
        src.on('end', function () {
            fs.unlinkSync(req.file.path);
            res.json('OK: received ' + req.file.originalname);
            var path = req.file.originalname;
            var username = req.body.username;

            console.log("received");
            UserModel.userupdate({ path, username }).catch((errors) => {
                throw new HttpException(400, ' faild', errors)
            });
        });
        src.on('error', function (err) { res.json('Something went wrong!'); });
    }

    userupdate = (req, res) => {



    }



}


module.exports = new UserController;