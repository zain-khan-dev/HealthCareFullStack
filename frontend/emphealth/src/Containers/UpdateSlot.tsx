import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { SlotSchema, Venue } from "../utils/schema"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import SlotForm from "../Components/SlotForm"

const UpdateSlot = () => {

    const navigate = useNavigate()

    const employeeId = useSelector((state: RootState) => state.employee.employeeInstance?.id)

    if(!employeeId){
        navigate("/employee/login")
    }

    const slots = useSelector((state: RootState) => state.slot.slotInstance)

    const {slotId} = useParams()

    console.log(slotId)
    const [slot, setSlot] = useState<SlotSchema>()

    useEffect(()=>{
        setSlot(slots.filter((slot)=>slot.id === slotId)[0])
    }, [])

    if(slot) {
        console.log(slot.scheduledAt)
        return (
            <SlotForm 
            url={`http://localhost:8000/emp/slot/${slotId}`}
            type="UPDATE"
            initialVenue={slot.venueId.id} initialScheduledAt={slot.scheduledAt} initialNotes={slot.notes?slot.notes:""}   />
        )
    }
    return(
        <div>Loading</div>
    )
    
}

export default UpdateSlot
