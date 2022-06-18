const Users = require('../model/users.js');


module.exports.signUpPost = async function(req, res, next){
    const allowedAttributes = ['name', 'username','email', 'password', 'avatar'];
    const newBody ={};
    allowedAttributes.forEach((attribute)=>{
        newBody[attribute] = req.body[attribute];
    })

    newBody['avatar'] = newBody['avatar'].split('/').at(-1);
    //check for possible duplicates

    const duplicates = await Users.find({$or:[{username: newBody['username']}, {email: newBody['email']}]});
    console.log(duplicates);
    if(!duplicates.length){
        const createdDoc = await Users.create(newBody);
        console.log(createdDoc);
        req.session.username = newBody['username'];
        req.session.save();
        
        res.status(200).redirect('/');
        
    }else{
        console.log('nope');
        res.status(400).send('Credentials already exists');
    }
    
}

module.exports.signUpView = function(req, res, next){
    res.sendFile('/frontend/html/signup.html', {root: __dirname+'/../..' });
        
}

//module.exports = signUpController;