let cardContainer = document.querySelector("#card-container");

d = new Deck();

d.shuffle();
d.shuffle();


myHand = d.getNCardsFromDeck(12);



for(i of myHand){
    let card = i.getElement();
    card.classList.add('beforeCardTransition');
    card.onmouseover = function(){
        cardContainer.classList.add('high-z-index');
    }
    card.onmouseout = function(){
        cardContainer.classList.remove('high-z-index');
    }
    cardContainer.appendChild(card);
}

cardContainer.appendChild(new Heart(2).getElement());

// cardContainer.lastChild.classList.add('CardTransition');
deckOfCards = cardContainer.children;

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

function trans(e){
    e.target.classList.add('card-hover');

        if(i<12 && e.propertyName == 'opacity'){
            i++;
            deckOfCards[i].classList.add('CardTransition');
            deckOfCards[i].addEventListener('transitionend', trans)
        }
}


setTimeout(() => 
{
    deckOfCards[i].classList.add('CardTransition');
    
    deckOfCards[i].addEventListener('transitionend', trans)
    
}, 500);