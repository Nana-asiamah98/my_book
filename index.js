const express = require('express');
const redis = require('redis');
const fetch = require('node-fetch');

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();


function setResponse(username, repos){
        return `<h1>${username} has ${repos} on Github repos.</h1>`
}


// Make requiest to github for data
async function getRepos(req, res,next){
try {


    const {username} = req.params;

    const response = await fetch(`https://api.github.com/users/${username}`);

    const data = await response.json();

    res.send(data);

    const repos = data.public_repos;

    //Set data to redis
    client.setex(username, 3600, repos);

    console.log(setResponse(username, repos));


} catch (error) {
    console.log(error);
    res.status(500);
}

}


// Cache Middleware
function cache(req,res,next){
    const {username} = req.params;

    client.get(username, (err,data) => {
        if(err) throw err;

        if(data != null) {
            res.send(setResponse(username,data))
        }else{
            next();
        }
    })
}

app.get('/repos/:username',cache, getRepos);

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});