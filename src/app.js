import express from 'express'
import cors from "cors"
import cookieParser from "cookie-parser"


 
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json( {limit : "16kb"} ))
app.use(express.urlencoded({ extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//import rout
import userRouter from "./routes/user.routes.js"
import medicalMcqRouter from "./routes/medical.routes.js"
import loogedin  from './routes/user.routes.js'


//routes decleration 

app.use("/apis/v1/usersdata", userRouter)
app.use("/apis/v2/medical", medicalMcqRouter)
app.use("/apis/v2/loggedin", loogedin)



export { app }