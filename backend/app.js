import express from 'express'
import dotenv from 'dotenv'
import logger from 'morgan'
import cors from 'cors'
import connectDB from './config/config.js'
import UserRouter from './routes/UserRoutes.js'
import AdminRouter from './routes/AdminRouter.js'
import morgan from 'morgan'

const app = express()

dotenv.config()
connectDB()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))



app.use('/test',(req,res)=>{

res.send("hhello")
}) 

app.use('/',UserRouter)
app.use('/admin',AdminRouter)


app.listen(process.env.PORT,console.log(`server is running in port ${process.env.PORT}`))