const Express = require("express");
const cors  = require('cors')
const tasks = require("./routers/tasks");
const notFound = require("./middlware/notfound");
const middlewareErrorHandler = require("./middlware/middlewareErrorHandler");
const connectDB = require("./DB/connect");
require('dotenv').config();
const app = Express();

const PORT = process.env.PORT || 5000;

app.use(
    cors({
      origin: "https://task-manager.girishdama.com/",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false
    })
)

app.options('*', cors())

//app.options('*', cors())

// whithout this middleware you will not have access to body in the responce object
app.use(Express.json()); 

// middleware for tasks route
app.use("/api/v1/tasks", tasks);

// middleware to respond custom message, when user looks for path which dosent exist 
app.use(notFound)

// middleware to handle errors, this middleware will be triggered when ever
// we call next function by passing error to it
app.use(middlewareErrorHandler)


const start = async ()=>{
    try{
        //here we are starting server only when we are able to fetch data from DB
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>{
            console.log(`Server is listening on port ${PORT}....`)
        });
    }
    catch(err){
        console.log(err);
    }
}

start();

module.exports = app