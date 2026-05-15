const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        trim: true,
        unique: [true, "Email already exisits!"],
        lowercase: true,
        match: ['/^[^\s@]+@[^\s@]+\.[^\s@]+$/', "Invalid Email!"]
    },
    password: {
        type: String,
        required: true,
        match: ['/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/', "Passowrd must be at least 8 characters with atleast 1 upper case, 1 lower case, 1 number and 1 special character!"]
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, { timestamps: true})

module.exports = mongoose.model('users', userSchema)