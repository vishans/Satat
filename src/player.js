class Player{
    constructor(username, avatar,team, socketID){
        this.username = username;
        this.avatar = avatar;
        this.team = null;
        this.socketID = socketID;
        this.team = team;
        this.teamColor = 'beige';
        this.masterPlayerInfoObject = null;
        //this.score = 0;
        //this.hand = hand;
        this.renounce = {
            'Spade': [],
            'Heart': [],
            'Diamond': [],
            'Club': [],

        };
    }
}

class gameCapture{
    constructor(Playerorder){
        this.Playerorder = Playerorder;
        this.currentTurn = 1;
        this.playerTurnCounter = 1;
        this.history = [];
    }


}