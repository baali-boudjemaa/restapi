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
const User = db.users;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


var upload = multer({ dest: 'uploads/' })
class UserController {
    signup = (req, res) => {
    // Save User to Database
        User.findOne({
            where: {
                username: req.body.email
            }
        }).then(user => {
            if (user) {
                return res.status(404).send({message: "User already exist."});
            }else {
                User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 8)
                })
                    .then(user => {
                        res.status(200).send({
                            id: user.id,
                            username: user.username,
                            email: user.email,
                        });
                    })
                    .catch(err => {
                        res.status(500).send({ message: err.message });
                    });
            }});


};

    signin = (req, res) => {
        User.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(user => {
                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }

                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );

                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }

                var token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 // 24 hours
                });

                var authorities = [];

                    res.status(200).send({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        roles: authorities,
                        accessToken: token
                    });
                })

            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    };
    findAll = async(req, res) => {
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
    findOne = async (req, res) => {
        const username = req.params.username;

        users.findOne({ where: { username:username } })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving user with username=" + username
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