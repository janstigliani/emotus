// export interface Motus {
//     id: string
//     value: number
//     note: string
//     creationDate: number
//     location?: Location
//   }

export class Motus {
  id: string
  value: number
  note: string
  creationDate?: number
  location?: Location

  constructor(id: string, value: number, note: string, creationDate?: number, location?: Location) {

    this.id = id;
    this.value = value;
    this.note = note;
    if (creationDate) {
      this.creationDate = creationDate;
    } else {
      this.creationDate = new Date().getTime();
    }
    if(location){
      this.location = location;
    } else {
      this.location = {lat:0, lng:0}
    }
  }

  fromValueToEmoji(value: number) {
    switch (value) {
      case 0:
        return '😭';
      case 1:
        return '😥';
      case 2:
        return '😐';
      case 3:
        return '🙂';
      default:
        return '😁';
    } 
  } 

  fromTimeStampToDateString(timeStamp: number) {
    const date = new Date(timeStamp);
    return date.toDateString() + ' - ' + date.toLocaleTimeString();
  }

}

export interface Location {
  lat: number
  lng: number
}