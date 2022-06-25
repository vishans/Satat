const io = require('socket.io');
const Users = require('../model/users')
const Player = require('./players')


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

            // do not allow more than 1 instances of game per client
            if(result.inGame && result.socketId != socket.id){
                console.log('more than 1 instances');
                socket.emit('more than 1 instances');
                socket.disconnect()
                return;
            }





            await Users.updateOne({_id : result._id}, {inGame: true, socketID : socket.id});
            let newPlayer = new Player(result.username, result.avatar, socket.id)
            this.rooms.get(roomCode).players.set(socket.id, newPlayer);
            socket.join(roomCode);
            socket.data.roomCode = roomCode;
            
            socket.on('disconnecting', async ()=> {
                //implement socket disconnect on logout
              console.log('user disconnected');
              await Users.updateOne({socketID : socket.id}, {inGame: false, socketID : null});
              
             
              const username =this.rooms.get(socket.data.roomCode).players.get(socket.id).username
              this.rooms.get(socket.data.roomCode).players.delete(socket.id);
              socket.broadcast.to(socket.data.roomCode).emit('user disconnect', {username: username })

            });
        
            const playersInRoom = this.rooms.get(roomCode).players;
           
            const tempPlayerArray = []
            playersInRoom.forEach((value, key, map)=>{
                
                tempPlayerArray.push({'username': value.username,
                                        'avatar': value.avatar,
                                    'lobbyVisibility': value.lobbyVisibility});
            })
            
            const justConnectedPlayer = this.rooms.get(roomCode).players.get(socket.id)
            socket.broadcast.to(roomCode).emit('new conn', {'username': justConnectedPlayer.username,
                                                    'avatar': justConnectedPlayer.avatar,
                                                'lobbyVisibility': justConnectedPlayer.lobbyVisibility})
            
            socket.emit('handshake', {username: result.username, 
                                        avatar: result.avatar,
                                        players: tempPlayerArray});
                
            //console.log(socket.rooms)
        
        });

        
        
    }

    start(){
        this.init();
    }
}

module.exports = Communication;