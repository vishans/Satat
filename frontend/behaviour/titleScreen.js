const createRoomButton = document.querySelector('#create-room');
const joinRoomButton = document.querySelector('#join-room');
const joinBackButton = document.querySelector('#back-room');
const createBackButton = document.querySelector('#back-room-2');



const hero = document.querySelector('.hero');
const main = document.querySelector('.main');
const title = document.querySelector('.title')

const submitRoomButton = document.querySelector('#submit-room');

const heroJoin = document.querySelector('.hero-join');
const titleJoin = document.querySelector('.title-join');

const heroCreate = document.querySelector('.hero-create');
const titleCreate = document.querySelector('.title-create');

const groupJoinForm = document.querySelector('#group-join-form');
const groupJoinFormBar = document.querySelector('#group-code');

heroJoin.classList.add('hero__away');
titleJoin.classList.add('hero__away');
titleJoin.style.transitionDuration = '0s';
heroJoin.style.transitionDuration = '0s';

heroCreate.classList.add('hero__away');
heroCreate.style.transitionDuration = '0s';
titleCreate.classList.add('hero__away');
titleCreate.style.transitionDuration = '0s';



history.replaceState(null, document.title, location.pathname+"#!/tempURL");
history.pushState(null, document.title, location.pathname);
window.addEventListener("popstate", function() {
    if(location.hash === "#!/tempURL") {
        history.replaceState(null, document.title, location.pathname);
        //replaces first element of last element of stack with google.com/gmail so can be used further
        setTimeout(function(){
            location.replace("file:///C:/Users/VISHAN/Documents/satate/frontend/html/_titleScreen.html");
        },0);
    }
}, false);


function getRidOfHero(){
    title.style.transitionDuration = '3s';
    while(title.style.transitionDuration != '3s');

    hero.classList.add('hero__away');
    main.classList.add('otherBG');
    title.classList.add('hero__away')
    
}

function showHero(){
    heroJoin.style.transitionDuration = '2s';
    title.style.transitionDuration = '3s';

    while(heroJoin.style.transitionDuration != '2s' || title.style.transitionDuration != '3s');
    
    // heroJoin.style.transitionDuration = '2s';
    // while(heroJoin.style.transitionDuration != '2s');
    hero.classList.remove('hero__away');
    title.classList.remove('hero__away');
    main.classList.remove('otherBG');

}

function showJoinRoom(){
 
    //heroJoin.style.display = 'flex';
    heroJoin.style.transitionDuration = '2s';
    titleJoin.style.transitionDuration = '3s';

    while(heroJoin.style.transitionDuration != '2s' || titleJoin.style.transitionDuration != '3s');
    heroJoin.classList.remove('hero__away');
    titleJoin.classList.remove('hero__away');
    groupJoinFormBar.focus()

}

function getRidOfJoin(){
    //hero.classList.remove('hero__away');
    heroJoin.classList.add('hero__away');
    main.classList.remove('otherBG');
    titleJoin.classList.add('hero__away');
    
}


function showCreate(){
    heroCreate.style.transitionDuration = '2s';
    titleCreate.style.transitionDuration = '3s';

    while(heroCreate.style.transitionDuration != '2s' || titleCreate.style.transitionDuration != '3s');
    heroCreate.classList.remove('hero__away');
    titleCreate.classList.remove('hero__away');
}

function getRidOfCreate(){
    //hero.classList.remove('hero__away');
    heroCreate.classList.add('hero__away');
    main.classList.remove('otherBG');
    titleCreate.classList.add('hero__away');
    
}



joinRoomButton.onclick = function(){
    getRidOfHero()
    
    showJoinRoom()
    
}

submitRoomButton.onclick = function(e){
    e.preventDefault();
}

joinBackButton.onclick = function(){
    getRidOfJoin();
    showHero()
}

createRoomButton.onclick = function(){
    getRidOfHero()
    showCreate()
}

createBackButton.onclick = function(){
    getRidOfCreate();
    showHero();
}