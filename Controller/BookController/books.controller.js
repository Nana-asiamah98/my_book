const express = require('express');
// const redis = require('redis');
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv');

dotenv.config({
    path: './.env'
});

// const REDIS_PORT = process.env.REDIS_PORT || 6379;

const JWT_SECRET = process.env.SECRET


const TOKEN = process.env.TOKEN || 'token';

const router = express();

// const client = redis.createClient(REDIS_PORT);


// Services
const BookService = require('../../Services/Book/book.service');

// Instances
const BookServiceInstance = new BookService();


// Create Book Controller
async function createBook(req,res) {
    try{
        const {id} = decodeJWT(req);
        const bookModel = {
            'title' : req.body.title,
            'description' : req.body.description,
            'user_id' : id
        };
        const bookData = await BookServiceInstance.createBook(bookModel);
        
        //Set data to redis
        
        return res.send(bookData);

    } catch(err){
        return res.status(500).send(err);
    }
}

// Fetch Based On User Id
async function fetchPerUser(req,res){
    try {
        const {id} = decodeJWT(req);
        const bookData = await BookServiceInstance.findBookByUserId(id);

        return res.send(bookData);
    } catch (error) {
        return res.status(200).send(error);

    }
}

// Find A Book
async function findBook(req,res) {
    try{
        const bookData = await BookServiceInstance.findBook(req.params.book_id);
        return res.send(bookData);

    } catch(err){
        return res.status(500).send(err);
    }
}


// Find  Books
async function findBooks(req,res) {
    try{
        const bookData = await BookServiceInstance.findBooks();
        // client.setex(TOKEN, 3600, JSON.stringify(bookData));
        
        return res.send(bookData);

    } catch(err){
        return res.status(500).send(err);
    }
}

// Update a Books
async function updateBook(req,res) {
    try{
        const bookData = await BookServiceInstance.updateBook(req.params.id,req.body);
        return res.send(bookData);

    } catch(err){
        return res.status(500).send(err);
    }
}

// Delete A Book
async function deleteBook(req,res) {
    try{
        const bookData = await BookServiceInstance.deleteBook(req.params.book_id);
        return res.send(bookData);

    } catch(err){
        return res.status(500).send(err);
    }
}



// JWT DECODE
function decodeJWT(req){
    const token = req.headers.authorization.split(" ")[1];
    
    payload = jwt.verify(token, JWT_SECRET);
    return payload;
}


module.exports = {createBook,findBook,findBooks,updateBook,deleteBook, fetchPerUser};
