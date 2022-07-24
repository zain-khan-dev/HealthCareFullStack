import axios from "axios"
import React, {useState} from "react"
 
const VenueAdd = () => {

    const addVenue = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post("http://localhost:8000/org/venue", {name, location} )
        .then((result)=>{
            console.log(result)
        })
        .catch((err)=>{
            console.log("there was an error posting ")
        })
    }


    const [name, setName] = useState<string>("")
    const [location, setLocation] = useState<string>("")

    return (
        <div className="flex flex-col mx-auto w-fit ">
            <div className="text-4xl font-bold text-center ">Add venue</div>
            <form onSubmit={addVenue} className="text-center mx-2 border-2 mt-4  border-gray-400 ">
                <label htmlFor="" className="text-2xl p-2 m-2 block">Name</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} className="border-2 border-gray-300 m-2 block" />
                <label htmlFor="" className="text-2xl p-2 m-2 block">Location</label>
                <input value={location} onChange={(e)=>setLocation(e.target.value)} className="border-2 border-gray-300 m-2 block" />
                <button 
                    type="submit"
                    className="px-3 py-2 bg-green-600 text-white m-2 rounded-xl">
                    Add Venue
                </button>
            </form>
        </div>
    )
}

export default VenueAdd