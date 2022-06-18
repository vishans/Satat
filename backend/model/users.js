const mongoose = require('mongoose');
//mongoose.connect(process.env.DBSTRING).then(()=>console.log('DB success connection'))
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        //required: true
    },
    password:  {
        type: String,
        //required: true
    },
    name: {
        type: String,
        //required: true
    },
    email:  {
        type: String,
        unique: true
        //required: true
    },
    avatar: {
        type: String,
        //required: true
    }
});

const Users = mongoose.model('users', userSchema);
module.exports = Users;