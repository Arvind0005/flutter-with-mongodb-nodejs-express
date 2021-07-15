const mongoose  = require('mongoose')
const dbConfig = require('./dbConfig')

const connectDB = async() => 
{
    try
    {
        const conn = await mongoose.connect(dbConfig.database,
        {
            useNewUrlParser: true,
            useFindAndModify: false,
           useUnifiedTopology: true,
        })
        console.log('MongoDB Connected: %s',conn.connection.host)

    }
    catch(err)
    {
        console.log(err)
        process.exit(1)
    }
    
}

module.exports = connectDB