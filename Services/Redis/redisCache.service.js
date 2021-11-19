const redis = require('redis');
const dotenv = require('dotenv');

const {setResponse} = require('../../Services/Redis/redisResponse.service');


dotenv.config({
    path: '/.env'
});


const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

function cache(req,res,next){
    const {username} = req.params;

    client.get(username,(err,data) => {
        if(err) throw err;

        if(data != null){
            res.send(setResponse(username,data))
        }else{
            next();
        }
    })
}

module.exports = {cache};