export interface Venue {
    id:string,
    name:string,
    location:string
}

export interface Employee{
    id:string,
    name:string,
    age:number
}


export interface SlotSchema {
    id:string,
    employeeId:Employee,
    venueId:Venue,
    scheduledAt:string,
    status:"ALLOCATED"|"COMPLETED"|"CANCELLED",
    notes?:string
}