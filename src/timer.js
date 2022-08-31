class Timer{
    constructor(time, _class='timer'){
        this.time = time;
        this._class = _class;
        this.innerHTML = `<div class="${this._class}">${this.time}s</div>`;
        this.element = document.createElement('div');
        this.element.classList.add(this._class);
        this.element.innerHTML = this.innerHTML;
        this.intervalID = null;
        this.timerColorRange = {'green': 0.66*this.time, 'red': 0.33*this.time};
        this.hidden = false;

        
    }

    getElement(){
        return this.element;
    }

    start(){
        if(this.intervalID) return;

        this.intervalID = setInterval(() => {

            let timerValue = parseInt(this.element.innerText.slice(0,-1),10)-1;
            this.element.innerText = timerValue + 's';
            if(timerValue > this.timerColorRange.green ){
                this.element.style.color = '#00CA4E';
            }
            else if(timerValue >this.timerColorRange.red ){
                this.element.style.color = '#FFBD44';

            }
            else{
                this.element.style.color = '#FF605C';

            }


            if(timerValue == 0){
                this.stop();
                this.reset();
                this.hide();
            }
            
        }, 1000);

        
    }


    stop(){
        clearInterval(this.intervalID);
        this.intervalID = null;
    }

    reset(time){
        if(this.intervalID) return;
        if(time){
            this.time = time;
            this.element.innerHTML = time +'s';
            this.timerColorRange.green =  0.66*this.time;
            this.timerColorRange.red =  0.33*this.time;

            return;
        }

        this.element.innerHTML = this.time +'s';

    }

    hide(){
        if(this.hidden) return;

        this.hidden = true;
        this.element.style.visibility = 'hidden' ;

    
    }

    unhide(){
        if(!this.hidden) return;

        this.hidden = false;
        this.element.style.visibility = 'visible' ;

    }

    isHidden(){
        return this.hidden;
    }
}