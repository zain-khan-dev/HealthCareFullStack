import express from "express"
import mongoose from "mongoose"
import VenueModel from "../models/checkupvenue"
import EmployeeModel from "../models/employee"
import EmployeeSlotModel from "../models/employeeslot"
const router = express.Router()




router.get("/", async (req, res)=>{
    const employee = await EmployeeModel.find({})
    res.status(200).json(employee)
})

router.get("/venues", async (req, res)=>{

    const allVenues = await VenueModel.find({}).select("id name location")

    res.status(200).json(allVenues)
})


router.post("/", async (req, res)=>{
    try {
        const {name, age} = req.body
        const employee = new EmployeeModel({name, age})
        const savedEmployee = await employee.save()
        res.status(200).json(savedEmployee)
    }
    catch(err) {
        console.log(err)
        res.status(400).send(err)
    }
})

router.get("/slots/:empId", async (req, res)=>{
    try{
        const allSlots = await EmployeeSlotModel.find({employeeId:new mongoose.Types.ObjectId(req.params.empId)}).populate("venueId")
        console.log(allSlots)
        res.status(200).json(allSlots)
    }
    catch(err) {
        res.status(404).send()
    }
    
})


router.put("/slot/:slotId", async (req, res)=>{
    try {
        const slotId = req.params.slotId
        const {employeeId, scheduledAt, notes, venueId} = req.body
        const result = await EmployeeSlotModel.updateOne({_id:slotId}, {employeeId, scheduledAt, notes, venueId})
        if(result.matchedCount == 1){
            res.status(200).send("Updated time successfuly")
        }
        else{
            res.status(404).send()
        }
    }
    catch(err){
        res.status(400).send()
    }
})


router.post("/slot/:empId", async (req, res)=>{
    try {
        const {venueId,status, notes,scheduledAt } = req.body
        const slot = new EmployeeSlotModel({employeeId:req.params.empId, status, notes, scheduledAt, venueId})
        const result = await slot.save()
        res.status(201).json(result)
    }
    catch(err) {
        res.status(400).send(err)
    }
})

router.put("/slot/:slotId", async (req, res)=>{
    try {
        const slotId = req.params.slotId
        console.log(slotId)
        const {venueId, notes,scheduledAt } = req.body
        const result = await EmployeeSlotModel.updateOne({_id:slotId}, { notes, scheduledAt, venueId})
        if(result.matchedCount === 0)
            res.status(404).send()
        else
            res.status(201).json(result)
    }
    catch(err) {
        res.status(400).send(err)
    }
})


router.delete("/slot/:slotid", async (req, res)=>{
    try {
        console.log(req.params)
        const result = await (EmployeeSlotModel).deleteOne({id:req.params.slotid})
        if(result.deletedCount === 0)
            res.status(404).send()
        else
        res.status(204).json("Deleted Succesfull")
    }
    catch(err) {
        res.status(404).send(err)
    }
})



export default router