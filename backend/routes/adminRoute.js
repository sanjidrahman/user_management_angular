const express = require('express')
const adminRoute = express()
const adminController = require('../controllers/adminController')


adminRoute.post('/login' , adminController.login)
adminRoute.get('/admin' , adminController.getAdmin)
adminRoute.get('/users' , adminController.getAllUsers)
adminRoute.post('/search' , adminController.search)
adminRoute.post('/delete/:id' , adminController.deleteUser)
adminRoute.post('/add-user' , adminController.addUser)
adminRoute.post('/edit/:id' , adminController.editGetUser)
adminRoute.post('/edit' , adminController.editUser)
adminRoute.post('/logout' , adminController.logout)

module.exports = adminRoute