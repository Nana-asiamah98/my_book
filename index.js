const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const MainRouter = require('./Routes/main.route')

dotenv.config({
    path: './.env'
});

// Environment Variables Path
const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(bodyParser.json())

app.use('/api',MainRouter);

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => app.listen(PORT,() => {
    console.log(`Server is running on Port ${PORT}`)
})).catch((error) => console.log(`${error} did not connect`));
