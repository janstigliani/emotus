export interface Motus {
    id: string
    value: number
    note: string
    creationDate: number
    location?: Location
  }
  
  export interface Location {
    lat: number
    lng: number
  }