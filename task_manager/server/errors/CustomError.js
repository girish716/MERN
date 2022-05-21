class CustomError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

function createCustomError(message, error){
  return new CustomError(message, error)
}

module.exports = {CustomError, createCustomError}