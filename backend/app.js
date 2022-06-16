const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const port = 3000;
const app = express();

const authRouter = require('./routes/authRouter.js')

app.use(morgan('dev'));

console.log(__dirname);
app.use(express.static(__dirname + '/../frontend/css'));
app.use(express.static(__dirname + '/../frontend/behaviour'));
app.use(express.static(__dirname + '/../frontend/font'));
app.use(express.static(__dirname + '/../avatar'));




app.get('/',(req,res,next)=>{console.log('here'); next()},(req, res)=>{
    res.sendFile('/frontend/html/_titleScreen.html', {root: __dirname+'/..' });
})

app.get('/signup',(req,res,next)=>{console.log('here'); next()},(req, res)=>{
    res.sendFile('/frontend/html/signup.html', {root: __dirname+'/..' });
})

//Routes
app.use('/signup', authRouter);

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})