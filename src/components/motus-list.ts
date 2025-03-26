import { Motus } from "../models/motus";
import MotusService from "../services/motus-service";
import MotusCard from "./motus-card";

export default class SuperList extends HTMLElement {

    mservice: MotusService;
    moti: Motus[]

    constructor() {
        super()
        this.attachShadow({mode: 'open'});
        this.mservice = new MotusService();
        this.moti = [];
    }

    async connectedCallback(){

        this.moti = await this.mservice.loadMoti();
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
            }

            .add-btn{
            height: 64px;
            width: 64px;
            border-radius: 50%;
            position: absolute;
            bottom: 20px;
            right: 20px;
            border: none;
            font-size: 1rem;
            background-color: blue;
            }

            .add-btn:hover{
            backgroud-color: white;
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
            card.setAttribute("selected-motus", JSON.stringify(motus))
            main.appendChild(card);
        }
        container.appendChild(main);

        const addBtn = document.createElement("button");
        addBtn.classList.add("add-btn");
        addBtn.appendChild(document.createTextNode("➕"));
        addBtn.addEventListener("click", () => this.addRandomMotus())
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
            "log": 8.932884544410793
        }

        const motus: Motus = {
            "id": id,
            "value": value,
            "note": note,
            "creationDate": creationDate,
            "location": location
        }

        console.log(motus);
    }
}
customElements.define('motus-list', SuperList);