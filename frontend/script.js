let cardContainer = document.querySelector("#card-container");
let sortButton = document.querySelector('#sort-button');
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

function trans(e){
    e.target.classList.add('card-hover');

        if(i<12 && e.propertyName == 'opacity'){
            i++;
            myHand[i].getElement().classList.add('CardTransition');
            myHand[i].getElement().addEventListener('transitionend', trans)
        }

        if(i==12 && e.propertyName == 'opacity'){
            allowControls = true;
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
