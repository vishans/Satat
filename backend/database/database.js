const mongoose = require('mongoose');
mongoose.connect(process.env.DBSTRING).then(()=>console.log('DB success connection'))


