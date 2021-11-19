const  express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//User Model
const User = require('../../Models/User/user.model');

//User Services
const UserServices = require('../../Services/User/user.service');

const router = express.Router()

//Get All Users
const getUsers = async (req,res) => {
    const userDetails = req.body;
    
    try {
        const result = await UserServices.getAllUsersService(userDetails)
        console.log(result)
    //Analysts
    return res.json(result)
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
}

//Get User By Id
const getUserById = async (req,res) => {
    const user_id = req.params.userId;
    try {
        const result = await UserServices.getUserByIdService(user_id)
        console.log(result)
    //Analysts
    return res.json(result)
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
}

//Update User by Id
const updateUserById = async (req,res) => {
    const userDetails = req.body;
    const user_id = req.params.userId
    try {
        await UserServices.updateUserService(userDetails,user_id)
        if(result.status == "error"){
            console.log(result)
            return res.status(204).send({});
        }else{
            console.log(result)
            //Analysts
            return res.status(204).send({});
        }
        
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
}

//Delete User By Id
const deleteUserById = async(req,res) => {
    const user_id = req.params.userId

    try {
        await UserServices.deleteUserByIdService(user_id).then(
            (result) => {
                return res.json({
                    status : 'ok',
                    message: 'User Profile Deleted'
                })
            }
        )
    } catch (error) {
        return res.json(error)
    }
}

module.exports = {getUsers,getUserById,updateUserById,deleteUserById};