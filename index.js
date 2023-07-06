const express=require("express")
const { connection } = require("./config/db")
const { bookRoute } = require("./Routes/book.route")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())
app.use('/',bookRoute)


const port=process.env.port || 3001
app.listen(port,async()=>{
    try {
       await connection 
       console.log("Connected to DB")
    } catch (error) {
        console.log("Unable to connecte to DB", error)
    }
})