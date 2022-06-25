class ClientCommunication{
    constructor(){
        this.authCookie = document.cookie.split('=')[1];
        this.roomCode = document.querySelector('.room-code #code').innerText.split('-').join('');
        console.log(this.roomCode)


        socket = io('/', {query: {'authCookie': this.authCookie,
                                        'roomCode': this.roomCode}});
        this.mySocketID = socket.id; 
        this.moi = null;   
        socket.on('handshake', (params)=>
        {
            playerContainer.innerHTML = '';
            teamA.innerHTML = '';
            teamB.innerHTML = '';

            const {username, avatar, players} = params;
            this.moi = username;
            players.forEach((player)=>{
                if(player.username === this.moi){
                    console.log(this.moi)
                    playerList.set(this.moi, new Player(username,avatar,player.team,socket.id));
                    playerList.get(this.moi).masterPlayerInfoObject = new MasterPlayerInfo(playerList.get(this.moi));

                    // playerContainer.appendChild(playerList.get(this.moi).masterPlayerInfoObject.getMinimalPlayerInfoElement())
                
                    
                    return;
                }
                playerList.set(player.username, new Player(player.username,player.avatar,player.team,null));
                playerList.get(player.username).masterPlayerInfoObject = new MasterPlayerInfo(playerList.get(player.username));
                // playerContainer.appendChild(playerList.get(player.username).masterPlayerInfoObject.getMinimalPlayerInfoElement())


            })

            this.putPlayersWhereTheyBelong()
            // if(!playerList.has(this.moi)){
            //     playerList.set(this.moi, new Player(username,avatar,socket.id));
            //     playerList.get(this.moi).masterPlayerInfoObject = new MasterPlayerInfo(playerList.get(this.moi));
            //     playerContainer.appendChild(playerList.get(this.moi).masterPlayerInfoObject.getMinimalPlayerInfoElement())
            // }
        })
        
        
        socket.on('invalid room', ()=>{
            console.log('invalid room');
            socket.disconnect();
        })

        socket.on('more than 1 instances', ()=>{
            console.log('more than 1 instances');
            socket.disconnect();
        })

        socket.on('new conn', (player)=>{
            console.log('new conn')
            //playerList = new Map();
            console.log(player)
            //if(!playerList.has(player.username)){
            playerList.set(player.username, new Player(player.username,player.avatar,player.team,null));
            playerList.get(player.username).masterPlayerInfoObject = new MasterPlayerInfo(playerList.get(player.username));
            //playerContainer.appendChild(playerList.get(player.username).masterPlayerInfoObject.getMinimalPlayerInfoElement())
            //}
            this.putPlayersWhereTheyBelong();
        })


        socket.on('user disconnect', (username)=>{
            console.log('user disconnect')
            console.log(username)
            const playerToRemove = document.querySelector("[username="+username.username+"]");
            playerList.delete(username.username)
            playerToRemove.remove();
            
            
        })

        socket.on('put in', (param)=>{
            const {username, teamName} = param;
            console.log('put')
            playerList.get(username).team = teamName;
            this.putPlayersWhereTheyBelong();
            
            
        })

        socket.on('put in B', (player)=>{
            console.log('put')
            playerList.get(player.username).team = 'B';
            this.putPlayersWhereTheyBelong();
            
            
        })

    }


    handshake(){
        socket.emit('handshake', this.authCookie)
    }

    putPlayersWhereTheyBelong(){
        playerList.forEach((player, key)=>{
            let toRemove = document.querySelector("[username="+player.username+"]")
            if(toRemove){
                toRemove.remove();
            }
            if(player.team == null){
                 //if(!playerContainer.querySelector("[username="+player.username+"]")){
                    playerContainer.appendChild(player.masterPlayerInfoObject.getMinimalPlayerInfoElement())
                    return;
                //}

            }

            if(player.team === 'A'){
                //if(!teamA.querySelector("[username="+player.username+"]")){
                    teamA.appendChild(player.masterPlayerInfoObject.getMinimalPlayerInfoElement())
                    return;
                //}


            }

            if(player.team === 'B'){
                //if(!teamA.querySelector("[username="+player.username+"]")){
                    teamB.appendChild(player.masterPlayerInfoObject.getMinimalPlayerInfoElement())
                    return;
                //}


            }
        })
    }
}