const io = require('socket.io');
const Users = require('../model/users')

class Communication{
    constructor(io, connectedUsers){
        this.io = io;
        this.connectedUsers = connectedUsers;
    
    }

    async init(){
        this.io.on('connection', async (socket) => {
            
            let tempAuth = socket.request
            ._query['authCookie'];
            console.log('a user connected ' + socket.request
            ._query['authCookie']);
            console.log(tempAuth)
            const result = await Users.findOne({tempAuth : tempAuth})
            //console.log(result)
            if(!result){
                //to test
                console.log('forceful disconnect')
                socket.disconnect();
                return;
            }
            await Users.updateOne({_id : result._id}, {inGame: true, socketID : socket.id});
            this.connectedUsers.set(socket.id, socket);
            //console.log(this.connectedUsers)
            
            socket.on('disconnect', async () => {
                //implement socket disconnect on logout
              console.log('user disconnected');
              await Users.updateOne({socketID : socket.id}, {inGame: false, socketID : null});
              this.connectedUsers.delete(socket.id);
            });
        
            socket.emit('handshake', {username: result.username, 
                                        avatar: result.avatar});
        
        
        });

        
        
    }

    start(){
        this.init();
    }
}

module.exports = Communication;