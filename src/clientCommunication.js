class ClientCommunication{
    constructor(){
        this.authCookie = document.cookie.split('=')[1];
        this.roomCode = document.querySelector('.room-code #code').innerText.split('-').join('');
        console.log(this.roomCode)


        this.socket = io('/', {query: {'authCookie': this.authCookie,
                                        'roomCode': this.roomCode}});
        this.mySocketID = this.socket.id; 
        this.moi = null;   
        this.socket.on('handshake', (params)=>
        {
            playerContainer.innerHTML = '';
            const {username, avatar, players} = params;
            this.moi = username;
            players.forEach((player)=>{
                if(player.username === this.moi){
                    console.log(this.moi)
                    playerList.set(this.moi, new Player(username,avatar,this.socket.id));
                    playerList.get(this.moi).masterPlayerInfoObject = new MasterPlayerInfo(playerList.get(this.moi));

                    playerContainer.appendChild(playerList.get(this.moi).masterPlayerInfoObject.getMinimalPlayerInfoElement())
                
                    
                    return;
                }
                playerList.set(player.username, new Player(player.username,player.avatar,null));
                playerList.get(player.username).masterPlayerInfoObject = new MasterPlayerInfo(playerList.get(player.username));
                playerContainer.appendChild(playerList.get(player.username).masterPlayerInfoObject.getMinimalPlayerInfoElement())


            })
            // if(!playerList.has(this.moi)){
            //     playerList.set(this.moi, new Player(username,avatar,this.socket.id));
            //     playerList.get(this.moi).masterPlayerInfoObject = new MasterPlayerInfo(playerList.get(this.moi));
            //     playerContainer.appendChild(playerList.get(this.moi).masterPlayerInfoObject.getMinimalPlayerInfoElement())
            // }
        })
        
        
        this.socket.on('invalid room', ()=>{
            console.log('invalid room');
            this.socket.disconnect();
        })

        this.socket.on('more than 1 instances', ()=>{
            console.log('more than 1 instances');
            this.socket.disconnect();
        })

        this.socket.on('new conn', (player)=>{
            console.log('new conn')
            playerList = new Map();
            console.log(player)
            if(!playerList.has(player.username)){
            playerList.set(player.username, new Player(player.username,player.avatar,null));
            playerList.get(player.username).masterPlayerInfoObject = new MasterPlayerInfo(playerList.get(player.username));
            playerContainer.appendChild(playerList.get(player.username).masterPlayerInfoObject.getMinimalPlayerInfoElement())
            }
        })


        this.socket.on('user disconnect', (username)=>{
            console.log('user disconnect')
            console.log(username)
            const playerToRemove = playerContainer.querySelector("[username="+username.username+"]");
            playerList.delete(username.username)
            playerToRemove.remove();
            
            
        })

    }


    handshake(){
        this.socket.emit('handshake', this.authCookie)
    }
}