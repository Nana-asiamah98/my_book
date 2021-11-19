const express = require('express');

const {getUsers,getUserById,updateUserById,deleteUserById} =  require('../Controller/UserController/users.controller');

//Middleware
const {requireAuth} = require('../Services/Middleware/authmiddleware.service');

const router = express.Router();

//User Routes
router.get('/users', requireAuth, getUsers);
router.get('/users/:userId',getUserById)
router.put('/users/:userId',updateUserById)
router.delete('/users/:userId',deleteUserById)

module.exports = router;