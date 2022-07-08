class Room{
    constructor(roomCode){
        this.roomCode = roomCode;
        this.roomState = 'lobby'
        this.players = new Map();
        this.settingParam ={
            midgamelLeavers: 'loseGame',
            nextRoundWaitTime: '8',
            startGame: 'playerCard',
            troopChooser: 'startingPlayer'
          };
    }
}


module.exports = Room;