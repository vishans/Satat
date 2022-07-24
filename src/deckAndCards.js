const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step);

class Card {
    constructor(value, suit, flipable = false){
        this.value = value;
        this.suit = suit;
        this.HTMLClass = "play_card";


        const element = document.createElement('div');
        element.innerHTML = this.getHTML();
        this.Element = element.firstChild//this.__getElement();


        if(flipable){ 
            const element = document.createElement('div');
            element.innerHTML = this.getFlipableHTML();
            this.flipableElement = element.firstChild;
        }
        this.playerID = null;
    }

    flipCard(){
        if(!this.flipableElement) return ;
        const inner = this.flipableElement.querySelector('.card-inner');
        console.log(inner)
        inner.classList.toggle('flipped');
    }

    addStyle(propertyName, value){
        this.flipableElement.style[propertyName] = value;
    }

    addClass(className){
        this.flipableElement.classList.add(className);

    }

    getHTMLClass(){
        return this.HTMLClass;
    }

    getSuit(){
        return this.suit;
    }

    getLiteralValue(){
        return this.value;
    }

    getSugarCoatedSuit(){
    
         return this.suit.suit;
    }

    setValueAndSuit(value, suit){
        this.value = value;
        switch (suit){
            case 'Heart': this.suit = Suit.Heart; break;
            case 'Club': this.suit = Suit.Club; break;
            case 'Diamond': this.suit = Suit.Diamond; break;
            case 'Spade': this.suit = Suit.Spade; break;

            
        }
        
        if(this.flipableElement){
            this.flipableElement.setAttribute('id',`_${this.getSugarCoatedValue()}Of${this.getSugarCoatedSuit()}` )
            this.flipableElement.setAttribute('suit',`${this.getSugarCoatedSuit().toLowerCase()}`)
            const upper = this.flipableElement.querySelector('.upper');
            const symbol = this.flipableElement.querySelector('.symbol');
            const lower = this.flipableElement.querySelector('.lower');

            upper.innerHTML = this.getSugarCoatedValue()+this.getCardSymbol();
            lower.innerHTML = this.getSugarCoatedValue()+this.getCardSymbol();
            symbol.innerHTML = this.getCardSymbol();



        }
        const playCard  = document.querySelector('.'+this.HTMLClass)
        playCard.setAttribute('id',`_${this.getSugarCoatedValue()}Of${this.getSugarCoatedSuit()}` )
        playCard.setAttribute('suit',`${this.getSugarCoatedSuit().toLowerCase()}`)

        const upper = this.Element.querySelector('.upper');
        const symbol = this.Element.querySelector('.symbol');
        const lower = this.Element.querySelector('.lower');

        upper.innerHTML = this.getSugarCoatedValue()+this.getCardSymbol();
        lower.innerHTML = this.getSugarCoatedValue()+this.getCardSymbol();
        symbol.innerHTML = this.getCardSymbol();

    }

    getSugarCoatedValue(){
        if(this.value == 1 || this.value == 14){
            return 'A';
        }

        if(this.value == 11){
            return 'J';
        }

        if(this.value == 12){
            return 'Q';
        }

        if(this.value == 13){
            return 'K';
        }

        return String(this.value);

    }

    getCardSymbol(){
        return '&'+this.getSugarCoatedSuit().toLowerCase() + 's;';
    }

    static getHouse(suit, strongAce = true){
        let values;
        if (strongAce){
            values = range(2,15);
        }
        else{
            values = range(1,14);
        }

        return values.map( (val) =>  new Card(val,suit));
    }

    setIndex(index){
        if(this.flipableElement){
            const indexElement = this.flipableElement.querySelector('.index');
            indexElement.innerText = index;
        }

        const indexElement = this.Element.querySelector('.index');
        indexElement.innerText = index;
    }

    getHTML(){
        return `<div class="${this.getHTMLClass()}" id="_${this.getSugarCoatedValue()}Of${this.getSugarCoatedSuit()}" suit="${this.getSugarCoatedSuit().toLowerCase()}">
            <div class="index" style="display:none;"></div>
            <div class="upper">${this.getSugarCoatedValue()+this.getCardSymbol()}</div>
            <div class="symbol" >${this.getCardSymbol()}</div>
            <div class="lower">${this.getSugarCoatedValue()+this.getCardSymbol()}</div>
        </div>
            `;
    }

    getFlipableHTML(){
        return `<div class="${this.getHTMLClass()}" id="_${this.getSugarCoatedValue()}Of${this.getSugarCoatedSuit()}" suit="${this.getSugarCoatedSuit().toLowerCase()}" flip>
        <div class="index" style="display:none;"></div>
            
        <div class="card-inner">
                <div class="front-card">
                    <div class="upper">${this.getSugarCoatedValue()+this.getCardSymbol()}</div>
                    <div class="symbol" >${this.getCardSymbol()}</div>
                    <div class="lower">${this.getSugarCoatedValue()+this.getCardSymbol()}</div>
                </div>
                <div class="back-card">
                    
                </div>
            </div>
        </div>
            `;
    }

    getT(){
        return `
            <div class="upper">${this.getSugarCoatedValue()+this.getCardSymbol()}</div>
            <div class="symbol" >${this.getCardSymbol()}</div>
            <div class="lower">${this.getSugarCoatedValue()+this.getCardSymbol()}</div>
       
            `;
    }

    getPlayAreaElement(){
        let newElement = document.createElement('div');
        newElement.classList.add('area-play-card');
        newElement.setAttribute('value',`${this.getSugarCoatedValue()}Of${this.getSugarCoatedSuit()}`);
        newElement.setAttribute('suit',`${this.getSugarCoatedSuit().toLowerCase()}`);
        newElement.innerHTML += `<div class="upper">${this.getSugarCoatedValue()+this.getCardSymbol()}</div>
        <div class="symbol" >${this.getCardSymbol()}</div>
        <div class="lower">${this.getSugarCoatedValue()+this.getCardSymbol()}</div>`;
        this.Element = newElement;
        return newElement;
    }

    __getElement(){
        let newElement = document.createElement('div');
        newElement.classList.add(this.getHTMLClass());
        newElement.setAttribute('id',`_${this.getSugarCoatedValue()}Of${this.getSugarCoatedSuit()}`);
        newElement.setAttribute('suit',`${this.getSugarCoatedSuit().toLowerCase()}`);
        newElement.innerHTML += `<div class="upper">${this.getSugarCoatedValue()+this.getCardSymbol()}</div>
        <div class="symbol" >${this.getCardSymbol()}</div>
        <div class="lower">${this.getSugarCoatedValue()+this.getCardSymbol()}</div>`;

        return newElement;
    }

    getElement(){
        return this.Element;
    }

    getSortValue(){
        let suitWeight;
        switch(this.getSugarCoatedSuit()){
            case 'Spade': suitWeight = 1000; break;

            case 'Heart': suitWeight = 0; break;

            case 'Diam' : suitWeight = 500; break;

            case 'Club' : suitWeight = 250; break;
        }

        return this.getLiteralValue() + suitWeight;
    }

    setPlayerID(info){
        this.playerID = info;

    }

    getPlayerID(){
        return this.playerID;
    }

    //spawns

    spawnFromLeft(){
        let playArea = document.querySelector('#play-area');

        this.setPlayerID(2);
        cardsInArea.push(this);
        let element = this.getPlayAreaElement();
        element.style.opacity = 1 ;
        element.style.transitionDuration = '.7s'
        playArea.appendChild(this.getElement());

        //calculate position of the new spawned card
        let newTop = (playArea.clientHeight - this.getElement().clientHeight )/2;

        let playAreaWidth = playArea.clientWidth;
        let playAreaHeight = playArea.clientHeight;

        let toX = (playAreaWidth - this.getElement().clientWidth)/2;
        let toY = (playAreaHeight - this.getElement().clientHeight)/2;



        element.style.top = newTop + 'px';
        element.style.left = -1.5*this.getElement().clientWidth + 'px';
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

        const tempFunc = function(e){
            e.target.style.transitionDuration = '.1s';
            e.target.removeEventListener('transitionend', tempFunc);
            
            if(mouseOverArea){
                removeCardPlayerInfo();
                displayCardPlayerInfo();
            }
        
        }
        
        element.addEventListener('transitionend', tempFunc
        )


    }
    

    spawnFromRight(){
        let playArea = document.querySelector('#play-area');

        this.setPlayerID(1);
        cardsInArea.push(this);
        let element = this.getPlayAreaElement();
        element.style.opacity = 1 ;
        element.style.transitionDuration = '.7s'
        playArea.appendChild(this.getElement());

        //calculate position of the new spawned card
        let newTop = (playArea.clientHeight - this.getElement().clientHeight )/2;

        let playAreaWidth = playArea.clientWidth;
        let playAreaHeight = playArea.clientHeight;

        let toX = (playAreaWidth - this.getElement().clientWidth)/2;
        let toY = (playAreaHeight - this.getElement().clientHeight)/2;



        element.style.top = newTop + 'px';
        element.style.left = 1.5*this.getElement().clientWidth + playAreaWidth + 'px';
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

        const tempFunc = function(e){
            e.target.style.transitionDuration = '.1s';
            e.target.removeEventListener('transitionend', tempFunc);
            
            if(mouseOverArea){
                removeCardPlayerInfo();
                displayCardPlayerInfo();
            }
        
        }
        
        element.addEventListener('transitionend', tempFunc
        )
    }

    spawnFromTop(){
        let playArea = document.querySelector('#play-area');

        this.setPlayerID(4);
        cardsInArea.push(this);
        let element = this.getPlayAreaElement();
        element.style.opacity = 1 ;
        element.style.transitionDuration = '.7s'
        playArea.appendChild(this.getElement());

        //calculate position of the new spawned card
        let newTop = (playArea.clientHeight - this.getElement().clientHeight )/2;

        let playAreaWidth = playAreaColor.clientWidth;
        let playAreaHeight = playAreaColor.clientHeight;

        let toX = (playAreaWidth - this.getElement().clientWidth)/2;
        let toY = (playAreaHeight - this.getElement().clientHeight)/2;



        element.style.top = (-1.5*this.getElement().clientHeight) + 'px';
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

        const tempFunc = function(e){
            e.target.style.transitionDuration = '.1s';
            e.target.removeEventListener('transitionend', tempFunc);
            
            if(mouseOverArea){
                removeCardPlayerInfo();
                displayCardPlayerInfo();
            }
        
        }
        
        element.addEventListener('transitionend', tempFunc
        )

    }


    spawnFromCardContainer(){
        let playArea = document.querySelector('#play-area');


        let element = this.getElement();

        
                    
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
        let card = this;
        element.addEventListener('transitionend', function(e){
            if( e.propertyName == 'transform'){
                element.remove()
                myHand.splice(myHand.indexOf(card),1)
                
                cardsInArea.push(new Card(card.value, card.suit))
                cardsInArea.at(-1).setPlayerID(3);
                //calculate position for newCard inside play-area

                let playAreaWidth = playArea.clientWidth;
                let playAreaHeight = playArea.clientHeight;

                
                playArea.appendChild(cardsInArea.at(-1).getPlayAreaElement())
                let elementWidth = cardsInArea.at(-1).getElement().offsetWidth;
                let elementHeight = cardsInArea.at(-1).getElement().offsetHeight;
                let posX = (playAreaWidth - elementWidth) / 2;
                let posY = (playAreaHeight - elementHeight) / 2;
                

                cardsInArea.at(-1).getElement().style.left = posX + 'px';
                cardsInArea.at(-1).getElement().style.top = posY + 'px';
                let sign;
                if (Math.random()< 0.5 )
                    sign = 1;
                else sign = -1 ;

                let v = sign * Math.floor(Math.random() * 8) + 1
                
                cardsInArea.at(-1).getElement().style.transform = `rotateZ(${v}deg)`;

           
            }
        })

    }
    

};

class Suit{
    static Spade = new Suit('Spade');
    static Heart = new Suit('Heart');
    static Diamond = new Suit('Diam');
    static Club = new Suit('Club');


    constructor(suit){
        this.suit = suit;
    }

    
};



class Spade extends Card{
    constructor(value){
        super(value,Suit.Spade);
    }

};

class Heart extends Card{
    constructor(value){
        super(value,Suit.Heart);
        
    }

 
};

class Diamond extends Card{
    constructor(value){
        super(value,Suit.Diamond);
    }

  
};

class Club extends Card{
    constructor(value){
        super(value,Suit.Club);
    }

};

class Deck{
    constructor(strongAce = true){
        this.deck = [];
        this.deck = this.deck.concat(Card.getHouse(Suit.Spade,strongAce));
        this.deck = this.deck.concat(Card.getHouse(Suit.Heart, strongAce));
        this.deck = this.deck.concat(Card.getHouse(Suit.Diamond, strongAce));
        this.deck = this.deck.concat(Card.getHouse(Suit.Club, strongAce));

    }

    shuffle() {
        let currentIndex = this.deck.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [this.deck[currentIndex], this.deck[randomIndex]] = [
            this.deck[randomIndex], this.deck[currentIndex]];
        }
      
        
    }

    getDeck(){
        return this.deck;
    }

    getNCardsFromDeck(n){
        n = Math.min(n,this.deck.length);
        let nSubDeck = []

        for(let i=0; i<n; i++){
            nSubDeck.push(this.deck.shift());
        }

        return nSubDeck;
    }
    
};


