const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            res.status(400).json({success: false, message: "All fields required!"})
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

