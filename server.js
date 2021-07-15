const express =require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDb = require('./config/db')
const passport = require('passport')
const bodyParser =require('body-parser')
const connectDB = require('./config/db')


connectDB()

const app = express()

if (process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'))
}
const PORT = process.env.PORT || 3000

app.listen(PORT,console.log('Srever running in %s mode on port %d',process.env.NODE_ENV,PORT)) 