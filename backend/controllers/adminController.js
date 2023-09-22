const User = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config();



const credentials = {
    adminid: process.env.adminid,
    adminemail: process.env.adminemail,
    adminpass: process.env.adminpass
}

const login = async (req, res) => {
    try {

        let { email, password } = req.body
        if (credentials.adminemail == email) {
            if (credentials.adminpass == password) {
                const token = jwt.sign({ _id: credentials.adminid }, 'adminsecret')
                res.cookie('jwtAdmin', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                })
                res.send({ message: 'success' })
            } else {
                res.status(401).send({ message: 'email or password incorrect' })
            }
        } else {
            res.status(401).send({ message: 'email or password incorrect' })
        }

    } catch (err) {
        res.status(500).res.send({ message: 'internal error' })
    }
}

const getAdmin = async (req, res) => {
    try {



    } catch (err) {
        res.status(500).send({ message: 'internal error' })
    }
}

const getAllUsers = async (req, res) => {
    try {

        const allUsers = await User.find({})
        res.json(allUsers)

    } catch (err) {
        res.status(500).send({ message: 'internal error' })
    }
}

const search = async (req, res) => {
    try {

        const { name } = req.body
        const users = await User.find({ name: { $regex: name, $options: "i" } })

        if (users.length > 0) {
            res.status(200).send(users)
        } else {
            res.status(404).send({ message: 'not found' })
        }

    } catch (err) {
        res.status(500).send({ message: 'internal error' })
    }
}

const logout = async (req, res) => {
    try {

        res.cookie('jwtAdmin', '', { maxAge: 0 })
        res.send({ message: 'internal error' })

    } catch (err) {
        res.status(500).send({ message: 'internal error' })
    }
}

const deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.deleteOne({ _id: req.params.id });
        if (!deleteUser) {
            res.send({
                message: "Deletion went wrong",
            });
        }
        res.send(deleteUser);
    } catch (error) { }
};

const editGetUser = async (req , res) => {
    try {

        const userData = await User.findOne({ _id: req.params.id });
        if(!userData) {
            res.send({ message: "Something went wrong" });
        }

        const { password, ...data } = await userData.toJSON();
        res.send(data);
        
    } catch (err) {
        res.status(500).send({ message: 'internal error' })
    }
}

const editUser = async (req, res) => {
    try {

        const { name, email } = req.body
        let edittedUser = await User.updateOne({ email: email }, { $set: { name: name } })

        res.send({ message: 'success' })

    } catch (err) {
        res.status(500).send({ message: 'internal error' })
    }
}

const addUser = async (req, res) => {
    try {

        const { name, email, password } = req.body
        const hashpass = await bcrypt.hash(password, 10)

        const existEmail = await User.findOne({ email: email })
        if (existEmail) {
            return res.status(400).send({ message: 'Email is already registered' })
        }

        const user = new User({
            name: name,
            email: email,
            password: hashpass
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
        res.send({ message: 'internal error' })
    }
}


module.exports = {
    login,
    getAdmin,
    getAllUsers,
    search,
    logout,
    deleteUser,
    editUser,
    addUser,
    editGetUser
}