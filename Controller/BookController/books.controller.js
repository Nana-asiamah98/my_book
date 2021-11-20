const express = require('express');
const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config({
    path: '/.env'
});

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const TOKEN = process.env.TOKEN || 'token';

const router = express();

const client = redis.createClient(REDIS_PORT);


// Services
const BookService = require('../../Services/Book/book.service');

// Instances
const BookServiceInstance = new BookService();

// Create Book Controller
async function createBook(req,res) {
    try{
        const bookData = await BookServiceInstance.createBook(req.body);
        //Set data to redis
        
        return res.send(bookData);

    } catch(err){
        return res.status(500).send(err);
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
        client.setex(TOKEN, 3600, JSON.stringify(bookData));
        
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

module.exports = {createBook,findBook,findBooks,updateBook,deleteBook};
