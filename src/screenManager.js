class screenManager{
    constructor(){
        this.currentScreen = 'lobby';
        this.transitionScreen = document.querySelector('.transition-screen');
        this.lobby = document.querySelector('#lobby');

    }

    prepareTransitionScreen(){
        return (new Promise((resolve, reject)=>{
            let players = Array.from(playerList.values());
            let teamA = players.filter(player => player.team === 'A');
            let teamB = players.filter(player => player.team === 'B');

            
            

            let teamMate = null;
            let opposingTeam = null;

            const teamL = this.transitionScreen.querySelector('.teamL');
            let teamCol =  null;
            let teamSubCol = null;
            let opposingTeamCol, opposingTeamSubCol = null;
            
            if(moi.team == 'A'){
                teamCol = '#EE6360';
                teamSubCol = '#A14341'
                teamMate = teamA.filter((player)=> player.username != moi.username)[0];

                opposingTeam = teamB;
                opposingTeamCol ='#6355C4';
                opposingTeamSubCol = '#3C3377';

            }
            else{
                // team B
                teamCol = '#6355C4';
                teamSubCol = '#3C3377';
                teamMate = teamB.filter((player)=> player.username != moi.username)[0];
                
                opposingTeam = teamA;
                opposingTeamCol = '#EE6360';
                opposingTeamSubCol = '#A14341'


            }

            

            teamL.style.backgroundColor = teamCol;
            const avatarContainerLImg = this.transitionScreen.querySelectorAll('.avatar-container-L img');
            avatarContainerLImg.forEach((img)=>{
                img.style.borderColor = teamCol;
                img.style.backgroundColor = teamSubCol;
            })
            avatarContainerLImg[0].src = '/' + moi.avatar;
            avatarContainerLImg[1].src = '/' + teamMate.avatar;
            const teamLColorBlock = this.transitionScreen.querySelector('.teamL');
            teamLColorBlock.style.backgroundColor = teamCol;

            const avatarContainerRImg = this.transitionScreen.querySelectorAll('.avatar-container-R img');
            opposingTeam.forEach((player, index)=>{
                avatarContainerRImg[index].src = '/' + player.avatar;
                avatarContainerRImg[index].style.borderColor = opposingTeamCol;
                avatarContainerRImg[index].style.backgroundColor = opposingTeamSubCol;
            })

            const teamRColorBlock = this.transitionScreen.querySelector('.teamR');
            teamRColorBlock.style.backgroundColor = opposingTeamCol;

            
            // const posi = ['left', 'right', 'top', 'bottom'];
            // posi.forEach((p, index)=>{
            //     
            //     
            //     //players[index].masterPlayerInfoObject.position = p;
            //     masterPlayerInfoPlane.appendChild(players[index].masterPlayerInfoObject.getElement())
            //     players[index].masterPlayerInfoObject.calculateAndSetPosition()
            // })

            playerList.forEach((player)=>{
                masterPlayerInfoPlane.appendChild(player.masterPlayerInfoObject.getElement())
            
                player.masterPlayerInfoObject.calculateAndSetPosition()

                
                
            })
            
            resolve();

        }))
    }

    showTransitionScreen(){
        
        this.currentScreen = 'transition';
        this.transitionScreen.style.display = 'grid';
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                this.transitionScreen.classList.add('show-transition-screen');
                setTimeout(()=>{
                    this.lobby.style.display = 'none';

                    resolve();
                },1000)
            }, 500 );
        })
        
        
    }

    showGameScreen(latency = 3000){
        // normally called after transition scree is shown 
        this.lobby.style.display = 'none';

        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                this.transitionScreen.classList.remove('show-transition-screen');
                // wait for fade transition to be over before removing screen
                setTimeout(()=>{
                    this.transitionScreen.style.display = 'none';
                    resolve()

                },1000)
            },latency)
        })
        
    }
}