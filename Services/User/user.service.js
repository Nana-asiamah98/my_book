const  express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../../Models/User/user.model');

const router = express.Router()

//Get All Users
function getAllUsersService(){
    try {
        return new Promise((resolve,reject) => {
            User.find()
                .exec(function (err, users){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(users);
                    }
                })
        })
    } catch (error) {
        console.log(error)
        if(error.code === 11000){
            return {status: 'error', error: 'Username Duplicated'}
        }
        return {status: 'error'}
    }
}

//Get User By id
async function getUserByIdService(userId){
    console.log(userId)

    try {
        return await User.findById(userId).then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        })
    } catch (error) {
        
        return {
            status : 'error',
            message : 'User Profile Is Not Available'
        }
    }
}

//Update User By Id
async function updateUserService(userDetails,user_id){
    console.log(`first step ${user_id}`);

    const salt = await bcrypt.genSalt(10)

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
        const user = await User.findById(user_id)
        if(!user){
            return {status: 'error', error: 'User Is Not Registered'}
        }
  
        if(user != null){
            const hashedPassword = await bcrypt.hash(userDetails.password,10);

            const userData = {
                username : userDetails.username,
                password: hashedPassword
            }
            console.log(user_id)
            return await User.findOneAndUpdate({
                _id: user_id
            },userData).then((result) => {
                result = result.toJSON();
                return result;
            });
            
        }
        
            
    } catch (error) {
        console.log(error)
        if(error.code === 11000){
            return {status: 'error', error: 'Username Duplicated'}
        }
        return {status: 'error'}
    }
}


//Delete User By Id
function deleteUserByIdService(user_id){
    return new Promise((resolve,reject) => {
        User.findByIdAndRemove({
            _id : user_id
        },(err) => {
            if(err){
                reject(err)
            }else{
                resolve(err)
            }
        })
    })
}



module.exports = {getAllUsersService, getUserByIdService , updateUserService, deleteUserByIdService};