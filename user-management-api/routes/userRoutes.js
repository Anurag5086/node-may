const express = require('express')
const { registerUser, loginuser, getUser, updateUser, deleteUser } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginuser)

router.get('/user', authMiddleware, getUser)
router.put('/user', authMiddleware, updateUser)
router.delete('/user',authMiddleware,  deleteUser)

module.exports = router