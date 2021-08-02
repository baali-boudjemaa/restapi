const { validationResult } = require('express-validator');
const HttpException = require('../utils/HttpException');
const dotenv = require('dotenv');
const  users=require("../models/User.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const Usercontroller = require('../controllers/User.controller');
const jwtKey = 'my_secret_key'
const UserModel = require('../models/User.model');
const jwtExpirySeconds = 3000
class  SignInController {
    signIn = (req, res) => {// Get credentials from JSON body
        this.checkValidation(req);
        const {username, password} = req.body
        console.log("" + username + password)
        if (!username || !password || users[username] !== password) {
            // return 401 error is username or password doesn't exist, or if password does
            // not match the password in our records
            return res.send("access not grant")// res.status(401).end()
        }

        // Create a new token with the username in the payload
        // and which expires 300 seconds after issue
        const token = jwt.sign({username}, jwtKey, {
            algorithm: 'HS256',
            expiresIn: jwtExpirySeconds
        })
        console.log('token:', token)

        // set the cookie as the token string, with a similar max age as the token
        // here, the max age is in milliseconds, so we multiply by 1000
        res.cookie('token', token, {maxAge: jwtExpirySeconds * 1000})
        let userinfo=   {
            "user_id": "3",
            "first_name": "Signe",
            "last_name": "Thompson",
            "email": "student@example.com",
            "role": "user",
            "validity": 1,
            "token": token
        };
        res.send("access grant")
    }
    userLogin = async (req, res, next) => {
        console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"+req.body.password)

        this.checkValidation(req);

        const { username:username, password } = req.body;

        console.log(username)
        console.log(password)
        const user = await UserModel.getUser(username);
        console.log(user.password)//
        if (!user) {
            console.log(user.username);
            throw new HttpException(401, 'Unable to login!');
        }

        let usrpass=user.password;
        const isMatch = await bcrypt.compare(req.body.password,usrpass);
        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }else {
            // user matched!
            const secretKey = "supersecret" || "";
            // const token = jwt.sign({username}, jwtKey, {
            //     algorithm: 'HS256',
            //     expiresIn: jwtExpirySeconds
            // })
            const token= jwt.sign({username}, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            });
            let userinfo=   {
                "user_id":user.id,
                "first_name":user.username,
                "last_name":user. username,
                "password":user.password,
                "email":user. username,
                "role": "user",
                "validity": 1,
                "token": token
            };
            //res.send(token)
            res.cookie('token', token, {maxAge: jwtExpirySeconds * 1000})
            var us=  jwt.decode(token, jwtKey);
            console.log(us.username);
            res.send(userinfo)
        }

       let gentoken=async (username)=>{
            const token= jwt.sign({username}, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            });

            return token;
        }

    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}
module.exports= new SignInController();