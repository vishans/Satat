
class Room{
    roomTimeout = 7*24*60*60 * 1000;
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

        this.settlerChooseCardsNo = 8;
        this.settlerChooseCount = 0;
    }

    orderPlayer(){
        function invertTeam(team){
            if(team === 'A'){
                return 'B'
            }
            else{
                return 'A'
            }
        }


        let players = Array.from(this.players.values());
        let orderedPlayer = [];
       
       
        // orderedPlayer.push(players[0].username);
        // let nextTeam = invertTeam(orderedPlayer[0].team);
        let nextTeam = players[0].team;

        console.log(players.length)
        while(players.length != 0){
            
            for(let i = 0; i < players.length; i++){
                console.log(players.length)
                if(players[i].team === nextTeam){
                    orderedPlayer.push(players[i].username);
                    players.splice(i, 1);
                    nextTeam = invertTeam(nextTeam);
                    break;
                }
            }
        }
        
        return orderedPlayer;
        
        
    }
}


module.exports = Room;