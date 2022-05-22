class MasterPlayerInfo{
    constructor(playerName,avatar, team, teamColor, numberOfCards = 13, connectionStatus = 'online'){
        this.playerName = playerName;
        this.avatar = avatar;
        this.team = team;
        this.teamColor = teamColor;
        this.numberOfCards = numberOfCards;
        this.connectionStatus = connectionStatus;

        this.Element = this.__createElement();
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
        
        var canvas=document.createElement("canvas");
        var ctx=canvas.getContext("2d");

        var img=new Image();

        img.src="..\\..\\sprites.png";
        playArea.appendChild(canvas)
        canvas.setAttribute('width', '100');
        canvas.setAttribute('height', '100');
        img.onload = function(){ctx.drawImage(img,1+(256*0),1+(257*2),256,256,0,0,100,100)}

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
}