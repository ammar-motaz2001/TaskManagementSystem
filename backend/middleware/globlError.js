export const globalError=(err,req,res,next)=>{ // Function to handle any error in project
    let code=err.statusCode || 500 //if err.statusCode = undefined so will get 500 not error
    res.status(code).json({message:"Error",message:err.message})
}
    
