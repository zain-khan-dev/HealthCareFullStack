import axios from "axios"
import React, {useEffect, useState} from "react"
import { Venue } from "../utils/schema"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { useNavigate } from "react-router-dom"
import SlotForm from "../Components/SlotForm"
import { BASE_URL } from "../utils/Constants"

const AddSlot = () => {    
    const employeeId = useSelector((state: RootState) => state.employee.employeeInstance?.id)

    const navigate = useNavigate()
    if(!employeeId){
        navigate("/employee/login")
    }


    return (
        <SlotForm 
        url={`${BASE_URL}/emp/slot/${employeeId}`}
        type="ADD"
        initialNotes="" initialScheduledAt="" initialVenue=""/>
    )

}

export default AddSlot