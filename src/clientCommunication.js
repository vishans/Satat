class ClientCommunication{
    constructor(){
        this.authCookie = authCookie; //document.cookie.split('=')[1];
        this.roomCode =roomCode; document.querySelector('.room-code #code').innerText.split('-').join('');
        //console.log(this.roomCode)


        //socket = io('/', {query: {'authCookie': this.authCookie,
        //                            'roomCode': this.roomCode}});
        this.mySocketID = socket.id; 
        this.moi = null; 

        socket.on('handshake', (params)=>
        {
            playerContainer.innerHTML = '';
            teamA.innerHTML = '';
            teamB.innerHTML = '';

            const {username, players, settingParam} = params;
            this.moi = username;
            moi = username;
            this.setSettingFromParam(settingParam);
            players.forEach((player)=>{
                if(player.username === this.moi){
                    console.log(this.moi)
                    playerList.set(this.moi, new Player(username,player.avatar,player.team,player.ready,player.admin,socket.id));
                    playerList.get(this.moi).masterPlayerInfoObject = new MasterPlayerInfo(playerList.get(this.moi));

                    if(!player.admin){
                        // let cover = document.createElement('div');
                        // cover.classList.add('settings-cover');
                        // setting.appendChild(cover);
                        setting.onclick = function(e){
                            e.preventDefault();
                            return false;
                        }
                    }
                    else{
                        console.log(555)
                        setting.onclick = function(){
                                console.log('form clicked')
                                const midgamelLeavers = settingForm.elements['mid-game-leaver']['value'];
                                const nextRoundWaitTime= settingForm.elements['next-round-wait-time']['value'];
                                const startGame= settingForm.elements['start-game']['value'];
                                const troopChooser = settingForm.elements['troop-chooser']['value'];

                                const settingsParam = {midgamelLeavers,nextRoundWaitTime,startGame,troopChooser};

                                socket.emit('settingParam', settingsParam)
        
                        }
                    }

                    // playerContainer.appendChild(playerList.get(this.moi).masterPlayerInfoObject.getMinimalPlayerInfoElement())
                
                    
                    return;
                }
                playerList.set(player.username, new Player(player.username,player.avatar,player.team,player.ready,player.admin,null));
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
            playerList.set(player.username, new Player(player.username,player.avatar,player.team,player.ready, player.admin,null));
            playerList.get(player.username).masterPlayerInfoObject = new MasterPlayerInfo(playerList.get(player.username));
            //playerContainer.appendChild(playerList.get(player.username).masterPlayerInfoObject.getMinimalPlayerInfoElement())
            //}
            PN.issueGenericSideNotif('New Connection', player.avatar, `${player.username} connected`);

            this.putPlayersWhereTheyBelong();
        })


        socket.on('user disconnect', (params)=>{
            console.log('user disconnect')
            console.log(params)
            const {username, newAdmin} = params;
            // const playerToRemove = document.querySelector("[username="+username.username+"]");
            const disconnectedPlayer = playerList.get(username);
            playerList.delete(username)
            if(newAdmin){
            console.log(newAdmin)
             playerList.get(newAdmin).admin = true;
             if(newAdmin == this.moi){
                //document.querySelector('.settings-cover').remove();
                setting.onclick = function(){
                    
                        console.log('form clicked')
                        const midgamelLeavers = settingForm.elements['mid-game-leaver']['value'];
                        const nextRoundWaitTime= settingForm.elements['next-round-wait-time']['value'];
                        const startGame= settingForm.elements['start-game']['value'];
                        const troopChooser = settingForm.elements['troop-chooser']['value'];

                        const settingsParam = {midgamelLeavers,nextRoundWaitTime,startGame,troopChooser};

                        socket.emit('settingParam', settingsParam)

                

                }
             }
            }
            PN.issueGenericSideNotif('Player Disconnected', disconnectedPlayer.avatar, `${disconnectedPlayer.username} disconnected`);

            this.putPlayersWhereTheyBelong();
            
            
        })

        socket.on('put in', (param)=>{
            const {username, teamName} = param;
            console.log('put')
            playerList.get(username).team = teamName;

           


            this.putPlayersWhereTheyBelong();
            
            
        })

        socket.on('ready', (param)=>{
            const {username, state} = param;
            console.log(username)

            console.log(state)
            playerList.get(username).ready = state;
            if(username === this.moi){
                if(state){
                    ready.removeAttribute('cantready');

                    ready.setAttribute('unready', 'unready');
                    ready.innerText = 'Unready'
                    
                }
                else{
                    ready.removeAttribute('cantready');
                    ready.removeAttribute('unready');
                    console.log(playerList.get(username))
                    if(playerList.get(username).team == null){
                        console.log('ttt')
                        ready.setAttribute('cantready','cantready');

                    }
                    // else{
                    //     ready.removeAttribute('unready');
                    // }
                    ready.innerText = 'Ready'
                }
            }

            this.putPlayersWhereTheyBelong();
            
            
        })

        socket.on('settingParam', param =>{
            console.log('form data received')
            this.setSettingFromParam(param);
        })

    }


    handshake(){
        socket.emit('handshake', this.authCookie)
    }

    putPlayersWhereTheyBelong(){
        
        teamACount = 0;
        teamBCount = 0;
        let toRemove = document.querySelectorAll("[username]");
        toRemove.forEach((element)=>{
            element.remove();
        })
        playerList.forEach((player, key)=>{
            
            if(player.team == null){
                 //if(!playerContainer.querySelector("[username="+player.username+"]")){
                    playerContainer.appendChild(player.masterPlayerInfoObject.getNewMinimalPlayerInfoElement())
                    return;
                //}

            }

            if(player.team === 'A'){
                //if(!teamA.querySelector("[username="+player.username+"]")){
                    teamA.appendChild(player.masterPlayerInfoObject.getNewMinimalPlayerInfoElement())
                    teamACount++;
                    return;
                //}


            }

            if(player.team === 'B'){
                //if(!teamA.querySelector("[username="+player.username+"]")){
                    teamB.appendChild(player.masterPlayerInfoObject.getNewMinimalPlayerInfoElement())
                    teamBCount++;
                    return;
                //}


            }
        })

        teamACountElement.innerText = teamACount+'/2';
        teamBCountElement.innerText = teamBCount+'/2';


    }

    setSettingFromParam(param){
        const {midgamelLeavers,
            nextRoundWaitTime,
            startGame,
            troopChooser} = param;

            settingForm.elements['mid-game-leaver']['value'] = midgamelLeavers;
            settingForm.elements['next-round-wait-time']['value'] = nextRoundWaitTime;
            settingForm.elements['start-game']['value'] = startGame;
            settingForm.elements['troop-chooser']['value'] = troopChooser ;
    }
}