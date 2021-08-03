const jwt = require('jsonwebtoken');
const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 300

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    console.log(req.query.uid);
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, req.query.uid, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};
const auth = () => {
    return async (req, res, next) => {

        var token = req.get('Authorization');
        console.log(token + "sssssssss")

        if (!token) {
            return res.status(401).end()
        }
        let payload
        try {
            payload = jwt.verify(token, jwtKey)
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                // if the error thrown is because the JWT is unauthorized, return a 401 error
                console.log("error")
                return res.status(401).end()
            }
            return res.status(400).end()
        }
        next();
    }
}
const express = require('express');
const router = express.Router();
//router.get('/data', auth() , (req,res)=>{
//  res.send("Very Secret Data");});
module.exports =
    verifyToken;

