const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const EmployeeRoute = require('./routers/employee')
const AuthRoute = require('./routers/auth')
mongoose.connect('mongodb://localhost:27017/logindb', {useNewUrlParser: true,useUnifiedTopology: true})

const db = mongoose.connection

db.on('error',(err)=>{
    console.log(err);
})

db.once('open', () => {
    console.log('Database Connection Established');
})


const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.use('/api/employee', EmployeeRoute)
app.use('/api', AuthRoute)
