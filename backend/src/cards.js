class Card{
    static shuffle(cards){
        let currentIndex = cards.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [cards[currentIndex], cards[randomIndex]] = [
            cards[randomIndex], cards[currentIndex]];
        }

        return cards;
    }

    static getGreater(card1, card2, baseSuit, troop){
        if(card1.suit === 'Heart' && card1.value === 2) return card1;
        if(card2.suit === 'Heart' && card2.value === 2) return card2;




        let multiplier1 = 0, multiplier2 = 0;

        if(card1.suit === troop){
            multiplier1 = 30;
        }
        else if(card1.suit === baseSuit){
            multiplier1 = 15;
        }

        if(card2.suit === troop){
            multiplier2 = 30;
        }
        else if(card2.suit === baseSuit){
            multiplier2 = 15;
        }

        // console.log(`${card1} => ${card1.value} + ${multiplier1}    ${card1.value + multiplier1}`)
        // console.log(`${card2} => ${card2.value} + ${multiplier2}    ${card2.value + multiplier2}`)

        if((card1.value + multiplier1) > (card2.value + multiplier2)){
            return card1;
        }
        else{
            return card2;
        }

    }

    static getDeckOfSuit(suit){
        let cards = [];
        for(let i = 2; i<15; i++){
            cards.push(new Card(i,suit))
        }

        return cards
    }

    static get52(shuffle = 2){
        const suits = ['Club', 'Heart', 'Diamond', 'Spade'];
        let hand = [];
        for(let suit of suits){
            hand.push(...Card.getDeckOfSuit(suit));
        }
        for(let i = 0; i < shuffle; i++){
            hand = Card.shuffle(hand);
        }
        return hand;

    }


    constructor(value, suit, playedBy = null){
        this.value = value; 
        this.suit = suit;
        this.playedBy = playedBy;

    }
}



module.exports = Card;