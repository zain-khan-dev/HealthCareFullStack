import mongoose from "mongoose";

const EmployeeSlotSchema = new mongoose.Schema({
    employeeId: {type:mongoose.Schema.Types.ObjectId,ref:'employee',required:true},
    venueId:{type:mongoose.Schema.Types.ObjectId,ref:'venue', required:true},
    status: {type:String, enum:["ALLOCATED", "COMPLETE", "CANCELLED"], required:true, default:"ALLOCATED"},
    notes: {type:String},
    scheduledAt:{type:Date, required:true}
}).set('toJSON', {
    virtuals: true
});


const EmployeeSlotModel = mongoose.model("slots", EmployeeSlotSchema)

export default EmployeeSlotModel 


//employeeId
// venueId
// scheduledAt (datetime)
// status ( ALLOCATED | COMPLETE | CANCELLED) [Default = ALLOCATED]
// notes (if any)