import mongoose from "mongoose"
const {Schema} = mongoose


const EmployeeSchema = new Schema({
    name: {type:String,required:true},
    age: {type:Number, required:true}
}).set('toJSON', {
    virtuals: true
});


const EmployeeModel = mongoose.model("employee", EmployeeSchema)

export default EmployeeModel