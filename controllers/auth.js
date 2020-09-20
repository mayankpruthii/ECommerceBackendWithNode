const User = require("../models/user");
const { body, validationResult } = require('express-validator');
var jwt = require("jsonwebtoken");
var expressjwt = require("express-jwt");

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    const user = new User(req.body)
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: "not able to save user in db"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    }); 
};

exports.signout = (req, res) => {
    res.json({
        message: "User signout"
    });
};

exports.signin = (req, res) => {
    const {email, password} = req.body;
    // if there are any errors in the email address
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    // if there are users or not
    User.findOne({email}, (err, user) =>{
        if(err || !user){
            return res.status(400).json({
                error: "User email doesn't exist"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }
        // create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        // put token in cookie
        res.cookie("token", token, {expire: new Date() + 999});
        // send response to front end
        const {_id, name, email, role} = user;
        return res.json({token, user: {_id, name, email, role}});
    })
};
