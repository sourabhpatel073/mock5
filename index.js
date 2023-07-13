const express= require("express")
const { connection } = require("./db")
const { userRouter } = require("./Routes/userRoute")

require("dotenv").config()

const app=express()

app.use("/user",userRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
         console.log("connected to db")
        console.log(`server is running on ${process.env.port}`)
    }
    catch(err){
    console.log(err)
    }
})

