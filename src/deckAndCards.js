const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step);

class Card {
    constructor(value, suit){
        this.value = value;
        this.suit = suit;
        this.HTMLClass = "play_card";
        this.Element = this.__getElement()
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

    getSugarCoatedValue(){
        if(this.value == 0 || this.value == 14){
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
            values = range(2,14).concat(0);
        }

        return values.map( (val) =>  new Card(val,suit));
    }

    getHTML(){
        return `<div class="${this.getHTMLClass()}" id="_${this.getSugarCoatedValue()}Of${this.getSugarCoatedSuit()}" suit="${this.getSugarCoatedSuit().toLowerCase()}">
            <div class="upper">${this.getSugarCoatedValue()+this.getCardSymbol()}</div>
            <div class="symbol" >${this.getCardSymbol()}</div>
            <div class="lower">${this.getSugarCoatedValue()+this.getCardSymbol()}</div>
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


