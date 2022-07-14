class screenManager{
    constructor(){
        this.currentScreen = 'lobby';
        this.transitionScreen = document.querySelector('.transition-screen');
    }

    prepareTransitionScreen(){
        return (new Promise((resolve, reject)=>{
            let players = Array.from(playerList.values());
            let teamA = players.filter(player => player.team === 'A');
            let teamB = players.filter(player => player.team === 'B');

            console.log(teamA);
            console.log(teamB)

            let teamMate = null;
            let opposingTeam = null;

            const teamL = this.transitionScreen.querySelector('.teamL');
            let teamCol =  null;
            let teamSubCol = null;
            let opposingTeamCol, opposingTeamSubCol = null;
            console.log('teaml ' + moi.team)
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

            console.log(teamMate)

            teamL.style.backgroundColor = teamCol;
            const avatarContainerLImg = this.transitionScreen.querySelectorAll('.avatar-container-L img');
            avatarContainerLImg.forEach((img)=>{
                img.style.borderColor = teamCol;
                img.style.backgroundColor = teamSubCol;
            })
            avatarContainerLImg[0].src = '/' + moi.avatar;
            avatarContainerLImg[1].src = '/' + teamMate.avatar;

            const avatarContainerRImg = this.transitionScreen.querySelectorAll('.avatar-container-R img');
            opposingTeam.forEach((player, index)=>{
                avatarContainerRImg[index].src = '/' + player.avatar;
            })

            resolve();


        }))
    }

    showTransitionScreen(){
        console.log(this.currentScreen)
        this.currentScreen = 'transition';
        this.transitionScreen.style.display = 'grid';
        setTimeout(()=>this.transitionScreen.classList.add('show-transition-screen'), 500 );
        
    }
}