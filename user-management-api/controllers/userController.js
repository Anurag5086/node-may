const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

exports.registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        const schema = Joi.object({
            name: Joi.string().min(3).max(50).required(),
            email: Joi.string().email().required(),
            password: Joi.string().regex('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/').required(),
        });

        const { error } = schema.validate({
            name, email, password
        })
        if(error){
            res.status(400).json({success: false, message: "Please send fields in correct format!", error})
        }

        let user = await User.findOne({email})
        if(user){
            res.status(400).json({success: false, message: 'User already exists, please enter a new email id.'})
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALTS))

        user = new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save()

        res.status(201).json({success: true, message: "User registered successfully!"})
    }catch(err){
        res.status(500).json({success: false, message: "Internal Server Error!"})
    }
}

exports.loginuser = async (req, res) => {
    try{
        const { email, password } = req.body

        if(!email || !password){
            res.status(400).json({success: false, message: "All fields required!"})
        }

        let user = await User.findOne({ email })
        if(!user){
            res.status(400).json({success: false, message: 'User not found! Please register!'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(400).json({success: false, message: 'Invalid password!'})
        }

        const token = jwt.sign({
            userId: user._id,
            name: user.name,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '1d'})

        res.status(200).json({ success: true, message: "Logged In Successfully!", token})
    }catch(err){
        res.status(500).json({success: false, message: "Internal Server Error!"})
    }
}

exports.getUser = async (req, res) => {
    try{
        const userId = req.user.userId

        const user = await User.findById(userId).select('-password')

        if(!user){
            res.status(400).json({ success: false, message: "User not found!"})
        }

        res.status(200).json({ success: true, message: "User fetched successfully!", user})
    }catch(err){
        res.status(500).json({success: false, message: "Internal Server Error!"})
    }
}

exports.updateUser = async (req, res) => {
    try{
        const userId = req.user.userId

        const user = await User.findById(userId)
        if(!user){
            res.status(400).json({ success: false, message: "User not found!"})
        }

        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true })

        res.status(200).json({ success: true, message: "User updated successfully!", updatedUser})
    }catch(err){
        res.status(500).json({success: false, message: "Internal Server Error!"})
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const userId = req.user.userId

        const user = await User.findById(userId)
        if(!user){
            res.status(400).json({ success: false, message: "User not found!"})
        }

        await User.findByIdAndDelete(userId)

        res.status(200).json({ success: true, message: "User deleted successfully!"})
    }catch(err){
        res.status(500).json({success: false, message: "Internal Server Error!"})
    }
}

