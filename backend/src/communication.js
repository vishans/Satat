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

    addPlayerToRoom(roomCode, socket, player){
        this.rooms.get(roomCode).players.set(socket.id, player);

    }

    getRoom(roomCode){
        return this.rooms.get(roomCode);
    }

    getPlayer(socket){
        return this.rooms.get(socket.data.roomCode).players.get(socket.id);
    }

    deletePlayerFromRoom(socket){
        return this.rooms.get(socket.data.roomCode).players.delete(socket.id);

    }

    getPlayers(socket){
        return this.rooms.get(socket.data.roomCode).players;
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

            //more than 4 players in room
            if(this.rooms.get(roomCode).players.size >= 4){
                console.log('room full')
                socket.emit('room full')
                socket.disconnect();
                return;
            }
            


            const result = await Users.findOne({tempAuth : tempAuth})
            //console.log(result)
            
            //invalid tempAuth
            if(!result){
                //to test
                console.log('forceful disconnect')
                socket.emit('not signed in')
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


            await Users.updateOne({_id : result._id}, {inGame: true, socketID : socket.id, roomCode});
            let newPlayer = new Player(result.username, result.avatar, playerAdmin, socket.id)
            
            this.addPlayerToRoom(roomCode, socket, newPlayer)
            socket.join(roomCode);
            socket.data.roomCode = roomCode;
            
          
        
            const playersInRoom = this.rooms.get(roomCode).players;
           
            const tempPlayerArray = [];
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
            
            const username = this.getUsername(socket); //this.rooms.get(socket.data.roomCode).players.get(socket.id).username
            this.io.to(socket.data.roomCode).emit('ready', {username, state: false})
            
                
            socket.on('disconnecting', async ()=> {
                //implement socket disconnect on logout
                console.log('user disconnected');
                await Users.updateOne({socketID : socket.id}, {inGame: false, socketID : null, roomCode: null});
                
                
                const userThatDisconnected = this.getPlayer(socket);
                const username = userThatDisconnected.username;
                let newAdmin = null;
                
                this.deletePlayerFromRoom(socket);
                let newUsername = null;
                if(userThatDisconnected.admin && this.rooms.get(socket.data.roomCode).players.size > 0){
                    const newAdmin = this.rooms.get(socket.data.roomCode).players.values().next().value;
                    
                    this.rooms.get(socket.data.roomCode).players.get(newAdmin.socketID).admin = true;
                    newUsername = newAdmin.username;

                }
                socket.broadcast.to(socket.data.roomCode).emit('user disconnect', {username: username, newAdmin: newUsername })

                // if(this.rooms.get(socket.data.roomCode).players.size == 0){
                //     this.rooms.delete(socket.data.roomCode);
                //     console.log('room deleted ')
                // }

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

                
                
                this.getPlayer(socket).team = teamName;
                this.io.to(socket.data.roomCode).emit(`put in`, {username, teamName})

                // when player changes team, his state becomes unready by default
                this.getPlayer(socket).ready = false;
                this.io.to(socket.data.roomCode).emit('ready', {username, state: false})

                
            })


            socket.on('ready', ()=>{
                if(this.getPlayer(socket).team == null){
                    return;
                }
                
                const state = this.getPlayer(socket).ready;

                const username = this.getUsername(socket);
               
                this.getPlayer(socket).ready = !state;

                this.io.to(socket.data.roomCode).emit('ready', {username, state: !state})
                let readyCount = 0;
                this.getPlayers(socket).forEach(player => {
                    if (player.team != null && player.ready){
                        readyCount++;
                    }
                })

                if(readyCount > 3){
                    this.io.to(socket.data.roomCode).emit('do transition');
                    // setTimeout(()=>{
                    //     this.io.to(socket.data.roomCode).emit('do game');
                    //     this.getRoom(socket.data.roomCode).roomState = 'game';

                    // },3000)
                }

            })

            socket.on('settingParam', (param)=>{
                
                //TODO: to validate params 
                if(!this.getPlayer(socket).admin) return;
                
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