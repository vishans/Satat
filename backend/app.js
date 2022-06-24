const http = require('http');
const express = require('express');
const socketIO = require('socket.io');




const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

dotenv.config({path: './config.env'})

const mongoose = require('mongoose');
mongoose.connect(process.env.DBSTRING).then(()=>console.log('DB success connection'))

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = 3000;



//utils
const makeTempID = require('./utils/makeTempID')

//src
const Communication = require('./src/communication');
const Room = require('./src/room');


//pug
app.set('view engine', 'pug');
app.set('views', './frontend/pug');

//game stuffs
let globalRoom = new Map();
let connectedUsers = new Map();

globalRoom.set('123456789', new Room('123456789'))





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
app.use(express.static(__dirname + '/../src/'));




app.get('/',async (req, res)=>{
    let result = await Users.findOne({username: req.session.username}).select({avatar: 1, inGame: 1});
    let avatar = null;
    if (result) {
        avatar = result.avatar;
        const tempID = makeTempID(10);
        if(!result.inGame){
            await Users.updateOne({username: req.session.username}, {tempAuth: tempID});
            res.cookie('tempAuth', tempID);
        }
    }
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

    console.log(req.body)

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

    res.status(403).send('Bad credentials')


})


app.get('/game', function(req,res){
    res.render('index');
})

app.get('/aroom', function(req, res){
    if(req.session.username){
        let roomCode = makeTempID(9,true);
        globalRoom.set(roomCode, new Romm(roomCode))
        res.send({
            status: 'sucess',
            roomCode});

        console.log(globalRoom);
        return
    }

    res.status(403).send('You need to be signed in');
})
//await Users.updateMany({inGame: true}, {inGame: false, socketID: null})
const resetInGame = async () =>{
    await Users.updateMany({inGame: true}, {inGame: false, socketID: null})
}

resetInGame();

com = new Communication(io, globalRoom);
com.start();



server.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})

