import express from "express"
import dotenv from "dotenv"
import org_router from "./controllers/organization"
import emp_router from "./controllers/employee"
import {connect_db} from "./config/db.config"
import cors from "cors"


dotenv.config()
connect_db()
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.use("/org", org_router)

app.use("/emp", emp_router)


app.listen(PORT, ()=>{
    console.log("The server is listening for incoming request at port " + PORT)
})