const express = require('express');

// Import Redis Cache
const {cache} = require('../Services/Redis/redisCache.service');

// Import Controllers
const {getRepos} = require('../Services/Redis/redis.service');
const {createBook,findBook,findBooks,updateBook,deleteBook} = require('../Controller/BookController/books.controller');

const router = express.Router();

router.get('/repos/:username',cache, getRepos);

// Book
router.post('/book/add',createBook);
router.get("/book/",cache,findBooks);
router.get("/book/:book_id",cache,findBook);
router.get("/book/:book_id",updateBook);
router.delete("/book/:book_id",deleteBook);


module.exports = router;
