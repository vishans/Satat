class Player{
    constructor(name,team,hand,socketID=null){
        this.name = name;
        this.team = team;
        this.socketID = socketID;
        this.score = 0;
        this.hand = hand;
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