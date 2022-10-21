const express = require('express')
const connectToMongo = require('./db')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')

// const companyRoute = require('./routes/company')
const studentRoute = require('./routes/student')

// -----------------Middle wares ---------------
app.use(express.json())
app.use(cors())
dotenv.config()


//  --------------Routes---------------
app.use('/api/student', studentRoute)


// -----------------Listing to port ---------------
app.listen(process.env.PORT, () => {
    console.log('The backend server is running successfully!!')
})