import {useState, useEffect} from "react"
import {Venue} from "../utils/schema"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import {BASE_URL} from "../utils/Constants"


interface Props {
    initialVenue:string,
    initialScheduledAt:string,
    initialNotes:string ,
    url:string, 
    type:string
}


const SlotForm:React.FC<Props> = ({initialNotes, initialScheduledAt, initialVenue, url, type}) => {

    const navigate = useNavigate()

    const [venueList, setVenueList] = useState<Venue[]>([])

    const [venue, setVenue] = useState<string>(initialVenue)

    const [scheduledAt, setScheduledAt] = useState<string>(initialScheduledAt)

    const [notes, setNotes] = useState<string>(initialNotes)


    console.log(venue)
    console.log(scheduledAt)
    console.log(notes)
    
    

    useEffect(()=>{

        axios.get(`${BASE_URL}/emp/venues`)
        .then((result)=>{
            console.log(result)
            setVenueList(result.data)
            // setVenue(result.data[0].id)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])


    const bookSlot = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(type==="ADD"){
            axios.post(url, {venueId:venue, notes, scheduledAt})
            .then((result)=>{
                console.log(result)
                navigate("/employee/slot")
            })
            .catch((err)=>{
                console.log("Error creating new slot try again")
            })
        }
        else{
            axios.put(url, {venueId:venue, notes, scheduledAt})
            .then((result)=>{
                console.log(result)
                navigate("/employee/slot")
            })
            .catch((err)=>{
                console.log("Error creating new slot try again")
            })

        }

    }

    if( venueList.length === 0){
        return (
            <div>Loading</div>
        )
    }
    else{
    return (
        <div className="mx-auto w-fit">
            <div className="text-4xl font-bold text-center">Add Slot</div>
            <form onSubmit={bookSlot} className="m-2">
                <label className="text-xl m-2 block">Choose Venue</label>
                <select value={venue} onChange={(e)=>setVenue(e.target.value)} className="m-2">
                    {venueList.map((venue)=><option value={venue.id}>{venue.name}</option>)}
                </select>
                <label className="m-2 block">Select Scheduled Time</label>
                <input className="m-2 block" type="datetime-local" value={scheduledAt} onChange={(e)=>setScheduledAt(e.target.value)} />
                <label className="m-2 block">Enter Notes</label>
                <textarea className="m-2 block border-2 border-black" value={notes} onChange={(e)=>setNotes(e.target.value)} />
                <button type="submit" className="px-3 py-2 bg-green-600 mx-auto text-white w-fit text-center">
                    {type==="ADD"?"Add Slot":"Update Slot"}</button>
            </form>
        </div>
    )

    }
}

export default SlotForm