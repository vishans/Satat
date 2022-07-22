class popUpAndNotification{
    popUpCount = 0;
    constructor(notifLayer){
        this.notifLayer = notifLayer;
        this.sideBar = this.notifLayer.querySelector('.side-bar');
        this.full = this.notifLayer.querySelector('.full');

    }


    issueGenericSideNotif(title, avatar, semantic, persistance = 8000){
   

        const newSideNotif = document.createElement('div');
        newSideNotif.classList.add('notif');
        //newSideNotif.classList.add('hide-notif-on-issue');

        newSideNotif.innerHTML = `<div class="notif-title"> 
               <div class="text">${title}</div>
               <div class="close">
                  <span class="material-symbols-outlined">close</span>
                 </div>
             </div>
             <div class="notif-picture"> <img src="/${avatar}" alt="" srcset=""></div>
             <div class="notif-text">${semantic}</div>`;

        while (newSideNotif.innerHTML == '');
        const close = newSideNotif.querySelector('.close');
        close.onclick = function (e){
            
            newSideNotif.style.transform = 'translateX(150%)';
            setTimeout(()=> newSideNotif.remove(), 1000);
        }

        this.sideBar.appendChild(newSideNotif);

        newSideNotif.style.transition = 'all .8s ease-in-out';
        setTimeout(()=> {
            newSideNotif.style.transform = 'translateX(0%)';
            setTimeout(()=>{
                newSideNotif.style.transform = 'translateX(150%)';
                setTimeout(()=> newSideNotif.remove(), 1000);
            }, persistance)
    }, 500);

    }


    issueGenericPopUp(title , semantic='', buttonText, buttonCallback = null, persistance = 0){
        const newPopUp = document.createElement('div');
        newPopUp.classList.add('notif');

        semantic = semantic.split('\n');
        semantic = semantic.map((sentence)=> {
            return `<span>${sentence}</span>`
        })
        semantic = semantic.join('');
        
        newPopUp.innerHTML = 
        `<div class="notif-title">${title}</div>
        <div class="notif-text">${semantic}</div>
        <div class="notif-button-container">
          <button>${buttonText}</button>
        </div>`;

        while(newPopUp.innerHTML == '');

        

        const btn = newPopUp.querySelector('button');

        if(buttonCallback){
            btn.onclick = buttonCallback;
        }
        else{
            btn.onclick = (e)=>{ 
                //e.target.parentNode.parentNode.remove();
                newPopUp.remove();
                if(!--this.popUpCount){
                    this.full.style.backdropFilter = null;
                }
            };
        }

        if(persistance){
            
            setTimeout(()=>{
                // newPopUp.remove();
                // if(!--this.popUpCount){
                //     this.full.style.backdropFilter = null;
                // }
                this.removeFromFull(newPopUp)
            }, persistance);
        }

        // this.full.appendChild(newPopUp);
        // if(!this.popUpCount){
        //     this.full.style.backdropFilter ='blur(5px)';
        // }
        // this.popUpCount++;

        this.appendToFull(newPopUp)
    }

    appendToFull(element){
        this.full.appendChild(element);
        if(!this.popUpCount){
            this.full.style.backdropFilter ='blur(5px)';
        }
        this.popUpCount++;
    }

    removeFromFull(element){
        element.remove();
                if(!--this.popUpCount){
                    this.full.style.backdropFilter = null;
                }
    }

    issueSettleStarterPopUp(){
        const popUp = document.createElement('div');
        popUp.innerHTML = `<div class="choose-card-pop-up">
        <div class="title">Settling who starts first</div>
        <div class="body"> </div>
        <div class="bottom">You can only choose 1 card, once.</div>
      </div>`;
        const settlerObj = new settleStarter();

        this.appendToFull(settlerObj.getElement());
        return settlerObj;
    }
}


class settleStarter {
    constructor(flipped = true){
        this.element = document.createElement('div');
        this.element.innerHTML = `<div class="choose-card-pop-up">
        <div class="title">Settling who starts first</div>
        <div class="body"> </div>
        <div class="bottom">You can only choose 1 card, once.</div>
      </div>`;
        this.flipped = flipped;
        this.cards = [];
    }

    getElement(){
        return this.element;
    }

    addCard(value, suit){
        this.element.querySelector('.body');
        const body = this.element.querySelector('.body');
        const newCard = new Card(value, suit, true);
        this.cards.push(newCard)

        if(this.flipped) newCard.flipCard();
        body.appendChild(newCard.flipableElement);

    }

    associatePlayerWithCard(username, cardIndex){
        const player = playerList.get(username);
        if(!player) return;

        const card = this.cards[cardIndex].flipableElement;
        let img = document.createElement('img');
        img.src = player.avatar;
        img.style.backgroundColor = 'red';

        const frontCard = card.querySelector('.front-card');
        frontCard.appendChild(img);

        img = document.createElement('img');
        img.src = player.avatar;
        img.style.backgroundColor = 'red';

        const backCard = card.querySelector('.back-card');
        backCard.appendChild(img);
    }

    flipAllCards(){
        for(let card of this.cards){
            card.flipCard();
        }
    }

}
