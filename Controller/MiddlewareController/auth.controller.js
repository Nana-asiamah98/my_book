const  express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//User Model
const User = require('../../Models/User/user.model');

//User Services
const AuthServices = require('../../Services/Middleware/auth.service');

const router = express.Router()



const registerUser = async (req,res) => {
    console.log(req.body)
    const userDetails = req.body;
    
    try {
        const result = await AuthServices.registerUserService(userDetails);
    //Analysts
    return res.json(result)
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
}

//User Login
const loginUser = async (req,res) => {
    console.log('Login : ' + req.body)
    const userDetails = req.body;
    try {
        const result = await AuthServices.loginUserService(userDetails);
        console.log(result)
    //Analysts
    return res.json(result)
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
    
}

module.exports = {registerUser, loginUser}