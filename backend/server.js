const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// built int http object from node
// const http = require('http')
// displays all methods
// console.log(http.METHODS)
// console.log(http.STATUS_CODES)

const exerciseRouter = require('./routes/exercises')
const userRouter = require('./routes/users')

// loads environment variables from a .env file into process.env.
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000
// app.use allows you to specify a function (middleware) that will run before every request
// app.use passes req, res and next to every function - next is important
app.use(cors())
// parses the body of requests (req.body) into json because often body data may be encoded or binary etc
app.use(express.json())

// connect to mongoAtlas DB using the connection string which we get from mongoAtlas site
const uri = process.env.ATLAS_URI
// useNewUrlParser etc are there to prevent breaking changes, not improtant to know about
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
})
// you can use this then block or connection.open below to handle the promise when the db connects
//   .then(() => console.log("MongoDB connected!"))
//   .catch(err => console.log("Error", err.message));

const connection = mongoose.connection
connection.once('open', () => console.log('MongoDB connected!'))

// define the endpoints of your app, you can have a single endpoint here like /api and pass in a file that contains all routes
app.use('/exercises', exerciseRouter)
app.use('/users', userRouter)

app.listen(port, () => console.log('SERVER RUNNING'))
