const Job  = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const getAllJobs = async (req,res)=>{
    const { userId} = req.user
    const  jobs = await Job.find({createdBy : userId}).sort('createdAt')
    const count = jobs.length
    res.status(StatusCodes.OK).json({jobs, count})
}

const getJob = async (req,res)=>{
    const { userId } = req.user
    const { id : jobId } = req.params
    const job = await Job.findOne({_id : jobId, createdBy : userId})
    if(!job){
        throw new NotFoundError(`No job with provided ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})

}

const createJob = async (req,res)=>{
    const { userId, name } = req.user
    const job = await Job.create({...req.body, createdBy : userId})
    res.status(StatusCodes.CREATED).json({job})
}

const delJob = async (req,res)=>{
    const { id:jobId } = req.params
    const { userId } = req.user
    const job = await Job.findByIdAndRemove({_id:jobId, createdBy : userId})
    if(!job){
        throw new NotFoundError(`No job with provided ${jobId}`)
    }
    res.status(StatusCodes.OK).send()
}

const updateJob = async (req,res)=>{
    const { userId } = req.user
    const { id : jobId } = req.params
    const { position,  company} = req.body
    if(company==='' || position === ''){
        throw new BadRequestError('Company or Position can not be empty')
    }
    const job = await Job.findByIdAndUpdate({_id:jobId, createdBy : userId}, req.body, {
        new : true,
        runValidators : true 
    })
    if(!job){
        throw new NotFoundError(`No job with provided ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}




module.exports = {getAllJobs, createJob, updateJob, delJob, getJob}