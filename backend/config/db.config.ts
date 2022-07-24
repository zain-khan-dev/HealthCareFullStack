import mongoose from "mongoose"
const {Schema} = mongoose
import dotenv from "dotenv"
import EmployeeModel from "../models/employee"

import EmployeeSlots from "../models/employeeslot"


dotenv.config()

export const connect_db = () => {

    const db_url = process.env.DB_URL as string
    mongoose.connect(db_url, function (err) { 
    if (err) throw err; console.log('Successfully connected'); });
}
