import jwt from 'jsonwebtoken'
import { AppError } from '../utils/appError.js'
export const verifyToken=(req,res,next)=>{
    let {token}=req.headers //to make token in header
    jwt.verify(token,process.env.JWT_SECRET,async(err,decode)=>{ //verify my token 
        if(err) return next(new AppError("You Are Not Log in ,please Login to get Access",406))
        req.user=decode // hint: middleware before go to the next middleware it is has a previous response i do it to make a task with his user
       next()
    })
}