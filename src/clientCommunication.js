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
            const {username, avatar} = params;
            this.moi = username;
            
            if(!playerList.has(this.moi)){
                playerList.set(this.moi, new Player(username,avatar,this.socket.id));
                playerList.get(this.moi).masterPlayerInfoObject = new MasterPlayerInfo(playerList.get(this.moi));
                playerContainer.appendChild(playerList.get(this.moi).masterPlayerInfoObject.getMinimalPlayerInfoElement())
            }
        })
        
        
        this.socket.on('invalid room', ()=>{
            console.log('invalid room');
            this.socket.disconnect();
        })

        this.socket.on('more than 1 instances', ()=>{
            console.log('more than 1 instances');
            this.socket.disconnect();
        })

        this.socket.on('new conn', ()=>{
            //to be implemented
        })

    }


    handshake(){
        this.socket.emit('handshake', this.authCookie)
    }
}