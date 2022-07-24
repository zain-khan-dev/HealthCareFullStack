import express from "express"
import VenueModel from "../models/checkupvenue"
import EmployeeModel from "../models/employee"
import EmployeeSlotModel from "../models/employeeslot"


const router = express.Router()


router.post("/venue", async (req, res)=>{
    console.log(req.body)
    try{
        const {name, location} = req.body
        const venue = new VenueModel({name, location})
        const result = await venue.save()
        res.status(201).json(result)
    }
    catch(err) {
        res.status(400).send(err)
    }
    
})

router.delete("/venue/:venueid", async (req, res)=>{
    try {
        const result = await VenueModel.deleteOne({id:req.params.venueid})
        if(result.deletedCount === 0)
            res.status(404).send()
        else
        res.status(200).json("Venue deleted successful")
    }
    catch(err) {
        res.status(400).send(err)
    }
    
})


router.get("/slots", async (req, res)=>{

    const allSlots = await EmployeeSlotModel.find({}).populate({path:"employeeId", model:EmployeeModel}).populate({path:"venueId", model:VenueModel})
    res.status(200).json(allSlots)
})

router.patch("/slots/:slotID", async (req, res)=>{
    try {
        const updatedSlot = await EmployeeSlotModel.updateOne({_id:req.params.slotID}, { "status" : "COMPLETE" } )
        console.log(updatedSlot)
        if(updatedSlot.matchedCount === 0)
            res.status(404).send()
        else
            res.status(204).send()
    }
    catch(err) {
        res.status(400).send(err)
    }
    
})


export default router