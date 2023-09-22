const express = require('express')
const multer = require('multer')
const userRoute = express()
const upload = multer({dest : './file'})
const userController = require('../controllers/userController')

userRoute.post('/register' , userController.register)
userRoute.get('/user' , userController.getUser)
userRoute.post('/logout' , userController.logout)
userRoute.post('/login' , userController.login)
userRoute.post('/image' , upload.single('image') ,  userController.uploadImage)

module.exports = userRoute