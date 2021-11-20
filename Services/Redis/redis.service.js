// const redis = require('redis');
// const fetch = require('node-fetch');
// const dotenv = require('dotenv');

// const setResponse = require('../../Services/Redis/redisResponse.service');

// dotenv.config({
//     path: '/.env'
// });


// const REDIS_PORT = process.env.REDIS_PORT || 6379;

// const client = redis.createClient(REDIS_PORT);

// // Make requiest to github for data
// async function getRepos(req, res,next){
//     console.log("Hello");
//     try {
        
    
//         const {username} = req.params;
    
//         const response = await fetch(`https://api.github.com/users/${username}`);
    
//         const data = await response.json();
    
//         res.send(data);
    
//         const repos = data.public_repos;

//         //Set data to redis
//         client.setex(username, 3600, repos);
    
//         console.log(setResponse(username, repos));
    
    
//     } catch (error) {
//         console.log(error);
//         res.status(500);
//     }
    
//     }

//     module.exports = {getRepos};