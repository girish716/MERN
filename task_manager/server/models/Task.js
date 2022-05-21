const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    description : {
        type:String,
        required:[true,"must provide descrption"],
        trim:true
    },
    completed:{
        type:Boolean,
        required:false,
        default:false
    }
});

module.exports = mongoose.model('Task', TaskSchema);