const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const port = 3000;
dotenv.config({path: './config.env'})

const mongoose = require('mongoose');
mongoose.connect(process.env.DBSTRING).then(()=>console.log('DB success connection'))

const app = express();

app.set('view engine', 'pug');
app.set('views', './frontend/pug');

const sessionStore = new MongoStore({
    mongoUrl: process.env.DBSTRING,
    collectionName: 'sessions'
    
})

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false,
    
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //one day
    },
    store: sessionStore
}))

const Users = require('./model/users.js');


const authRouter = require('./routes/authRouter.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

console.log(__dirname);
app.use(express.static(__dirname + '/../frontend/css'));
app.use(express.static(__dirname + '/../frontend/behaviour'));
app.use(express.static(__dirname + '/../frontend/font'));
app.use(express.static(__dirname + '/../avatar'));




app.get('/',async (req, res)=>{
    console.log('u' + req.session.username)
    let avatar = await Users.findOne({username: req.session.username}).select({avatar: 1});

    if (avatar) avatar = avatar.avatar;
    
    res.render('_titleScreen', {loggedIn: req.session.username,
    userName: req.session.username,
    imgSrc: '/'+avatar});
    console.log(req.session)
    //res.sendFile('/frontend/html/_titleScreen.html', {root: __dirname+'/..' });
})

// app.get('/signup',(req,res,next)=>{console.log('here'); next()},(req, res)=>{
//     res.sendFile('/frontend/html/signup.html', {root: __dirname+'/..' });
// })

//Routes
app.use('/signup', authRouter);

app.get('/signout', function(req,res){
    console.log('here y')
    req.session.destroy();
    res.redirect('/');
})

app.get('/signin', function(req,res){
    res.render('logIn');
})

app.post('/signin', async function(req,res){
    username = req.body.username;
    password = req.body.password;

    const doc = await Users.findOne({username: username});
    console.log(doc)
    if(doc){
        if(doc.password == password){
            req.session.username = username;
            req.session.save();
            res.redirect('/');
            return
        }
    }

    res.send('Bad credentials')


})

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})