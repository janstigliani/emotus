import { Motus } from "../models/motus";

export default class MotusService {

    moti: Motus[];
    index: number;

    constructor() {
        this.moti= [];
        this.index = 0;
    }

    async loadMoti() {
        const localMotiString = localStorage.getItem('moti');
        if (localMotiString) {
            const motiArray = JSON.parse(localMotiString);
            this.moti = this.fromObjToMoti(motiArray);
        } else {
            const motiArray = await this.getMotiFromJson();
            this.moti = this.fromObjToMoti(motiArray);
            this.saveMoti();
        }
        return this.moti;
    }

    fromObjToMoti(array:Motus[]) {
        for (const motus of array) {
            this.moti.push(new Motus(motus.id, motus.value, motus.note, motus.creationDate));
        }
        return this.moti;
    }


    getMotiFromJson(): Promise<Motus[]> {
        return fetch('/emotions.json')
              .then(resp => resp.json())
    }

    saveMoti(){
        localStorage.setItem('moti', JSON.stringify(this.moti));
        return this.moti;
    }

    addMoti(motus:Motus){
        this.moti.push(motus);
        this.saveMoti()
        return this.moti;
    }

    async sortMoti() {
        
        const localMotiString = localStorage.getItem('moti');
        if (localMotiString) {
            const motiArray = JSON.parse(localMotiString);
            this.moti = this.fromObjToMoti(motiArray);
        } else {
            const motiArray = await this.getMotiFromJson();
            this.moti = this.fromObjToMoti(motiArray);
        }

        switch (this.index) {
            case 0:
                this.sortByDate();
                break;
            case 1:
                this.sortByReverseEmoValue();
                break;
            default:
                this.sortByEmoValue();
                break;
        }
        console.log(this.moti);
        this.saveMoti();
        this.index++;
        if (this.index>2) {
            this.index=0;
        }
        return this.moti= [];
        
    }

    sortByDate() {
        this.moti.sort((m1,m2) => m1.creationDate! - m2.creationDate!);
        return this.moti;
    }

    sortByReverseEmoValue() {
        this.moti.sort((m1,m2) => m1.value! - m2.value!);
        return this.moti;
    }

    sortByEmoValue() {
        this.moti.sort((m1,m2) => m2.value! - m1.value!);
        return this.moti;
    }
}