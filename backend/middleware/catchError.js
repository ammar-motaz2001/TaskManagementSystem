
export function catchError(callback){ //to handle error in any end points

    return (req,res,next)=>{
        callback(req,res,next).catch((err)=>{
           next(err) //to go to a global Error and handle it
        })
    }
}