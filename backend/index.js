const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')

const app = express()

app.use(cors({
    credentials : true,
    origin : ['http://localhost:4200']
}))

app.use(cookieParser())
app.use(express.json())

app.use('/api' , userRoute)
app.use('/api/admin' , adminRoute)
app.use('/file', express.static('file'));

mongoose.connect('mongodb://localhost:27017/jwtAngularApp')
.then(() => console.log('mongodb connected'))
.catch(()=> console.log('Something error occured'))

app.listen(4000 , () => console.log('connected'))