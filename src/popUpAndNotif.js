class popUpAndNotification{
    constructor(notifLayer){
        this.notifLayer = notifLayer;
        this.sideBar = this.notifLayer.querySelector('.side-bar');
    }


    issueGenericSideNotif(title, avatar, semantic, persistance = 8000){
    //     this.sideBar.innerHTML = `<div class="notif"> 
    //     <div class="notif-title"> 
    //       <div class="text">User Disconnected</div>
    //       <div class="close">
    //          <span class="material-symbols-outlined">close</span>
    //         </div>
    //     </div>
    //     <div class="notif-picture"> <img src="/0c4b3fb2b564b704bdb44240788631870a94736bfbb7082db252dbcd41d185eb.png" alt="" srcset=""></div>
    //     <div class="notif-text">kirby disconnected</div>
    //   </div>`

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
}