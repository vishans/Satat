class ClientCommunication{
    constructor(){
        this.authCookie = authCookie; //document.cookie.split('=')[1];
        this.roomCode =roomCode; document.querySelector('.room-code #code').innerText.split('-').join('');
        //


        //socket = io('/', {query: {'authCookie': this.authCookie,
        //                            'roomCode': this.roomCode}});
        this.mySocketID = socket.id; 
        this.moi = null; 

        socket.on('disconnect', ()=>{
            setTimeout(()=>location.reload(), 3000 )
            
        })

        socket.on('handshake', (params)=>
        {
            playerContainer.innerHTML = '';
            teamA.innerHTML = '';
            teamB.innerHTML = '';

            const {username, players, settingParam} = params;
            this.moi = username;
            //moi = username;
            this.setSettingFromParam(settingParam);
            players.forEach((player)=>{
                if(player.username === this.moi){
                    
                    moi = new Player(username,player.avatar,player.team,player.ready,player.admin,socket.id)
                    playerList.set(this.moi, moi );
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
                        
                        setting.onclick = function(){
                                
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
            
        })
        
        
        socket.on('invalid room', ()=>{
            
            PN.issueGenericPopUp('Invalid Room', 'Room does not exist.\n ERRCODE:RM404', 'OK', ()=>window.location.href = '/');
            socket.disconnect();
        })

        socket.on('more than 1 instances', ()=>{
            
            PN.issueGenericPopUp('Already have a game instance opened', 'You already have a game instance opened in another tab.\n Close this one.\n ERRCODE:INST403', 'OK', ()=>window.location.href = '/');

            socket.disconnect();
        })

        socket.on('new conn', (player)=>{
            
            //playerList = new Map();
            
            //if(!playerList.has(player.username)){
            playerList.set(player.username, new Player(player.username,player.avatar,player.team,player.ready, player.admin,null));
            playerList.get(player.username).masterPlayerInfoObject = new MasterPlayerInfo(playerList.get(player.username));
            //playerContainer.appendChild(playerList.get(player.username).masterPlayerInfoObject.getMinimalPlayerInfoElement())
            //}
            PN.issueGenericSideNotif('New Connection', player.avatar, `${player.username} connected`);

            this.putPlayersWhereTheyBelong();
        })


        socket.on('user disconnect', (params)=>{
            
            
            const {username, newAdmin} = params;
            // const playerToRemove = document.querySelector("[username="+username.username+"]");
            const disconnectedPlayer = playerList.get(username);
            playerList.delete(username)
            if(newAdmin){
            
             playerList.get(newAdmin).admin = true;
             if(newAdmin == this.moi){
                //document.querySelector('.settings-cover').remove();
                setting.onclick = function(){
                    
                        
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
            
            //playerList.get(username).team = teamName;
            playerList.get(username).masterPlayerInfoObject.setTeam(teamName);


           


            this.putPlayersWhereTheyBelong();
            
            
        })

        socket.on('ready', (param)=>{
            const {username, state} = param;
            

            
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
                    
                    if(playerList.get(username).team == null){
                        
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
            
            this.setSettingFromParam(param);
        })

        socket.on('room timeout', () =>{
            PN.issueGenericPopUp('Room Timed Out', 'Room was closed due to inactivity.', 'OK',()=>window.location.href = '/')
            
        })

        socket.on('room full', () =>{
            PN.issueGenericPopUp('Full Room', 'This room already has 4 players.', 'OK',()=>window.location.href = '/')
            
        })

        socket.on('not signed in', () =>{
            PN.issueGenericPopUp('Not Signed In', 'Please sign in to join a room.', 'OK',()=>window.location.href = '/')
            
        })


        socket.on('do transition', (orderTeam) =>{

            let myIndex = orderTeam.findIndex((username =>{
                return username === this.moi
            }))

            
            let count = 0;
            let orders = ['bottom', 'left', 'top', 'right'];
            let x;
            while(count < 4){
                x = playerList.get(orderTeam[myIndex]);
                x.masterPlayerInfoObject.position = orders[count];
                //alert(x.username+' '+x.team)
                
                myIndex = (myIndex + 1) % 4
                count++;
            }
            const p = SM.prepareTransitionScreen();
            
            p.then( ()=>SM.showTransitionScreen())
            
        })


        socket.on('do game', () =>{
            SM.showGameScreen(0);
           
        })

        socket.on('settleStart', (param) =>{
            const {cardNo, timeout} = param;
            console.log(cardNo)
            settler = PN.issueSettleStarterPopUp(true, timeout/1000);
            settler.addNCards(cardNo, 'Spade'); 
            for(let card of settler.getCards()){
                card.flipableElement.onclick = (event)=>{
                    const target = event.target.parentNode.parentNode;
                    
                    
                    const index = target.querySelector('.index').innerText;
                    if(!settler.alreadyCardChosen){
                        
                        
                        socket.emit('choose', index)
                    }
                }
            }
           
        })


        socket.on('choose', (param) =>{
            const {username, index} = param;
            console.log(username)
            console.log(moi)
            if(username === moi.username) {
                settler.alreadyCardChosen = index;
                settler.stopAndRemoveTimer();
                
            }
            settler.associatePlayerWithCard(username, index);
           
        })

        socket.on('starter', (param) =>{
            const {selectedSuit,sendableCards,i, username} = param;
            
            const cards = settler.cards
            for(let card in cards){
                const currentCard = settler.cards[card]
                currentCard.setValueAndSuit(sendableCards[card], selectedSuit)
                currentCard.flipCard()
            }

            
                settler.inflateCard(i)
            
           
        })

        socket.on('verdict start', (param) =>{
            
            PN.issueWhoIsStartingPopUp(param)
            
           
        })

        socket.on('clearPStack', () =>{
            
            PN.clearPopUpStack();
            
           
        })

        socket.on('chooserHand', (hand) =>{
            console.log('choser hand')
            console.log(hand)
            let currentCard = null;
            for(let card of hand){
                currentCard = new Card(card.value, card.suit);
                cardContainer.appendChild(currentCard.getElement());
                myHand.push(currentCard);

            }


            
           
        })

        socket.on('waiting pop up', (title)=>{
            PN.issueWaitingPopUp(title)
        })

        socket.on('settler timer', ()=>{
            console.log()
            settler.startTimer()
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