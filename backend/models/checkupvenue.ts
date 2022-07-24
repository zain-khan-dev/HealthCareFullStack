import mongoose from "mongoose"

const Schema = mongoose.Schema

const VenueSchema = new Schema({
    
    name:{type:String,required:true},
    location:{type:String,required:true}
}).set('toJSON', {
    virtuals: true
});


const VenueModel =  mongoose.model("venue", VenueSchema)

export default VenueModel