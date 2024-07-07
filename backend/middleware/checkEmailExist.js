import { userModel } from "../database/models/user.model.js"
import bcrypt from 'bcrypt'
import { AppError } from "../utils/appError.js"

export const checkEmailExist=async(req,res,next)=>{
    let isEmailExist=await userModel.findOne({where:{email:req.body.email}}) //to ensure that the email exist in database or not
    if(isEmailExist) return next(new AppError("Email Already Exist",409)) //using App Error that we created to receive 2 parameters (message,statusCode)
    req.body.password=bcrypt.hashSync(req.body.password,8) //hashing password
    next()
}