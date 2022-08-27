class Player{
    constructor(username, avatar,admin, socketID){
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
        this.ready = false;
        this.admin = admin;
        this.settlerChooseIndex = null;

        this.timeoutID = null;
        
        this.renounce = {
            'Spade': [],
            'Heart': [],
            'Diamond': [],
            'Club': [],

        }
    }

    startTimer(timeout, callback){
        this.timeoutID = setTimeout(callback, (timeout));
    }

    cancelTimer(){
        clearTimeout(this.timeoutID);
    }
}

module.exports = Player;