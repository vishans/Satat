
let cardContainer = document.querySelector("#card-container");
let sortButton = document.querySelector('#sort-button');
let playArea = document.querySelector('#play-area');
let playAreaColor = document.querySelector('.play-area-color-1');
var mouseOverArea = false;
var allowControls = false;
d = new Deck();

d.shuffle();
d.shuffle();


myHand = d.getNCardsFromDeck(12);

myHand.push(new Heart(2));

for(card of myHand){
    
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
                
                let element = card.getElement();
                element.onclick = function(){
                    //alert(69)
                    element.classList.remove('card-hover');
                    while(element.classList.contains('card-hover'));

                    //get test card 
                    
                    let testX = (playArea.clientWidth-element.clientWidth) /2;
                    let testY = (playArea.clientHeight-element.clientHeight) / 2;

                    //actual card stats
                    let actualX = element.getBoundingClientRect().x;
                    let actualY = element.getBoundingClientRect().y;

                    //distance to travel 
                    let travelX = actualX - testX;
                    let travelY = actualY - testY;


                    element.style.transform = `translate(${-travelX}px, calc(${-travelY}px - 30%))`;
                    //element.style.zIndex = zz++;

                    element.addEventListener('transitionend', function(e){
                        if( e.propertyName == 'transform'){
                            element.remove()
                            myHand.splice(myHand.indexOf(card),1)
                            
                            cardsInArea.push(new Card(card.value, card.suit))
                            cardsInArea.at(-1).setPlayerInfo('Me');
                            //calculate position for newCard inside play-area

                            playAreaWidth = playAreaColor.clientWidth;
                            playAreaHeight = playAreaColor.clientHeight;

                            
                            playArea.appendChild(cardsInArea.at(-1).getPlayAreaElement())
                            elementWidth = cardsInArea.at(-1).getElement().offsetWidth;
                            elementHeight = cardsInArea.at(-1).getElement().offsetHeight;
                            posX = (playAreaWidth - elementWidth) / 2;
                            posY = (playAreaHeight - elementHeight) / 2;
                          

                            cardsInArea.at(-1).getElement().style.left = posX + 'px';
                            cardsInArea.at(-1).getElement().style.top = posY + 'px';
                            let sign;
                            if (Math.random()< 0.5 )
                                sign = 1;
                            else sign = -1 ;

                            let v = sign * Math.floor(Math.random() * 8) + 1
                            //console.log(v)
                            cardsInArea.at(-1).getElement().style.transform = `rotateZ(${v}deg)`;

                            





                            
                        }
                    })
                }
            })
        }
}


setTimeout(function(){
    console.log(55)
    myHand[i].getElement().classList.add('CardTransition');
    
    myHand[i].getElement().addEventListener('transitionend', trans)

}, 500);
    

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
body.onresize = function(){
    
    let cW = cardContainer.offsetWidth;
    let totalW = 0;
    myHand.forEach(function(card){
        let element = card.getElement()
       
        totalW += element.clientWidth;
    })



    if(totalW > 0.9*cW){
        cardContainer.style.justifyContent = 'flex-start';
    }
    else{
        cardContainer.style.justifyContent = 'center';

    }

    //recalculate area cards position
    cardsInArea.forEach(function(obj){
        let playAreaWidth = playAreaColor.clientWidth;
        let playAreaHeight = playAreaColor.clientHeight;

        let elementWidth = obj.getElement().offsetWidth;
        let elementHeight = obj.getElement().offsetHeight;
        let posX = (playAreaWidth - elementWidth) / 2;
        let posY = (playAreaHeight - elementHeight) / 2;
      
        //console.log(posX)

        obj.getElement().style.left = posX + 'px';
        obj.getElement().style.top = posY + 'px';

    })
}


let overPlayArea = document.querySelector('#over-play-area');

overPlayArea.onmouseover = function(){
    mouseOverArea = true;
    //if(cardsInArea.length == 1) return;

    console.log(122)
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
        console.log(nextWidth)
        nextWidthArray.push(nextWidth);
        cardsInArea[i].getElement().style.left = nextWidth + 'px';
        nextWidth += cardsInArea[i].getElement().clientWidth + gap;
    }

    displayCardPlayerInfo();

}


overPlayArea.onmouseout = function(){
    mouseOverArea = false;
    centerAreaCard()
    removeCardPlayerInfo();
}


// spawn card from left 
let spawnLeft = document.querySelector('#spawn-left')
spawnLeft.onclick = spawnFromLeft;

function centerAreaCard(){
    cardsInArea.forEach(function(obj){
        let playAreaWidth = playAreaColor.clientWidth;
        let playAreaHeight = playAreaColor.clientHeight;

        let elementWidth = obj.getElement().offsetWidth;
        let elementHeight = obj.getElement().offsetHeight;
        let posX = (playAreaWidth - elementWidth) / 2;
        let posY = (playAreaHeight - elementHeight) / 2;
      
        //console.log(posX)

        obj.getElement().style.left = posX + 'px';
        obj.getElement().style.top = posY + 'px';

    })
}


function spreadAreaCard(){
   
    if(cardsInArea.length == 1) return;

    console.log(122)
    let gap = 10; //px

    let playAreaWidth = playArea.offsetWidth;
    let playAreaHeight = playArea.clientHeight;

    let totalCardWidth = 0;

    for(let card of cardsInArea){
        totalCardWidth += card.getElement().clientWidth;
    }

    let nextWidth = (playAreaWidth - totalCardWidth - (cardsInArea.length * gap))/2;

    for(let i =0; i < cardsInArea.length ; i++){
        console.log(nextWidth)

        cardsInArea[i].getElement().style.top = ((playAreaHeight-cardsInArea[i].getElement().clientHeight) / 2) + 'px';
        cardsInArea[i].getElement().style.left = nextWidth + 'px';
        
        // else{
        //     cardsInArea[i].getElement().style.right = (playAreaWidth - nextWidth - cardsInArea[i].getElement().clientWidth) + 'px';

        // }
        nextWidth += cardsInArea[i].getElement().clientWidth + gap;
    }
    
    
    
}


function spawnFromRight(){
    let newCard = new Club(11);
    newCard.setPlayerInfo('right');

    cardsInArea.push(newCard);
    let element = newCard.getPlayAreaElement();
    element.style.opacity = 1 ;
    element.style.transitionDuration = '1s'
    playArea.appendChild(newCard.getElement());

    //calculate position of the new spawned card
    newTop = (playArea.clientHeight - newCard.getElement().clientHeight )/2;

    let playAreaWidth = playAreaColor.clientWidth;
    let playAreaHeight = playAreaColor.clientHeight;

    let toX = (playAreaWidth - newCard.getElement().clientWidth)/2;
    let toY = (playAreaHeight - newCard.getElement().clientHeight)/2;



    element.style.top = newTop + 'px';
    element.style.left = 1.5*newCard.getElement().clientWidth + playAreaWidth + 'px';
    let sign;
    if (Math.random()< 0.5 )
        sign = 1;
    else sign = -1 ;

    let v = sign * Math.floor(Math.random() * 8) + 1
    //console.log(v)
    element.style.transform = `rotateZ(${v}deg)`;

    setTimeout(() => {
        if(!mouseOverArea || cardsInArea.length == 1){
            element.style.top = toY + 'px';
            element.style.left = toX + 'px';
        }else{
            
            spreadAreaCard();
        }
    }, 500);

    element.addEventListener('transitionend', function(e){
        e.target.style.transitionDuration = '.1s';
        e.target.removeEventListener('transitionend', arguments.callee);
        
        if(mouseOverArea){
            removeCardPlayerInfo();
            displayCardPlayerInfo();
        }
    })


}

function spawnFromLeft(){
    let newCard = new Heart(10);
    newCard.setPlayerInfo('left');
    cardsInArea.push(newCard);
    let element = newCard.getPlayAreaElement();
    element.style.opacity = 1 ;
    element.style.transitionDuration = '1s'
    playArea.appendChild(newCard.getElement());

    //calculate position of the new spawned card
    newTop = (playArea.clientHeight - newCard.getElement().clientHeight )/2;

    let playAreaWidth = playAreaColor.clientWidth;
    let playAreaHeight = playAreaColor.clientHeight;

    let toX = (playAreaWidth - newCard.getElement().clientWidth)/2;
    let toY = (playAreaHeight - newCard.getElement().clientHeight)/2;



    element.style.top = newTop + 'px';
    element.style.left = -1.5*newCard.getElement().clientWidth + 'px';
    let sign;
    if (Math.random()< 0.5 )
        sign = 1;
    else sign = -1 ;

    let v = sign * Math.floor(Math.random() * 8) + 1
    //console.log(v)
    element.style.transform = `rotateZ(${v}deg)`;

    setTimeout(() => {
        if(!mouseOverArea || cardsInArea.length == 1){
            element.style.top = toY + 'px';
            element.style.left = toX + 'px';
        }else{
            spreadAreaCard()
        }
    }, 500);

    element.addEventListener('transitionend', function(e){
        e.target.style.transitionDuration = '.1s';
        e.target.removeEventListener('transitionend', arguments.callee);
        
        if(mouseOverArea){
            removeCardPlayerInfo();
            displayCardPlayerInfo();
        }
    })


}

function spawnFromTop(){
    let newCard = new Heart(12);
    newCard.setPlayerInfo('top');
    cardsInArea.push(newCard);
    let element = newCard.getPlayAreaElement();
    element.style.opacity = 1 ;
    element.style.transitionDuration = '1s'
    playArea.appendChild(newCard.getElement());

    //calculate position of the new spawned card
    newTop = (playArea.clientHeight - newCard.getElement().clientHeight )/2;

    let playAreaWidth = playAreaColor.clientWidth;
    let playAreaHeight = playAreaColor.clientHeight;

    let toX = (playAreaWidth - newCard.getElement().clientWidth)/2;
    let toY = (playAreaHeight - newCard.getElement().clientHeight)/2;



    element.style.top = (-1.5*newCard.getElement().clientHeight) + 'px';
    element.style.left = toX  + 'px';
    let sign;
    if (Math.random()< 0.5 )
        sign = 1;
    else sign = -1 ;

    let v = sign * Math.floor(Math.random() * 8) + 1
    //console.log(v)
    element.style.transform = `rotateZ(${v}deg)`;

    setTimeout(() => {
        if(!mouseOverArea || cardsInArea.length == 1){
            element.style.top = toY + 'px';
            element.style.left = toX + 'px';
        }else{
            spreadAreaCard()
        }
    }, 500);

    element.addEventListener('transitionend', function(e){
        e.target.style.transitionDuration = '.1s';
        e.target.removeEventListener('transitionend', arguments.callee);
        
        if(mouseOverArea){
            removeCardPlayerInfo();
            displayCardPlayerInfo();
        }
    })


}

let buttonTop = document.querySelector('#spawn-top');
buttonTop.onclick = spawnFromTop;



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
        //console.log(arr[i])
        let infoElement = document.createElement('div');
        infoElement.innerHTML = cardsInArea[i].getPlayerInfo();
        playArea.appendChild(infoElement);

        infoElement.classList.add('area-player-info');
        let infoElementWidth = infoElement.clientWidth;
        let desiredOffsetX = (cardWidth-infoElementWidth)/2;
        let posX = cardLeft + desiredOffsetX;
        infoElement.style.left = posX + 'px';
        infoElement.style.top = (cardTop + 1.2 * cardHeight) + 'px';
        
        
        
        
        
        //cardsInArea[i].getElement().style.left = nextWidth + 'px';
        nextWidth += cardsInArea[i].getElement().clientWidth + gap;




    }


    
    
    
}



function removeCardPlayerInfo(){
    console.log(865)
    infoElements = document.querySelectorAll('.area-player-info');
    for(let element of infoElements){
        element.parentNode.removeChild(element);
    }
}


let spawnRight = document.querySelector('#spawn-right');
spawnRight.onclick = spawnFromRight;


// setInterval(spawnFromLeft, 2000);
// setInterval(spawnFromRight, 4000);
// setInterval(spawnFromTop, 5000);

playArea.appendChild(new MasterPlayerInfo('Mario',null,'Team A', 'beige').getElement());


// var canvas=document.createElement("canvas");
// var ctx=canvas.getContext("2d");

// var img=new Image();

// img.src="..\\..\\sprites.png";
// playArea.appendChild(canvas)
// canvas.setAttribute('width', '100');
// canvas.setAttribute('height', '100');


// img.onload = function(){ctx.drawImage(img,1,1,256,256,0,0,100,100)}
// ctx.font = "30px Arial";
// ctx.fillText("Hello World", 10, 50);

// function start(){
//     var canvasY=0;
//     for(var col=0;col<spriteCols;col++){
//     for(var row=0;row<spriteRows;row++){
//         var sourceX=col*spriteWidth;
//         var sourceY=row*spriteHeight;
//         // testing: calc a random position to draw this sprite
//         // on the canvas
//         var canvasX=Math.random()*150+20;
//         canvasY+=spriteHeight+5;
//         // drawImage with changing source and canvas x/y positions
//         ctx.drawImage(img,
//             sourceX,sourceY,spriteWidth,spriteHeight,
//             canvasX,canvasY,spriteWidth,spriteHeight
//         );
//     }}
// }