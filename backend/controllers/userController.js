const User = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {

        const { name, email, password } = req.body
        const hashedpass = await bcrypt.hash(password, 10)

        const existEmail = await User.findOne({ email: email })
        if (existEmail) {
            return res.status(400).send({ message: 'Email is already registered' })
        }

        const user = new User({
            name: name,
            email: email,
            password: hashedpass
        })

        const userData = await user.save()

        // JWT Token
        const _id = await userData.toJSON()
        const token = jwt.sign({ _id: _id }, "secret")

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({ message: "Success" })

    } catch (err) {
        console.log(err);
    }
}

const getUser = async (req , res) => {
    try {

        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie , "secret")

        if(!claims) {
            return res.status(200).send({ message : "unathenticated"})
        }

        const userData = await User.findOne({ _id : claims._id })
        const { password , ...data } = await userData.toJSON() 

        res.send(data)
        
    } catch (err) {
        res.status(401).send({ message : "unauthenticated" })
    }
}

const login = async (req , res) => {
    try {

        let user = await User.findOne({ email : req.body.email })

        if(!user) {
            return res.status(404).send({ message : "user not found" })
        }

        let orgPass = await bcrypt.compare(req.body.password , user.password)

        if(!orgPass) {
            return res.status(400).send({ message : "email or password incorrect" })
        }

        const token = jwt.sign({ _id : user._id } , "secret")

        res.cookie("jwt" , token , {
            httpOnly : true,
            maxAge : 24*60*60*1000
        })

        res.send({ message : "Success"})
        
    } catch (err) {
        res.status(500).send('Internal Error')
    }
}

const logout = async (req , res) => {
    try {

        res.cookie("jwt" , "" , { maxAge : 0 })

        res.send({ message : "Success" })

        
    } catch (err) {
        res.status(500).send({ message : 'Internal Error' })
    }
}

const uploadImage = async (req , res) => {
    try {

        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie , "secret")

        if(!claims) {
            return res.status(401).send({ message : "Unauthorized" })
        }

        const imageUpdated = await User.updateOne({ _id : claims._id } , { $set : { image : req.file.filename }})

        if(imageUpdated){
            return res.status(200).send({ message : "Uploaded successfully" })
        }else{
            return res.status(500).send({ message : "Something went wrong" })
        }
        
    } catch (err) {
        res.status(500).send({ message : 'Internal Error' })
    }
}

module.exports = {
    register,
    getUser,
    logout,
    login,
    uploadImage
}