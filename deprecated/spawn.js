function spawnFromLeft(){
    let newCard = new Heart(10);
    newCard.setPlayerID(2);
    cardsInArea.push(newCard);
    let element = newCard.getPlayAreaElement();
    element.style.opacity = 1 ;
    element.style.transitionDuration = '.7s'
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
    newCard.setPlayerID(4);
    cardsInArea.push(newCard);
    let element = newCard.getPlayAreaElement();
    element.style.opacity = 1 ;
    element.style.transitionDuration = '.7s'
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


function spawnFromRight(){
    let newCard = new Club(11);
    newCard.setPlayerID(1);

    cardsInArea.push(newCard);
    let element = newCard.getPlayAreaElement();
    element.style.opacity = 1 ;
    element.style.transitionDuration = '.7s'
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
