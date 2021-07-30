const express =require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDb = require('./config/db')
const passport = require('passport')
const bodyParser =require('body-parser')
const connectDB = require('./config/db')
const routes = require('./routes')

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'))
}
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(routes);
app.use(passport.initialize());
require('./config/passort')(passport);

app.listen(PORT,console.log('Srever running in %s mode on port %d',process.env.NODE_ENV,PORT)) 