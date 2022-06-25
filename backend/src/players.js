class Player{
    constructor(username, avatar, socketID){
        this.username = username;
        this.avatar = avatar;
        this.team = null;
        this.socketID = socketID;
        this.team = null;
        this.teamColor = 'beige';
        this.masterPlayerInfoObject = null;
        this.lobbyVisibility = true;
        this.score = 0;
        this.hand = null;
        this.roomCode = 0;
        this.renounce = {
            'Spade': [],
            'Heart': [],
            'Diamond': [],
            'Club': [],

        }
    }
}

module.exports = Player;