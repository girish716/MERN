const mongoose = require('mongoose')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = new mongoose.Schema({
   name:{
    type:"String",
    required : [true, "Please provide name"],
    minlength : 3,
    maxlength : 50,
    unique : true
   },
   password:{
    type:"String",
    required : [true, "Please provide password"],
    minlength : 3
   }
})

Schema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10) // generate 10 random bytes
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

Schema.methods.createJWT = function (){
    const token = jwt.sign({userId : this._id, name: this.name}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_LIFETIME
    })
    return token
}

Schema.methods.comparePassword = async function (userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
} 

module.exports = mongoose.model('User', Schema)