const express = require('express');

// Import Redis Cache
// const {cache} = require('../Services/Redis/redisCache.service');

// Import Controllers
const {getRepos} = require('../Services/Redis/redis.service');
const {createBook,findBook,findBooks,updateBook,deleteBook,fetchPerUser} = require('../Controller/BookController/books.controller');

//JWT Middleware
const {requireAuth} = require('../Services/Middleware/authmiddleware.service');

const router = express.Router();

// router.get('/repos/:username',cache, getRepos);

// Book
router.post('/book/add',requireAuth,createBook);
router.get("/book/",requireAuth,findBooks);
router.get("/book/user/",requireAuth,fetchPerUser);
router.get("/book/:book_id",requireAuth,findBook);
router.get("/book/:book_id",updateBook);
router.delete("/book/:book_id",deleteBook);


module.exports = router;
