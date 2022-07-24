import { useNavigate } from "react-router-dom"

const OrganisationPanel = () => {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col w-fit mx-auto">
            <div className="text-4xl">Organisation Portal</div>
            <div className="flex flex-col mt-4">
                <button className="px-3 py-2 bg-yellow-600 mb-2" onClick={(e)=>navigate("/organisation/venue")}>Add/Remove Venue</button>
                <button className="px-3 py-2 bg-green-600 text-white mt-2" onClick={(e)=>navigate("/organisation/slot")}>See/Update Slots</button>
            </div>
        </div>
    )
}

export default OrganisationPanel