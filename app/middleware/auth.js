const jwt = require('jsonwebtoken');
const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 300


const auth = () => {
    return async (req, res, next) => {

        // We can obtain the session token from the requests cookies, which come with every request
        //const token = req.cookies.token
        var token = req.get('Authorization');
        console.log(token + "sssssssss")

        // if the cookie is not set, return an unauthorized error
        if (!token) {
            return res.status(401).end()
        }

        let payload
        try {
            // Parse the JWT string and store the result in `payload`.
            // Note that we are passing the key in this method as well. This method will throw an error
            // if the token is invalid (if it has expired according to the expiry time we set on sign in),
            // or if the signature does not match
            payload = jwt.verify(token, jwtKey)
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                // if the error thrown is because the JWT is unauthorized, return a 401 error
                console.log("error")
                return res.status(401).end()
            }
            // otherwise, return a bad request error
            return res.status(400).end()
        }

        // Finally, return the welcome message to the user, along with their
        // username given in the token
        // res.send(`Welcome ${payload.username}!`)
        next();
    }
}
const express = require('express');
const router = express.Router();
//router.get('/data', auth() , (req,res)=>{
//  res.send("Very Secret Data");});
module.exports =
    auth;

