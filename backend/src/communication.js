const io = require('socket.io');
const Users = require('../model/users')

class Communication{
    constructor(io, rooms){
        this.io = io;
        this.rooms = rooms;
    
    }

    async init(){
        this.io.on('connection', async (socket) => {
            
            let tempAuth = socket.request
            ._query['authCookie'];
            console.log('a user connected ' + socket.request
            ._query['authCookie']);
            console.log(tempAuth)

            let roomCode = socket.request
            ._query['roomCode'];

            //invalid room
            if(!this.rooms.has(roomCode)){
                console.log('invalid room')
                socket.emit('invalid room')
                socket.disconnect();
                return;
            }
            


            const result = await Users.findOne({tempAuth : tempAuth})
            //console.log(result)
            
            //invalid tempAuth
            if(!result){
                //to test
                console.log('forceful disconnect')
                socket.disconnect();
                return;
            }

            if(result.inGame && result.socketId != socket.id){
                console.log('more than 1 instances');
                socket.emit('more than 1 instances');
                socket.disconnect()
                return;
            }





            await Users.updateOne({_id : result._id}, {inGame: true, socketID : socket.id});
            this.rooms.get(roomCode).players.set(socket.id, 0);
            socket.join(roomCode);
            
            socket.on('disconnect', async () => {
                //implement socket disconnect on logout
              console.log('user disconnected');
              await Users.updateOne({socketID : socket.id}, {inGame: false, socketID : null});
              this.rooms.get(roomCode).players.delete(socket.id);

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