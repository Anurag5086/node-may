const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization // Bearer <token>

        if(!authHeader || !authHeader.startsWith('Bearer')){
            res.status(401).json({ sucess: false, message: "Unauthorized!"})
        }

        const token = authHeader.split(" ")[1]
        if(!token){
            res.status(401).json({ success: false, message: "Unauthorized!"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(err){
        res.status(401).json({ success: false, message: "Unauthorized!" })
    }
}