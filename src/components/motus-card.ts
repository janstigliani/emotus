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

    //     const motusStr = this.getAttribute('selected-motus');
    // if (!motusStr) {
    //     throw new Error("selected-motus attribute is missing on motus-card");
    // }
    // const moti = JSON.parse(motusStr!);
    // return new Motus(moti.id, moti.value, moti.note, moti.creationDate);

        const moti = JSON.parse(this.getAttribute(`selected-motus`)!);
        
        return new Motus(moti.id, moti.value, moti.note, moti.creationDate);
    }

    connectedCallback(){
        this.styling();
        this.render();
    }

    styling(){
        const style = document.createElement('style');
        style.innerText = `
            .card {
                border-radius: 2rem;
                box-shadow: 8px 13px 38px 0px rgba(0,0,0,0.1);
                padding: 8px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                height: 150px
            }

            .emoji {
                font-size: 3rem;
                text-align: center;
            }

            .info-container {
                display: flex;
                flex-direction: column;
                gap: 16px;
                align-items: flex-start;
                justify-content: center;
                width: 80%;
            }

            .btn {
                display: flex;
                justify-content: flex-end;
                width: 95%;
            }

            .cancel {
                background-color: transparent;
                font-size: 1.3rem;
                border: none;
            }

            .cancel:hover {
                font-size: 1.2rem;
                color: rgba(0, 0, 0, 0.61);
            }

            .note{
                height: 60px;
                width: 100%;
                overflow: auto;
                text-overflow:ellipsis;
            }
        `
        this.shadowRoot!.appendChild(style);
    }

    render(){
        const mainDiv = document.createElement('div');
        mainDiv.classList.add("card");
        mainDiv.innerHTML = `
            <span class="emoji">${this.motus.fromValueToEmoji(this.motus.value)}</span>
            <div class="info-container">
                <span class="date">
                    ${this.motus.fromTimeStampToDateString(this.motus.creationDate!)}
                </span>
                <div class="divider"></div>
                <span class="note">
                    ${this.motus.note}
                </span>
                <div class="btn" id="btn-div">
                    <button class="cancel">
                        X
                    </button>
                </div>
            </div>
        `;
        // const divBtn = document.getElementById("btn-div");
        // const cancelBtn = document.createElement("button");
        // cancelBtn.innerText="X";
        // cancelBtn.classList.add("cancel");
        // cancelBtn.addEventListener("click", () => this.deleteMoti());
        // divBtn!.appendChild(cancelBtn);

        this.shadowRoot!.appendChild(mainDiv);
    }

    // deleteMoti() {
    //     const dialogConfirm = document.createElement("dialog");
    //     dialogConfirm.nodeValue= "sei sicuro di voler eliminare la nota?";
    //     const confirm
    // }

    // fromValueToEmoji(value:Number) {
    //     switch (value) {
    //         case 0:
    //             return "🤬";
    //         case 1:
    //             return "😵";
    //         case 2:
    //             return "😕";
    //         case 3:
    //             return "🙂";
    //         default:
    //             return "🥳";
    //     }
    // }

    // fromTimeStampToDate(timeStamp: number) {
    //     const date = new Date(timeStamp);
    //     return date.toDateString() + " - " + date.toLocaleTimeString();
    // }
}
customElements.define('motus-card', MotusCard)