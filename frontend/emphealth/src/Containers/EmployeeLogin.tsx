import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Employee } from "../utils/schema"
import { useDispatch } from "react-redux"
import { setEmployee } from "../reducer/EmployeeSlice"

const EmployeePanel = () => {

    const navigate = useNavigate()
    const handleNavigate = (url:string) => {
        navigate(url)
    }
    const [employeeList, setEmployeeList] = useState<Employee[]>([])
    const [employeeId, setEmployeeId] = useState<string>("")

    const dispatch = useDispatch()
    const login = () => {
        console.log("login with user "+ employeeId)
        const employeeInstance = employeeList.find((emp)=>emp.id === employeeId)
        console.log(employeeId)
        if(employeeInstance){
            dispatch(setEmployee(employeeInstance))
            handleNavigate("/employee/panel")
        }
    }

    useEffect(()=>{
        axios.get("http://localhost:8000/emp/")
        .then((result)=>{
            setEmployeeList(result.data)
            setEmployeeId(result.data[0].id)
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    if(employeeList.length == 0){
        return <div>Loading</div>
    }
    else{

        return (
            <div className="mx-auto flex flex-col w-fit ">
                <div className="w-fit mx-auto text-2xl">Choose the employee to login with</div>
                <select value={employeeId} onChange={(e)=>setEmployeeId(e.target.value)}>
                    {employeeList.map((employee)=><option className="px-2 py-3" value={employee.id}>{employee.name}</option>)}
                </select>
                <button onClick={login} className="px-3 py-2 bg-green-500 mt-4">Login</button>
            </div>
        )
    }

}

export default EmployeePanel