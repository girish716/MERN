const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company : {
        type : String,
        required : [true, 'Please provide company name'],
        maxlength : 50
    },
    position :{
        type : String,
        require : [true, 'Please provide postion'],
        maxlength : 100
    },
    status : {
        type : String,
        enum : ['interview', 'declined', 'pending'],
        default : 'pending'
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : [true, 'User is required']
    }
},
{
    timestamps : true
}
)

module.exports = mongoose.model('Job', JobSchema)