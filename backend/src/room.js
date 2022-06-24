class Room{
    constructor(roomCode){
        this.roomCode = roomCode;
        this.players = new Map();
    }
}


module.exports = Room;