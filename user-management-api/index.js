const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const userRoutes = require('./routes/userRoutes')

app.use(express.json())
app.use('/api', userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log("Failed to connect to MongoDB", err))

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`)
})