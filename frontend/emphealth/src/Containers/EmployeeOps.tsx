import { useNavigate } from "react-router-dom"

const EmployeeOps = () => {


    const navigate = useNavigate()

    const handleNavigate = (url:string) => {
        navigate(url)
    }

    return (
        <div className="mx-auto w-fit">
            <div className="text-4xl font-bold">Welcome to Employee Panel</div>
            <div className="flex flex-col mt-4">
                <button className="px-3 py-2 bg-green-500 text-white mt-2" onClick={(e)=>handleNavigate("/employee/venue")}>All Venues</button>
                <button className="px-3 py-2 bg-yellow-500 mt-2 " onClick={(e)=>handleNavigate("/employee/slot")}>Add/Update/Delete Slot</button>
            </div>
        </div>
    )
}

export default EmployeeOps