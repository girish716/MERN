const asyncWrapper = (fn)=>{
    return async (req,res,next)=>{
        try{
            await fn(req,res,next)
        }
        catch (error) {
            //Express has inbuilt error handling that means for sync code express will handle the errors by itself but for Async code we have to pass the error message to the next function then only it will be handled by the Express.
            next(error)
        }
    } 
}

module.exports = asyncWrapper