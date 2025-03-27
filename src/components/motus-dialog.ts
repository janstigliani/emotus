import { Motus } from "../models/motus";

export default class SuperDialog extends HTMLElement {
    dialog: HTMLDialogElement
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.dialog = document.createElement('dialog');
        this.dialog.style.display = 'none'; // Ensure it's hidden initially
    }

    connectedCallback() {
        this.styling();
        this.render();
    }

    styling() {
        const style = document.createElement('style');
        style.innerText = `
        .dialog-add {
            width: 100vh;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        
        .mother {
            display: flex;
            flex-direction: column;
            gap: 2%;
        }

        .father {
            display:flex;
            gap:1%;
        }

        .summary {
            height: 100%;
        }
        `
        this.shadowRoot!.appendChild(style);
    }

    render() {

        this.dialog.id = 'dialog';
        this.dialog.classList.add("mother", "dialog-add")

        this.dialog.innerHTML = `
        <form id="form" class="mother">
            <div class="father">
                <input type="radio" name="emoLevel" id="Angry" value="0">
                <label for="Angry">Angry🤬</label>
                <input type="radio" name="emoLevel" id="Dejected" value="1">
                <label for="Dejected">Dejected😵</label>
                <input type="radio" name="emoLevel" id="Puzzled" value="2">
                <label for="Puzzled">Puzzled😕</label>
                <input type="radio" name="emoLevel" id="Happy" value="3">
                <label for="Happy">Happy🙂</label>
                <input type="radio" name="emoLevel" id="Ecstatic" value="4">
                <label for="Ecstatic">Ecstatic🥳</label>
            </div>
            <textarea name="summary" id="summary" maxlength="140" placeholder="how do you feel?(140 char max)" style="height: 80px;width: 600px; "></textarea>
        </form>
        `;
        const cancelBtn = document.createElement('button');
        cancelBtn.appendChild(document.createTextNode('cancella'));
        cancelBtn.addEventListener('click', () => {
            this.dialog.close();
            this.dialog.style.display = 'none'; // Hide it again after closing
        });
        this.dialog.appendChild(cancelBtn)

        const okBtn = document.createElement('button');
        okBtn.appendChild(document.createTextNode('ok'));
        okBtn.addEventListener('click', () => this.dispatchMotus());
        this.dialog.appendChild(okBtn)

        this.shadowRoot!.appendChild(this.dialog);
    }

    dispatchMotus() {
        const date = new Date();
        const creationDate = date.getTime();
        const form = this.shadowRoot!.getElementById('form') as HTMLFormElement | null;
        if (form) {
            const data = new FormData(form);
            const motus:Motus = {
                id: `user1 - ${creationDate}`,
                value: Number(data.get("emoLevel")),
                note: data.get("summary") as string,
                creationDate: creationDate,
                location: {
                    lat: 44.410829850427454,
                    lng: 8.932884544410793
                }
            }
    
            const event = new CustomEvent('motus-added', { detail: motus })
            this.dispatchEvent(event);
    
            this.dialog.close();
            this.dialog.style.display = 'none'; // Hide after submitting
        }
       
    }

    setupForm(){
        const form = this.shadowRoot!.getElementById('form') as HTMLFormElement;
        form.reset();
    }

    addMotus() {
        this.dialog.style.display = 'block'; // Make it visible before opening
        this.setupForm()
        this.dialog.showModal();
    }
}

customElements.define('super-dialog', SuperDialog)