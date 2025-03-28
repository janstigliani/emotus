import MotusService from "../services/motus-service";
import MotusCard from "./motus-card";

export default class MotusBar extends HTMLElement{

    mService: MotusService;

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.mService = new MotusService();
    }

    connectedCallback(){

        this.styling();
        this.render()
    }

    styling(){
        const style = document.createElement('style');
        style.innerText = `
            .bar span{
                font-size: 36px;
                padding: 0px 8px;
                
            }
            .bar{
                border-bottom: solid;
                margin-bottom: 20px;
                display; flex;
                gap:20px
            }
        `
        this.shadowRoot!.appendChild(style);
    }

    render(){
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('bar')
        mainDiv.innerHTML = `
            <span>
                😎
            </span>
            <span>
                E-MOTUS
            </span>
        `;
        const sortBtn= document.createElement("button");
        sortBtn.classList.add("sort-btn");
        sortBtn.innerText=`📶`
        sortBtn.addEventListener("click", () => {
            this.mService.sortMoti();
            //creare un evento per comunicare alla motus list di renderizzare again
            // const mCard = new MotusCard();
            // mCard.render();
        })
        mainDiv.appendChild(sortBtn);

        this.shadowRoot!.appendChild(mainDiv);
    }


}


customElements.define('motus-bar', MotusBar)