class Room{
    constructor(roomCode){
        this.roomCode = roomCode;
        this.roomState = 'lobby'
        this.players = new Map();
    }
}


module.exports = Room;