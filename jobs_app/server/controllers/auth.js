const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { BadRequestError, UnauthenticatedError } = require('../errors')


const register = async (req,res)=>{
    const { name, password } = req.body
    // we are hashing the password in User model
    const user = await User.create({name, password})

    const token = user.createJWT() // custom method created in User model

    res.status(StatusCodes.CREATED).json({user:{name}, token})
}

const login = async (req,res)=>{
    const {name, password} = req.body
    if(!name || !password){
        throw new BadRequestError("please provide both name and password..")
    }
    const user = await User.findOne({name})
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name}, token})
}

module.exports = {register, login} 