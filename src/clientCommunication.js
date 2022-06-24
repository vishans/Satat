class ClientCommunication{
    constructor(){
        this.authCookie = document.cookie.split('=')[1];
        this.socket = io('/', {query: 'authCookie='+this.authCookie});
        this.mySocketID = this.socket.id;    
        this.socket.on('handshake', (params)=>{
            const {username, avatar} = params;
            
            if (!playerList.has('me')){ 
                playerList.set('me', new Player(username,avatar,this.socket.id));
                playerList.get('me').masterPlayerInfoObject = new MasterPlayerInfo(playerList.get('me'));
                playerContainer.appendChild(playerList.get('me').masterPlayerInfoObject.getMinimalPlayerInfoElement())
            }
        })
        
        
        //this.handshake();

    }

    handshake(){
        this.socket.emit('handshake', this.authCookie)
    }
}