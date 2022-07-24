import { useNavigate } from "react-router-dom"

const Home = () => {

    const navigate = useNavigate()

    const handleClick = (url:string) => {
        navigate(url)
    }

    return (
        <div className="mx-auto flex flex-col">
            <div className="w-fit my-2 text-2xl mx-auto">Welcome to Employee Wellbeing program</div>
            <button onClick={(e)=>handleClick("/employee/login")} className="w-fit mx-auto px-3 py-2 text-xl bg-yellow-500 mb-2">Employee Portal</button>
            <button onClick={(e)=>handleClick("organisation")} className="w-fit mx-auto px-3 py-2 text-xl bg-green-500 mt-2">Organisation Portal</button>
        </div>
    )
}

export default Home