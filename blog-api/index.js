const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()

const blogRoutes = require('./routes/blogRoutes')

app.use(express.json())
app.use('/api', blogRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log("Failed to connect to MongoDB", err))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})