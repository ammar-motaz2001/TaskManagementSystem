import jwt from 'jsonwebtoken'
import { AppError } from '../utils/appError.js'
export const verifyToken=(req,res,next)=>{
    let {token}=req.headers
    jwt.verify(token,process.env.JWT_SECRET,async(err,decode)=>{
        if(err) return next(new AppError("Invalid Token",406))
        req.user=decode
       next()
    })
}