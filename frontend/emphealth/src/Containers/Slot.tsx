import axios from "axios"
import React, {useEffect, useState} from "react"
import { SlotSchema } from "../utils/schema"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../store"
import {EMPLOYEE, COMPLETED, BASE_URL} from "../utils/Constants"
import {setSlotInstances} from "../reducer/SlotSlice"

interface Props {
    type:string
}

interface EmpFuncProps {
    slot:SlotSchema
}

interface OrgFuncProps {
    slot:SlotSchema
}

const Slot:React.FC<Props> = ({type}) => {


    const dispatch = useDispatch()

    const SlotEmpFunc:React.FC<EmpFuncProps> = ({slot}) => {

        const deleteSlot = (slotId:string) => {
            axios.delete(`${BASE_URL}/emp/slot/${slotId}`)
            .then((result)=>{
                setSlots(slots.filter((slot)=>slot.id !== slotId))
                console.log("Deleted successfully" + result)
            })
            .catch((err)=>{
                console.log("Facing error" + err)
            })
        }


        return (
            <td className="flex flex-row">
            <button
                onClick={(e)=>navigate(`/employee/slot/update/${slot.id}`)} 
                className="bg-yellow-600 px-3 mt-2 py-2 mx-2 text-white rounded-xl">Update</button>
            <button
                onClick={(e)=>deleteSlot(slot.id)} 
                className="bg-red-600 px-3 py-2 mt-2 mx-2 text-white rounded-xl">Delete</button>
            </td>
        )
    }

    const SlotOrgFunc:React.FC<OrgFuncProps> = ({slot}) => {

        const updateStatus = (e:React.MouseEvent<HTMLButtonElement>) => {
            console.log("Update the status of slot "+ slot.id)
            axios.patch(`${BASE_URL}/org/slots/${slot.id}`)
            .then((result)=>{
                console.log(result)
                const filteredSlots = slots.filter((slotInstance)=> slotInstance.id !== slot.id)
                const newSlot = {...slot,status:COMPLETED} as SlotSchema
                setSlots([...filteredSlots, newSlot])
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        if(slot.status == "ALLOCATED"){
            return (
                <td>
                    <button onClick={updateStatus} className="bg-green-600 px-3 mt-2 py-2 mx-2 text-white rounded-xl">Update Success Status</button>
                </td>
            )
        }
        else{
            return (
                <td></td>
            )
        }
    }



    const navigate = useNavigate()
   
    const employeeId = useSelector((state: RootState) => state.employee.employeeInstance?.id)
    if(!employeeId && type === EMPLOYEE){
        navigate("/employee/login")
    }

    const [venueName, setVenueName] = useState<string>("")
    const [slots, setSlots] = useState<SlotSchema[]>([])

    const [allSlots, setAllSlots] = useState<SlotSchema[]>([])


    const filterVenueName = (e:React.ChangeEvent<HTMLInputElement>) => {
        setVenueName(e.target.value)
        setSlots(
            allSlots.filter((slot)=>slot.venueId.name.includes(e.target.value))
        )
    }



    const addNewSlot = () => {
        navigate("/employee/slot/add")
    }

    useEffect(()=>{
        if(type === EMPLOYEE)
            axios.get(`${BASE_URL}/emp/slots/${employeeId}`)
            .then((result)=>{
                dispatch(setSlotInstances(result.data))
                console.log(result)
                setAllSlots(result.data)
                setSlots(result.data)
            })
        else{
            axios.get(`${BASE_URL}/org/slots`)
            .then((result)=>{
                console.log(result)
                setAllSlots(result.data)
                setSlots(result.data)
            })
        }
    }, [])

    return (
        <div className="mx-auto w-fit">
            <div className="text-4xl font-bold text-center">All Slots</div>
            {type===EMPLOYEE?<button 
                onClick={addNewSlot}
                className="px-3 py-2 text-xl bg-yellow-400 w-fit rounded-xl ">Add New Slot</button>
            :<div></div>}
            <div className="flex flex-col">
                <div className="text-2xl text-center">Filter</div>
                <div className="flex flex-row">
                    {/* <input 
                        placeholder="Employee Name"
                        className="text-lg py-2 px-3 m-2 border-2 border-gray-400" 
                        value={employeeName} 
                        onChange={filterEmployeeName} /> */}
                    <input 
                        placeholder="Venue Name"
                        className="text-lg py-2 px-3 m-2 border-2 border-gray-400" 
                        value={venueName} 
                        onChange={filterVenueName} />
                </div>
                <table className="table-fixed p-4 border-2 mt-4">
                <thead >
                    <tr>
                        <th className="p-4 text-lg">Slot ID</th>
                        <th className="p-4 text-lg">Venue Name</th>
                        <th className="p-4 text-lg">Venue Location</th>
                        <th className="p-4 text-lg">Scheduled Time</th>
                        <th className="p-4 text-lg">Status</th>
                        <th className="p-4 text-lg">Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {slots.map((slot)=>
                    <tr className="bg-gray-300">
                        <td className="p-4 text-lg">{slot.id}</td>
                        <td className="p-4 text-lg">{slot.venueId.name}</td>
                        <td className="p-4 text-lg">{slot.venueId.location}</td>
                        <td className="p-4 text-lg">{slot.scheduledAt}</td>
                        <td className="p-4 text-lg">{slot.status}</td>
                        <td className="p-4 text-lg">{slot.notes}</td>
                        {type===EMPLOYEE?<SlotEmpFunc slot={slot} />:<SlotOrgFunc slot={slot} />}
                    </tr>)}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Slot