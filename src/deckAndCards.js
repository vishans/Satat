const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step);

class Card {
    constructor(value, suit){
        this.value = value;
        this.suit = suit;
    }

    getSuit(){
        return this.suit;
    }

    getLiteralValue(){
        return this.value;
    }

    getSugarCoatedValue(){
        if(this.value == 0 || this.value == 14){
            return 'A';
        }

        return String(this.value);

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

    

};

class Suit{
    static Spade = new Suit('Spade');
    static Heart = new Suit('Heart');
    static Diamond = new Suit('Diamond');
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
    
};

console.log(new Deck().deck);