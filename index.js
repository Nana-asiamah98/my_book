const express = require('express');
const redis = require('redis');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

const MainRouter = require('./Routes/main.route')

dotenv.config({
    path: '/.env'
});

// Environment Variables Path
const PORT = process.env.PORT || 5000;

const app = express();

app.use('/api',MainRouter);


app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});