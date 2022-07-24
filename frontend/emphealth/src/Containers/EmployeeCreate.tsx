import axios from "axios"
import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import { BASE_URL } from "../utils/Constants"
import { useNavigate } from "react-router-dom"
const EmployeeCreate = () => {

    const [name, setName] = useState<string>("")

    const [age, setAge] = useState<number>(18)

    const navigate = useNavigate()

    const createEmployee = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/emp`, {name, age})
        .then((result)=>{
            console.log("Created employee")
            navigate("/employee/login")
        })
        .catch((err)=>{
            console.log("There was an error creating employee try again" +  err)
        })
    }


    return (
        <div className="mx-auto w-fit flex flex-col justify-center items-center">
            <div className="text-4xl font-bold my-2">Add New Employee</div>
            <form onSubmit={createEmployee} className="flex flex-col justify-center p-2 m-2 border-2 border-gray-300 mx-auto ">
                <label className="block p-2">Enter Name</label>
                <input className="block p-2 border-2 border-gray-400" value={name} onChange={(e)=>setName(e.target.value)} />
                <label className="block p-2 ">Enter Age</label>
                <input className="block p-2 border-2 border-gray-400" min={18} max={100} type="number" value={age} onChange={(e)=>setAge(parseInt(e.target.value))} />
                <button className="bg-green-600 px-3 py-2 mt-2 text-center mx-auto text-white" type="submit">Add</button>
            </form>
        </div>
    )
}

export default EmployeeCreate