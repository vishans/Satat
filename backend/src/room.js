
class Room{
    roomTimeout = 60*60 * 1000;
    constructor(io, roomCode, rooms, timeOut = null){
        this.io = io;
        this.rooms = rooms;
        this.roomCode = roomCode;
        this.roomState = 'lobby'
        this.players = new Map();
        this.settingParam ={
            midgamelLeavers: 'loseGame',
            nextRoundWaitTime: '8',
            startGame: 'playerCard',
            troopChooser: 'startingPlayer'
        };
        this.timeOutID = setTimeout(()=>{
            console.log('triggerd')
            if(this.players.size == 0){
                console.log('Terminated empty room ' + this.roomCode);
                this.rooms.delete(this.roomCode);
                return;
            }


            this.players.forEach((player, key, map)=>{
                console.log(io)
                const socket = this.io.sockets.sockets.get(player.socketID);
                socket.emit('room timeout');
                socket.disconnect();
            })
        }, this.roomTimeout)
    }
}


module.exports = Room;