var img = new Image();
img.src="..\\..\\sprites.png";

var imagePromise = new Promise(function(resolve, reject){
    img.onload = function(){
        resolve();
    }
})


class MasterPlayerInfo{

    constructor(playerName,avatar, team, teamColor, position = 'left', numberOfCards = 13, connectionStatus = 'online'){
        this.playerName = playerName;
        this.avatar = avatar;
        this.team = team;
        this.teamColor = teamColor;
        this.position = position
        this.numberOfCards = numberOfCards;
        this.connectionStatus = connectionStatus;

        this.Element = this.__createElement();
        this.MinimalPlayerInfoElement = this.__createMinimalPlayerInfoElement()
        
    }

    __createElement(){
        let newMasterElement = document.createElement('div');
        newMasterElement.classList.add('master-player-info');

        let team = document.createElement('div');
        team.classList.add('master-player-info-team');
        team.style.backgroundColor = this.teamColor;
        team.innerText = this.team;

        let avatar = document.createElement('div');
        avatar.classList.add('master-player-info-avatar');
        avatar.style.backgroundColor = this.teamColor;
        
        let canvas=document.createElement("canvas");
        let ctx=canvas.getContext("2d");

        playArea.appendChild(canvas)
        canvas.setAttribute('width', '100');
        canvas.setAttribute('height', '100');

        imagePromise.then(function(){ctx.drawImage(img,1+(256*0),1+(257*0),256,256,0,0,100,100)})
        //img.onload = function(){ctx.drawImage(img,1+(256*0),1+(257*2),256,256,0,0,100,100)}

        avatar.appendChild(canvas);

        let name = document.createElement('div');
        name.classList.add('master-player-info-name');
        name.style.backgroundColor = this.teamColor;
        name.innerText = this.playerName;

        newMasterElement.appendChild(team);
        newMasterElement.appendChild(avatar);
        newMasterElement.appendChild(name);

        return newMasterElement;

    }


    getElement(){
        return this.Element;
    }


    __createMinimalPlayerInfoElement(){
        let newParent = document.createElement('div');
        newParent.classList.add('minimal-player-info');

        let canvas=document.createElement("canvas");
        let ctx=canvas.getContext("2d");

        playArea.appendChild(canvas)
        canvas.setAttribute('width', '100');
        canvas.setAttribute('height', '100');
        imagePromise.then(function(){ctx.drawImage(img,1+(256*0),1+(257*0),256,256,0,0,100,100)})

        let avatar = document.createElement('div');
        avatar.classList.add('minimal-avatar');
        avatar.style.backgroundColor = this.teamColor;

        avatar.appendChild(canvas);

        let name = document.createElement('div');
        name.classList.add('minimal-name');
        //name.style.backgroundColor = this.teamColor;
        name.innerText = this.playerName;

        newParent.appendChild(avatar);
        newParent.appendChild(name);
        
        

        return newParent;
        

    }

    getMinimalPlayerInfoElement(){
        return this.MinimalPlayerInfoElement;
    }

    calculateAndSetPosition(){
        let gapBetweenEdge = 30; //px
        let playArea = document.querySelector('#play-area')
        let playAreaHeight = playArea.offsetHeight;
        let playAreaWidth = playArea.clientWidth;

        let infoElementHeight = this.Element.offsetHeight;
        let infoElementWidth = this.Element.offsetWidth;

        switch(this.position){
            case 'left':
                
                let toY = (playAreaHeight - infoElementHeight) / 2
                
                this.Element.style.top = toY + 'px';
                this.Element.style.left = gapBetweenEdge + 'px';

            
        }

    }
}