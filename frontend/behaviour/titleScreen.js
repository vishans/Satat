const createRoomButton = document.querySelector('#create-room');
const joinRoomButton = document.querySelector('#join-room');

const hero = document.querySelector('.hero');
const main = document.querySelector('.main');

const submitRoomButton = document.querySelector('#submit-room');

const heroJoin = document.querySelector('.hero-join');
heroJoin.classList.add('hero__away')
heroJoin.style.transitionDuration = '0s';




function getRidOfHero(){
    hero.classList.add('hero__away');
    main.classList.add('otherBG');

    // setTimeout(() => {
    //     showHero()
    // }, 3000);
}

function showHero(){
    heroJoin.style.transitionDuration = '2s';
    while(heroJoin.style.transitionDuration != '2s')
    hero.classList.remove('hero__away');
    main.classList.remove('otherBG');

}

function showJoinRoom(){
 
    //heroJoin.style.display = 'flex';
    heroJoin.style.transitionDuration = '2s';
    while(heroJoin.style.transitionDuration != '2s');
    heroJoin.classList.remove('hero__away');

}



joinRoomButton.onclick = function(){
    getRidOfHero()
    
    showJoinRoom()
    
}

submitRoomButton.onclick = function(e){
    e.preventDefault();
}