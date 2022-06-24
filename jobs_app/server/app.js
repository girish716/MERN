require('dotenv').config()
require('express-async-errors')

//extra security pakagaes
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express  = require('express')
const app = express()
const PORT = process.env.PORT || 5000

//authenticate middleware
const authenticate = require('./middleware/authentication')

//error handlers
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//rotes
const authRoters = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

//DB
const connectDB = require('./db/connect')

// this middleware allow us to access body from the res object
app.use(express.json())

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

//rotes
app.use("/api/v1/auth", authRoters)
app.use("/api/v1/jobs", authenticate, jobsRouter)

app.use(notFoundMiddleware)
// below middleware will be triggered when ever 'express-async-error' library triggers next function by passing error object it.
app.use(errorHandlerMiddleware) 


const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT,()=>{
            console.log(`server is listening at port ${PORT}...`)
        }) 
    } catch (error) {
        console.log(error)
    }
}

start()

module.exports = app