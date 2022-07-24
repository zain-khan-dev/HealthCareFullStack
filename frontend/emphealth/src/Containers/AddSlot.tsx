import axios from "axios"
import React, {useEffect, useState} from "react"
import { Venue } from "../utils/schema"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { useNavigate } from "react-router-dom"
import SlotForm from "../Components/SlotForm"

const AddSlot = () => {    
    const employeeId = useSelector((state: RootState) => state.employee.employeeInstance?.id)

    const navigate = useNavigate()
    if(!employeeId){
        navigate("/employee/login")
    }


    return (
        <SlotForm 
        url={`http://localhost:8000/emp/slot/${employeeId}`}
        type="ADD"
        initialNotes="" initialScheduledAt="" initialVenue=""/>
    )

}

export default AddSlot