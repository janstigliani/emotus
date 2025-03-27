import { Motus } from "../models/motus";
import MotusService from "../services/motus-service";
import MotusCard from "./motus-card";
import SuperDialog from "./motus-dialog";

export default class SuperList extends HTMLElement {

    mService: MotusService;
    moti: Motus[]

    constructor() {
        super()
        this.attachShadow({mode: 'open'});
        this.mService = new MotusService();
        this.moti = [];
    }

    async connectedCallback(){

        this.moti = await this.mService.loadMoti();

        const sDialog = document.getElementById('motus-dialog') as SuperDialog;
        sDialog.addEventListener('motus-added', (event) => {
            const customEvent = event as CustomEvent<Motus>; // Explicitly cast
            const newMotus: Motus = customEvent.detail;
            this.moti = this.mService.addMoti(newMotus);
            this.render();
        });

        this.styling();
        this.render();
    }


    styling(){
        const style = document.createElement('style');
        style.innerText = `
            .grid{
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                min-height: 50vh;
            }

            .add-btn{
            height: 64px;
            width: 64px;
            border-radius: 50%;
            position: fixed;
            bottom: 0px;
            right:0px;
            border: none;
            font-size: 1.4rem;
            background-color: rgb(218, 192, 24);
            }

            .add-btn:hover{
                font-size:1.6rem;
                background-color: rgba(218, 192, 24, 0.712);
            }
        `
        this.shadowRoot!.appendChild(style);
    }

    render(){

        let container = this.shadowRoot!.getElementById("container");
        if (container) {
            container.innerHTML="";
        } else {
            container = document.createElement("div");
            container.id = "container";
            this.shadowRoot!.appendChild(container);
        }

        const main = document.createElement('div');
        main.classList.add('grid');
    
        for (let i = 0; i  < this.moti.length; i++) {
            const motus = this.moti[i];
            const card: MotusCard= document.createElement('motus-card') as MotusCard;
            card.setAttribute("selected-motus", JSON.stringify(motus));
            main.appendChild(card);
        }
        container.appendChild(main);

        const addBtn = document.createElement("button");
        addBtn.classList.add("add-btn");
        addBtn.appendChild(document.createTextNode("➕"));
        addBtn.addEventListener("click", () => {
            const sDialog = document.querySelector('super-dialog') as SuperDialog;
            if (sDialog) {
                sDialog.addMotus();
            } else {
                console.log("SuperDialog element not found!");
            }
        });
        container.appendChild(addBtn);
    }

    addRandomMotus() {
        const value = Math.floor(Math.random()*5);
        let charArr = [];
        for (let i = 0; i < Math.floor((Math.random()*110)+30); i++) {
            const char = String.fromCharCode(Math.floor(Math.random()*500+100));
            charArr.push(char);
        }
        const note = charArr.join("")
        const date = new Date();
        const creationDate = date.getTime();
        const id = "user1 - "+creationDate;
        const location = {
            "lat": 44.410829850427454, 
            "lng": 8.932884544410793
        }

        const motus: Motus = {
            "id": id,
            "value": value,
            "note": note,
            "creationDate": creationDate,
            "location": location
        }

        this.mService.addMoti(motus);
        this.render()
    }
}
customElements.define('motus-list', SuperList);