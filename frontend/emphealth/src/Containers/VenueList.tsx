import { useEffect, useState } from "react"
import { Venue } from "../utils/schema"
import axios from "axios"
import {EMPLOYEE, ORGANISATION} from "../utils/Constants"
import { useNavigate } from "react-router-dom"

interface Props {
    type:string
}


const VenueList:React.FC<Props>  = ({type}) => {

    const [venues, setVenues] = useState<Venue[]>([])

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get("http://localhost:8000/emp/venues")
        .then((result)=>{
            setVenues(result.data)  
        })
        .catch((err)=>{
            console.log("Error fetching the venues for employee")
        })
    }, [])

    const deleteVenue = (venueId:string) => {
        axios.delete(`http://localhost:8000/org/venue/${venueId}`)
        .then((result)=>{
            console.log(result)
            setVenues(venues.filter((venue)=>venue.id !== venueId))
        })
        .catch((err)=>{
            console.log("Error deleting the slot")
        })
    }

    return (
        <div className="mx-auto w-fit">
            <div className="text-4xl font-bold text-center">All Venues</div>
            {type===ORGANISATION?<button className="px-3 py-2 bg-green-600 text-white rounded-xl" onClick={(e)=>navigate("/organisation/venue/add")}>Add Venue</button>:<></>}
            <table className="table-fixed p-4 border-2 mt-4">
                <thead >
                    <tr>
                        <th className="p-4 text-lg">ID</th>
                        <th className="p-4 text-lg">Name</th>
                        <th className="p-4 text-lg">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {venues.map((venue)=>
                    <tr className="bg-gray-300">
                        <td className="p-4 text-lg">{venue.id}</td>
                        <td className="p-4 text-lg">{venue.name}</td>
                        <td className="p-4 text-lg">{venue.location}</td>
                        {type==EMPLOYEE?
                        <td></td>:
                        <td>
                            <button onClick={(e)=>deleteVenue(venue.id)} className="px-3 py-2 bg-red-600 m-2 text-white rounded-xl">Delete</button></td>}
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}


export default VenueList