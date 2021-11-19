const express = require('express');

// Import Redis Cache
const {cache} = require('../Services/Redis/redisCache.service');

// Import Redis Controller
const {getRepos} = require('../Services/Redis/redis.service');

const router = express.Router();

router.get('/repos/:username',cache, getRepos);

module.exports = router;
