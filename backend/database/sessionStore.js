const MongoStore = require('connect-mongo');
const sessionStore = new MongoStore({
    mongoUrl: process.env.DBSTRING,
    collectionName: 'sessions'
    
})