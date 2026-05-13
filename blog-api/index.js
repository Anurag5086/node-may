const express = require('express');
const app = express();
require('dotenv').config()

const blogRoutes = require('./routes/blogRoutes')

app.use(express.json())
app.use('/api', blogRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})