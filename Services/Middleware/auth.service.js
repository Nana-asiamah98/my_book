const  express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../../Models/User/user.model');

const router = express.Router()

//User Registeration
async function registerUserService(userdetails){
    console.log(userdetails)
    //Analysts

    const salt = await bcrypt.genSalt(10)

    const {username, password: plainTextPassword } = userdetails;
    
    const password = await bcrypt.hash(plainTextPassword,10);

    if(!username || typeof username !== 'string'){
        return {status: 'error', error: 'Invalid Username'}
    }

    if(!password || typeof password !== 'string'){
        return {status: 'error', error: 'Invalid Password'}
    }

    if(password.length < 5){
        return {status: 'error', error: 'Password characters less than 5'}
    }

    
    try {
        const response = await User.create({
            username,
            password
        })
        return{
            status: 'ok',
            message: response.username + ' is created'
        }
    } catch (error) {
        console.log(error)
        if(error.code === 11000){
            return new Response({status: 'error', error: 'Username Duplicated'})
        }
        return {status: 'error',message: error}
    }

    //Hashing the passwords
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)

    json({
        status:'ok'
    });
}

//User login
async function loginUserService(userDetails){
    console.log(userDetails);

    
    const {username, password} = userDetails;

    if(!username || typeof username !== 'string'){
        return {status: 'error', error: 'Invalid Username'}
    }

    if(!password || typeof password !== 'string'){
        return {status: 'error', error: 'Invalid Password'}
    }

    if(password.length < 5){
        return {status: 'error', error: 'Password characters less than 5'}
    }

    try {
        const user = await User.findOne({username}).lean();
        if(!user){
            return {status: 'error', error: 'User Is Not Registered'}
        }

        if(await bcrypt.compare(password, user.password)){
            
            //JWT
            const payload = {id : user._id, username : user.username}
            const JWT_SECRET = process.env.SECRET

            //JWT Token Generation
            const token = await jwt.sign(payload,JWT_SECRET,)


            
            return {status: 'ok', message: 'User Logged In Successful', jwt_token: token}
        }
    } catch (error) {
        console.log(error)
        if(error.code === 11000){
            return {status: 'error', error: 'Username Duplicated'}
        }
        return {status: 'error'}
    }
}



module.exports = {registerUserService, loginUserService};