let cardContainer = document.querySelector(".card-container");

d = new Deck();

d.shuffle();

arr = d.getNCardsFromDeck(13);

for(i of arr){
    cardContainer.innerHTML+= i.getHTML();
}

// cardContainer.innerHTML += new Heart(2).getHTML();