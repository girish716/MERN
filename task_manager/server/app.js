const Express = require("express");
const cors  = require('cors')
const tasks = require("./routers/tasks");
const notFound = require("./middlware/notfound");
const middlewareErrorHandler = require("./middlware/middlewareErrorHandler");
const connectDB = require("./DB/connect");
require('dotenv').config();
const app = Express();

//security pakages
//extra security pakagaes
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const PORT = process.env.PORT || 5000;


app.set('trust proxy', 1);
app.use(rateLimiter(
    {
        windowMs : 15 * 60 *1000, // 15 minutes
        max : 100 // limit each IP to 100 requests per windowMs
    }
))
app.use(helmet()) // Helmet.js  comes with a collection of Node modules that you can use to interface to Express to increase the HTTP header security.
app.use(cors(
    {
        origin: process.env.ORIGIN || '*',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        preflightContinue: false
    }
))
app.use(xss()) //  it helps us from malicious attacks like cross site scripting by sanitizing the data in body, params, inputs 



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