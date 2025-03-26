import { Motus } from "../models/motus";

export default class MotusCard extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }


    get motus():Motus{
        // const motusStr = this.getAttribute('selected-motus');
        // if (motusStr) {
        //     return JSON.parse(motusStr);
        // }
        // return null;
        return JSON.parse(this.getAttribute(`selected-motus`)!)
    }

    connectedCallback(){
        this.styling();
        this.render();
    }

    styling(){
        const style = document.createElement('style');
        style.innerText = `
            .card{
                border-radius: 4rem;
                box-shadow: 8px 13px 38px 0px rgba(0,0,0,0.1);
                padding: 8px;
                display: flex;
                align-items: center;
                justify-content: space-around;
            }

            .emoji{
                font-size: 3rem;
                text-align: center;
            }

            .info-container{
                display: flex;
                flex-direction: column;
                gap: 16px;
                align-items: flex-start;
                justify-content: center;
                width: 80%;
            }

            .btn{
                display: flex;
                justify-content: center;
                width: 80%;
            }

        `
        this.shadowRoot!.appendChild(style);
    }

    render(){
        const mainDiv = document.createElement('div');
        mainDiv.classList.add("card");
        mainDiv.innerHTML = `
            <span class="emoji">${this.fromValueToEmoji(this.motus.value)}</span>
            <div class="info-container">
                <span class="date">
                    ${this.fromTimeStampToDate(this.motus.creationDate)}
                </span>
                <div class="divider"></div>
                <span>
                    ${this.motus.note}
                </span>
                <div class="btn">
                    <button>
                        cancella
                    </button>
                </div>
            </div>
        `;
        this.shadowRoot!.appendChild(mainDiv);
    }

    fromValueToEmoji(value:Number) {
        switch (value) {
            case 0:
                return "🤬";
            case 1:
                return "😵";
            case 2:
                return "😑";
            case 3:
                return "🙂";
            default:
                return "🥳";
        }
    }

    fromTimeStampToDate(timeStamp: number) {
        const date = new Date(timeStamp);
        return date.toDateString() + " - " + date.toLocaleTimeString();
    }
}
customElements.define('motus-card', MotusCard)