const moongoose = require("mongoose");



const connectDB = (url)=>{
    return moongoose.connect(url)
}

module.exports = connectDB;

         

