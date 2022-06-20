const Task = require("../models/Task");
// by using async wrapper we can remove redundant try catch code for all the methods
const asyncWrapper = require("../middlware/asyncWrapper");
const {createCustomError} = require("../errors/CustomError")

const getAllTasks = asyncWrapper(
    async (req,res)=>{
        const tasks = await Task.find({});
        res.status(200).header("Access-Control-Allow-Origin", "*").json({ tasks });
    }
)

const createTask = asyncWrapper( 
    async (req,res)=>{
        const task = await Task.create(req.body)
        res.status(201).header("Access-Control-Allow-Origin", "*").json({task}); // record successfully created
    }
)

const getTask = asyncWrapper( 
    async (req,res,next)=>{
        const {id:taskId} = req.params
         const task = await Task.findOne({_id:taskId});
         if(!task){
             next(createCustomError("no task with the provided ID", 404))
             return
         }
         res.status(200).header("Access-Control-Allow-Origin", "*").json({task});
    } 
)
const updateTask = asyncWrapper( 
    async (req,res,next)=>{
        const {id:taskId} = req.params
        const body = req.body
        const task = await Task.findOneAndUpdate({_id:taskId}, body,{
            runValidators:true, // runs the validators
            new:true // returns the updated date
        });
        if(!task){
            return next(createCustomError(`no task with the provided ID ${taskId}`, 404))
        } 
        res.status(200).header("Access-Control-Allow-Origin", "*").json({task,status:"successfully updated"});
    } 
)
const deleteTask = asyncWrapper( 
    async (req,res,next)=>{
        const {id:taskId} = req.params
        const task = await Task.findOneAndDelete({_id:taskId});
        if(!task){
            next(createCustomError(`no task with the provided ID ${taskId}`, 404))
            return
        }
        res.status(200).header("Access-Control-Allow-Origin", "*").json({task});
    } 
)


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}