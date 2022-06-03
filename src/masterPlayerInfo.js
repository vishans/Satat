var img = new Image();
img.src="..\\..\\sprites.png";

var imagePromise = new Promise(function(resolve, reject){
    img.onload = function(){
        resolve();
    }
})


class MasterPlayerInfo{

    constructor(playerID,playerName,avatar, team, teamColor, position = 'left', numberOfCards = 13, connectionStatus = 'online'){
        this.playerID = playerID
        this.playerName = playerName;
        this.avatar = avatar;
        this.team = team;
        this.teamColor = teamColor;
        this.position = position
        this.numberOfCards = numberOfCards;
        this.connectionStatus = connectionStatus;

        this.Element = this.__createElement();
        this.setNumberOfCards(this.numberOfCards)
        this.MinimalPlayerInfoElement = this.__createMinimalPlayerInfoElement()
        
        
        
    }

    __createElement(){
        let newMasterElement = document.createElement('div');
        newMasterElement.classList.add('master-player-info'+'-'+this.position);
        // let o = document.querySelector('#over-play-area')
        // o.addEventListener('click', () => this.hideMasterInfoElement());

        let semantic = document.createElement('div');
        semantic.classList.add('master-player-info-semantic');

        //add number of card to semantic
        let tempNumCard = document.createElement('div');
        tempNumCard.id = 'number-of-cards';
        semantic.appendChild(tempNumCard);

        //add connection status
       

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
        let aRow = this.avatar[0];
        let aCol = this.avatar[1];

        imagePromise.then(function(){ctx.drawImage(img,1+(256*aCol),1+(257*aRow),256,256,0,0,100,100)})
        //img.onload = function(){ctx.drawImage(img,1+(256*0),1+(257*2),256,256,0,0,100,100)}

        avatar.appendChild(canvas);

        let name = document.createElement('div');
        name.classList.add('master-player-info-name');
        name.style.backgroundColor = this.teamColor;
        name.innerText = this.playerName;

        newMasterElement.appendChild(team);
        newMasterElement.appendChild(avatar);
        newMasterElement.appendChild(name);
        newMasterElement.appendChild(semantic);
       
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

        let aRow = this.avatar[0];
        let aCol = this.avatar[1];

        imagePromise.then(function(){ctx.drawImage(img,1+(256*aCol),1+(257*aRow),256,256,0,0,100,100)})

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
        let playAreaHeight = playArea.clientHeight;
        let playAreaWidth = playArea.clientWidth;

        let infoElementHeight = this.Element.clientHeight;
        let infoElementWidth = this.Element.clientWidth;

        let toY;
        let toX;
        switch(this.position){
            case 'left':
                
                toY = (playAreaHeight - infoElementHeight) / 2
                
                this.Element.style.top = toY + 'px';
                this.Element.style.left = gapBetweenEdge + 'px';
                break;

            case 'right':

                toY = (playAreaHeight - infoElementHeight) / 2
                this.Element.style.top = toY + 'px';

                toX = playAreaWidth - gapBetweenEdge - infoElementWidth;
                this.Element.style.left = toX + 'px';
                break;

            case 'bottom':

                toX = (playAreaWidth - infoElementWidth) / 2
                this.Element.style.left = toX + 'px';

                toY = playAreaHeight - (gapBetweenEdge*0.5) - infoElementHeight;
                this.Element.style.top = toY + 'px';
                
                break;

            case 'top':

                toX = (playAreaWidth - infoElementWidth) / 2
                this.Element.style.left = toX + 'px';

               
                this.Element.style.top = gapBetweenEdge*0.5 + 'px';
                break;





            
        }

    }

    hideMasterInfoElement(){
        let gapBetweenEdge = 30; //px
        let playArea = document.querySelector('#play-area')
        let playAreaHeight = playArea.offsetHeight;
        let playAreaWidth = playArea.offsetWidth;
      
        let infoElementHeight = this.Element.offsetHeight;
        let infoElementWidth = this.Element.offsetWidth;

        let toY;
        let toX;
        
        switch(this.position){
            case 'left':
                
                toY = (playAreaHeight - infoElementHeight) / 2
                
                this.Element.style.top = toY + 'px';
                this.Element.style.left = gapBetweenEdge - 1.5*infoElementWidth + 'px';
                break;

            case 'right':

                toY = (playAreaHeight - infoElementHeight) / 2
                this.Element.style.top = toY + 'px';

                toX = playAreaWidth + gapBetweenEdge + 1.5*infoElementWidth;
                this.Element.style.left = toX + 'px';
                break;

            case 'bottom':

                toX = (playAreaWidth - infoElementWidth) / 2
                this.Element.style.left = toX + 'px';

                toY = playAreaHeight + (gapBetweenEdge*0.5) + 1.5*infoElementHeight;
                this.Element.style.top = toY + 'px';

                break;

            case 'top':

                toX = (playAreaWidth - infoElementWidth) / 2
                this.Element.style.left = toX + 'px';

               
                this.Element.style.top = -(gapBetweenEdge*0.5) -1.5*infoElementHeight + 'px';
                break;





            
        }

        

    }

    listen(on, fn){
        this.Element.addEventListener(on,fn)
    }

    removeListener(on, fn){
        this.Element.removeEventListener(on,fn)
    }

    getNewMinimalPlayerInfoElement(){
        return this.__createMinimalPlayerInfoElement()
    }

    setNumberOfCards(numberOfCards){
        
        let numOfCardsElement = this.Element.querySelector('#number-of-cards');
        this.numberOfCards = numberOfCards;
        numOfCardsElement.innerText = '🃏 ' + this.numberOfCards;
    }

    getNumberOfCards(){
        return this.numberOfCards;
    }
}