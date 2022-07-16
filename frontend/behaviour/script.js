var authCookie = document.cookie.split('=')[1];
var roomCode = document.querySelector('.room-code #code').innerText.split('-').join('');
var moi = null;
var socket = io('/', {query: {'authCookie': authCookie,
                           'roomCode': roomCode}});
let playerContainer = document.querySelector('#player-container');
let teamA = document.querySelector('#teamA .team-player-container');
let teamB = document.querySelector('#teamB .team-player-container');

let teamACountElement = document.querySelector("#teamA .team-count");
let teamBCountElement = document.querySelector("#teamB .team-count");
let teamACount = 0;
let teamBCount = 0;

let readyButton = document.querySelector("#ready");
let setting = document.querySelector("#setting");
let settingForm = document.querySelector("#setting form");

let cardContainer = document.querySelector("#card-container");
let sortButton = document.querySelector('#sort-button');
let playArea = document.querySelector('#play-area');
let playAreaColor = document.querySelector('.play-area-color-1');
var mouseOverArea = false;
var allowControls = false;

let playerList = new Map();
const SM = new screenManager();
const PN = new popUpAndNotification(document.querySelector('.popup-notif'));
const clientCommunication = new ClientCommunication();


//let moi = null;
//PN.issueGenericPopUp('Error', 'First line.\nSecond line', 'OK', ()=>window.location.href = '/', 3000)

teamA.onclick = ()=>{
    console.log('A')
    socket.emit('team','A')
}

teamB.onclick = ()=>{
    console.log('B')
    socket.emit('team','B')
}

ready.onclick = ()=>{
    
    socket.emit('ready');
 
}


playerContainer.onclick = ()=>{
    //console.log('B')
    socket.emit('team',null);
}

//PN.issueGenericPopUp('test', 'test','ok')
//setTimeout(()=>SM.prepareTransitionScreen().then( SM.showTransitionScreen), 1000)
//SM.prepareTransitionScreen().then( SM.showTransitionScreen);

// const ts = document.querySelector('.transition-screen');
// setTimeout(()=>{
//     ts.style.display = 'grid';
//     setTimeout(()=>ts.classList.add('show-transition-screen') , 1000)
    
    
    
// },1000)



//player info element
var masterPlayerInfoPlane = document.querySelector('#master-player-info-plane')
// let t = new MasterPlayerInfo(1,'Mario','0c4b3fb2b564b704bdb44240788631870a94736bfbb7082db252dbcd41d185eb.png','Team B', 'lightblue','right')
// let k = new MasterPlayerInfo(2,'Luigi','f85090cb7a700ffa2ff2694a8c3e6593f2d6a952477f7461da1a03e42e29f0d8.png','Team B', 'lightblue','left')
// let l = new MasterPlayerInfo(3,'Peach (You)','f4bd88b3c722f2107fab95fbabc17165c060a19baf4bf0beccc6c576bcc6cabc.png','Team A', 'salmon','bottom')
// let q = new MasterPlayerInfo(4,'Yoshi','eee9e16a4d1da1005e393ae96f00b979acdcfa47510f25fd70cc0978ced3b7ff.png','Team A', 'salmon','top')

// t.setNumberOfCards(13);

// var playerList = [t,k,l,q];

// var playerIDToInfoObjMap = {1:t, 2:k, 3:l, 4:q, }


// masterPlayerInfoPlane.appendChild(t.getElement());
// t.calculateAndSetPosition();

// masterPlayerInfoPlane.appendChild(k.getElement());
// k.calculateAndSetPosition();

// masterPlayerInfoPlane.appendChild(l.getElement());
// l.calculateAndSetPosition();

// masterPlayerInfoPlane.appendChild(q.getElement());
// q.calculateAndSetPosition();






d = new Deck();

d.shuffle();
d.shuffle();


myHand = d.getNCardsFromDeck(12);

myHand.push(new Heart(2));

for(let card of myHand){
    
    card.getElement().classList.add('beforeCardTransition');
    card.getElement().onmouseover = function(){
        cardContainer.classList.add('high-z-index');
    }
    card.getElement().onmouseout = function(){
        cardContainer.classList.remove('high-z-index');
    }
    cardContainer.appendChild(card.getElement());
}

//cardContainer.appendChild(new Heart(2).getElement());

// cardContainer.lastChild.classList.add('CardTransition');
//deckOfCards = cardContainer.children;

// setTimeout(()=>{
//     cardContainer.lastChild.classList.add('CardTransition');
//     cardContainer.lastChild.addEventListener('transitionend', (e)=>{
//     // e.target.style.bottom = 0;
//     // e.target.classList.remove('CardTransition');
//     e.target.classList.add('card-hover');

//     cardContainer.firstChild.classList.add('CardTransition');

//     })

    
// },500);
var i = 0;
var zz = 100000;
var cardsInArea = [];
function trans(e){
    e.target.classList.add('card-hover');

        if(i<12 && e.propertyName == 'opacity'){
            i++;
            myHand[i].getElement().classList.add('CardTransition');
            myHand[i].getElement().addEventListener('transitionend', trans)
        }

        if(i==12 && e.propertyName == 'opacity'){
            allowControls = true;
            myHand.forEach(function(card){
                
                //let element = card.getElement();
                card.getElement().onclick = function(){card.spawnFromCardContainer();}
                
            })
        }
}

//Pause 
// setTimeout(function(){
    
//     myHand[i].getElement().classList.add('CardTransition');
    
//     myHand[i].getElement().addEventListener('transitionend', trans)

// }, 500);
    

//sort button function

sortButton.onclick = function(){
    if(!allowControls) return;


    myHand.sort((a,b)=>{
        return a.getSortValue() - b.getSortValue()
    })

    cardContainer.innerHTML= '';

    for (let card of myHand){
        cardContainer.appendChild(card.getElement());
    }
}


//card container cars alignment
let body = document.querySelector('body');
window.onresize = function(){
    
    let cW = cardContainer.offsetWidth;
    let totalW = 0;
    myHand.forEach(function(card){
        let element = card.getElement()
       
        totalW += element.clientWidth;
    })



    if(totalW > 0.95*cW){
        cardContainer.style.justifyContent = 'flex-start';
    }
    else{
        cardContainer.style.justifyContent = 'center';

    }

    //recalculate area cards position
    // cardsInArea.forEach(function(obj){
    //     let playAreaWidth = playAreaColor.clientWidth;
    //     let playAreaHeight = playAreaColor.clientHeight;

    //     let elementWidth = obj.getElement().offsetWidth;
    //     let elementHeight = obj.getElement().offsetHeight;
    //     let posX = (playAreaWidth - elementWidth) / 2;
    //     let posY = (playAreaHeight - elementHeight) / 2;
      
    //     //console.log(posX)

    //     obj.getElement().style.left = posX + 'px';
    //     obj.getElement().style.top = posY + 'px';

    // })
    
    // playerList.forEach(function(obj){
    //     obj.listen('transitionend', function(){
    //         obj.calculateAndSetPosition();
    //         obj.removeListener('transitionend',arguments.callee)
    //     })
    // })

    setTimeout(() => {
        playerList.forEach(function(value, key){
            value.masterPlayerInfoObject.calculateAndSetPosition();
        })
    }, 500);
    

    setTimeout(() => {
        centerAreaCard()
    }, 100);
    
}




let spreadCardHitBox = document.querySelector('#spread-card-hit-box');

spreadCardHitBox.onmouseover = function(){
    mouseOverArea = true;
    playerList.forEach(function(value, key){
        value.hideMasterInfoElement()
    })
    //if(cardsInArea.length == 1) return;

    
    let gap = 10; //px

    let playAreaWidth = playArea.offsetWidth;
    let playAreaHeight = playArea.clientHeight;

    let totalCardWidth = 0;

    for(let card of cardsInArea){
        totalCardWidth += card.getElement().clientWidth;
    }

    var nextWidthArray = [];
    let nextWidth = (playAreaWidth - totalCardWidth - (cardsInArea.length * gap))/2;

    for(let i =0; i < cardsInArea.length ; i++){
        
        nextWidthArray.push(nextWidth);
        cardsInArea[i].getElement().style.left = nextWidth + 'px';
        nextWidth += cardsInArea[i].getElement().clientWidth + gap;
    }

    displayCardPlayerInfo();

}


spreadCardHitBox.onmouseout = function(){
    mouseOverArea = false;
    centerAreaCard()
    removeCardPlayerInfo();
    playerList.forEach(function(value, key){
        value.calculateAndSetPosition()
    })
}





function centerAreaCard(){
    cardsInArea.forEach(function(obj){
        let playAreaWidth = playArea.clientWidth;
        let playAreaHeight = playArea.clientHeight;

        let elementWidth = obj.getElement().clientWidth;
        let elementHeight = obj.getElement().clientHeight;
        let posX = (playAreaWidth - elementWidth) / 2;
        let posY = (playAreaHeight - elementHeight) / 2;
      
        

        obj.getElement().style.left = posX + 'px';
        obj.getElement().style.top = posY + 'px';

    })
}


function spreadAreaCard(){
   
    if(cardsInArea.length == 1) return;

    
    let gap = 10; //px

    let playAreaWidth = playArea.offsetWidth;
    let playAreaHeight = playArea.clientHeight;

    let totalCardWidth = 0;

    for(let card of cardsInArea){
        totalCardWidth += card.getElement().clientWidth;
    }

    let nextWidth = (playAreaWidth - totalCardWidth - (cardsInArea.length * gap))/2;

    for(let i =0; i < cardsInArea.length ; i++){
        

        cardsInArea[i].getElement().style.top = ((playAreaHeight-cardsInArea[i].getElement().clientHeight) / 2) + 'px';
        cardsInArea[i].getElement().style.left = nextWidth + 'px';
        
        // else{
        //     cardsInArea[i].getElement().style.right = (playAreaWidth - nextWidth - cardsInArea[i].getElement().clientWidth) + 'px';

        // }
        nextWidth += cardsInArea[i].getElement().clientWidth + gap;
    }
    
    
    
}


//spawns

//spawn top
let spawnTop = document.querySelector('#spawn-top');

spawnTop.onclick = function(){
    let newCard = new Diamond(1);
    newCard.spawnFromTop();
};

// spawn card from left 
let spawnLeft = document.querySelector('#spawn-left')

spawnLeft.onclick = function(){
    let newCard = new Club(11);
    newCard.spawnFromLeft();
    
};

// spawn from right
let spawnRight = document.querySelector('#spawn-right');

spawnRight.onclick = function(){
    let newCard = new Heart(13);
    newCard.spawnFromRight();
};




function displayCardPlayerInfo(){
    if(!cardsInArea.length) return;

    let gap = 10; //px

    let playAreaWidth = playArea.offsetWidth;
    let playAreaHeight = playArea.clientHeight;

    let totalCardWidth = 0;
    let cardTop = cardsInArea[0].getElement().getBoundingClientRect().top;
    cardTop = (playAreaHeight-cardsInArea[0].getElement().clientHeight)/2



    for(let card of cardsInArea){
        totalCardWidth += card.getElement().clientWidth;
    }

    
    let nextWidth = (playAreaWidth - totalCardWidth - (cardsInArea.length * gap))/2;

    for(let i =0; i < cardsInArea.length ; i++){
        
        
        let cardWidth = cardsInArea[i].getElement().clientWidth;
        let cardHeight = cardsInArea[0].getElement().clientHeight;
        
        let cardLeft =nextWidth;
        
        //let infoElement = playerIDToInfoObjMap[cardsInArea[i].playerID].getMinimalPlayerInfoElement()
        let infoElement = playerIDToInfoObjMap[cardsInArea[i].playerID].getNewMinimalPlayerInfoElement()



        //infoElement.innerHTML = cardsInArea[i].getPlayerInfo();
        
        playArea.appendChild(infoElement);

        //infoElement.classList.add('minimal-player-info');
        let infoElementWidth = infoElement.clientWidth;
        let desiredOffsetX = (cardWidth-infoElementWidth)/2;
        let posX = cardLeft + desiredOffsetX;
        infoElement.style.left = posX + 'px';
        infoElement.style.top = (cardTop + 1.1 * cardHeight) + 'px';
        
        
        
        
        
        //cardsInArea[i].getElement().style.left = nextWidth + 'px';
        nextWidth += cardsInArea[i].getElement().clientWidth + gap;




    }


    
    
    
}



function removeCardPlayerInfo(){
    
    infoElements = document.querySelectorAll('.minimal-player-info');
    for(let element of infoElements){
        element.parentNode.removeChild(element);
    }
}






// setInterval(spawnFromLeft, 2000);
// setInterval(spawnFromRight, 4000);
// setInterval(spawnFromTop, 5000);





// playerContainer.appendChild(t.getNewMinimalPlayerInfoElement())
// playerContainer.appendChild(k.getNewMinimalPlayerInfoElement())
// playerContainer.appendChild(l.getNewMinimalPlayerInfoElement())
// playerContainer.appendChild(q.getNewMinimalPlayerInfoElement())
