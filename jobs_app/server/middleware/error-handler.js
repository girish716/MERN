const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg : err.msg || 'Something went wrong, please try again later..'
  }
  // mongoose validation error
  if(err.name === "ValidationError"){
    customError.msg = `Please provide ${Object.keys(err.errors)}`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  // mongoose duplicate error
  if(err.code && err.code===11000){
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)}, please choose another value`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  if(err.name && err.name==="CastError"){
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  }
  return res.status(customError.statusCode).json({ msg : customError.msg })
}

module.exports = errorHandlerMiddleware
