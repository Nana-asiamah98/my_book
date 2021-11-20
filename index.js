const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const MainRouter = require('./Routes/main.route')
const AuthRouter = require('./Routes/auth.route')
const UserRouter = require('./Routes/user.route')

dotenv.config({
    path: './.env'
});

// Environment Variables Path
const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(bodyParser.json())

app.use('/api',MainRouter);
app.use('/api',AuthRouter);
app.use('/api',UserRouter);

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected")
})
.catch((error) => console.log(`${error} did not connect`));


console.log(`MONGO : ${MONGO_URI}`)

app.set(`port`,PORT);

app.listen(()=>{
    console.log('APP started');
})