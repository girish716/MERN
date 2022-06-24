require('dotenv').config()
const { UnauthenticatedError} =  require('../errors')
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const authenticate = async (req, res, next)=>{
    const authorizationHeader = req.headers.authorization
    if(!authorizationHeader || !authorizationHeader.startsWith("Bearer ")){
        throw new UnauthenticatedError("Authorization Invalid")
    }
    
    const token = authorizationHeader.split(" ")[1]

    try {
        const userData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId : userData.userId, name : userData.name}
        next()
    } catch (error) {
        throw new UnauthenticatedError("Authorization Invalid")
    }
}

module.exports = authenticate