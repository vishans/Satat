const io = require('socket.io');
const Users = require('../model/users')
const Player = require('./players')


class Communication{
    constructor(io, rooms){
        this.io = io;
        this.rooms = rooms;


    
    }

    getUsername(socket){
       return this.rooms.get(socket.data.roomCode).players.get(socket.id).username

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

            let playerAdmin = false;
            if(this.rooms.get(roomCode).players.size == 0){
                playerAdmin = true;
                console.log('is admin')
            }


            await Users.updateOne({_id : result._id}, {inGame: true, socketID : socket.id});
            let newPlayer = new Player(result.username, result.avatar, playerAdmin, socket.id)
            this.rooms.get(roomCode).players.set(socket.id, newPlayer);
            socket.join(roomCode);
            socket.data.roomCode = roomCode;
            
          
        
            const playersInRoom = this.rooms.get(roomCode).players;
           
            const tempPlayerArray = []
            playersInRoom.forEach((value, key, map)=>{
                
                tempPlayerArray.push({'username': value.username,
                                        'avatar': value.avatar,
                                    'lobbyVisibility': value.lobbyVisibility,
                                'team': value.team,
                            'ready': value.ready,
                            'admin': value.admin});
            })
            
            const justConnectedPlayer = this.rooms.get(roomCode).players.get(socket.id)
            console.log('yyy' + justConnectedPlayer.admin)
            socket.broadcast.to(roomCode).emit('new conn', {'username': justConnectedPlayer.username,
                                                    'avatar': justConnectedPlayer.avatar,
                                                'lobbyVisibility': justConnectedPlayer.lobbyVisibility,
                                                'ready': justConnectedPlayer.ready,
                                                'admin': justConnectedPlayer.admin
                                            })
            //console.log(this.rooms.get(roomCode).settingParam)
            socket.emit('handshake', {username: result.username, 
                                        //avatar: result.avatar,
                                        players: tempPlayerArray,
                                        settingParam: this.rooms.get(roomCode).settingParam});
            
            const username = this.rooms.get(socket.data.roomCode).players.get(socket.id).username
            this.io.to(socket.data.roomCode).emit('ready', {username, state: false})
            
                
            socket.on('disconnecting', async ()=> {
                //implement socket disconnect on logout
                console.log('user disconnected');
                await Users.updateOne({socketID : socket.id}, {inGame: false, socketID : null});
                
                
                const userThatDisconnected =this.rooms.get(socket.data.roomCode).players.get(socket.id);
                const username = userThatDisconnected.username;
                let newAdmin = null;
                this.rooms.get(socket.data.roomCode).players.delete(socket.id);
                let newUsername = null;
                if(userThatDisconnected.admin && this.rooms.get(socket.data.roomCode).players.size > 0){
                    newAdmin = this.rooms.get(socket.data.roomCode).players.values().next().value;
                    
                    this.rooms.get(socket.data.roomCode).players.get(newAdmin.socketID).admin = true;
                    newUsername = newAdmin.username;

                }
                socket.broadcast.to(socket.data.roomCode).emit('user disconnect', {username: username, newAdmin: newUsername })

            });


            socket.on('team', (teamName)=>{
                if(!(teamName != 'A' || teamName != 'B' ||teamName != null)) return;
                const username = this.getUsername(socket);
                
                let teamACount = 0;
                let teamBCount = 0;
                this.rooms.get(socket.data.roomCode).players.forEach((value,key)=>{
                    if(value.team === 'A'){
                        teamACount++;
                        return
                    }

                    if(value.team === 'B'){
                        teamBCount++;
                        return
                    }
                })

                if((teamName == 'A' && teamACount ===2) || (teamName == 'B' && teamBCount ===2)){
                    return;
                }

                
                this.rooms.get(socket.data.roomCode).players.get(socket.id).team = teamName;
                this.io.to(socket.data.roomCode).emit(`put in`, {username, teamName})

                //if(teamName === null){
                    this.rooms.get(socket.data.roomCode).players.get(socket.id).ready = false;
                    this.io.to(socket.data.roomCode).emit('ready', {username, state: false})

                //}
            })


            socket.on('ready', ()=>{
                if(this.rooms.get(socket.data.roomCode).players.get(socket.id).team == null){
                    return;
                }
                const state = this.rooms.get(socket.data.roomCode).players.get(socket.id).ready;
                const username = this.getUsername(socket);
                this.rooms.get(socket.data.roomCode).players.get(socket.id).ready = !state;
                this.io.to(socket.data.roomCode).emit('ready', {username, state: !state})
            })

            socket.on('settingParam', (param)=>{
                //if(param.length != 4) return;
                //TODO: to validate params 
                if(!this.rooms.get(socket.data.roomCode).players.get(socket.id).admin) return;
                
                this.rooms.get(socket.data.roomCode).settingParam = param;
                socket.broadcast.to(socket.data.roomCode).emit('settingParam', param);
            })
        
        });

        
        
    }

    start(){
        this.init();
    }

    
}

module.exports = Communication;