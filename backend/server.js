process.on("uncaughtException",(err)=>{
    console.log("error in code",err)
})
import express from 'express'
import dbConnection from './database/dbConnection.js'
import taskRouter from './modules/task/task.routes.js'
import userRouter from './modules/user/user.routes.js'
import dotenv from 'dotenv'
import { AppError } from './utils/appError.js'
import { globalError } from './middleware/globlError.js'
import cors from 'cors'

dotenv.config()
const app = express()
const port = process.env.PORT||3003
app.use(cors())
dbConnection.sync({alter:true}) // alter:true => becouse if any update in my database show 
app.use(express.json()) //body parser
app.use(taskRouter)
app.use(userRouter)
app.use('*',(req,res,next)=>{
    next(new AppError(`route Not Found ${req.originalUrl}`,404))
})
app.use(globalError)
process.on("unhandledRejection",(err)=>{
   console.log("error",err)
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))