const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const saltRounds = 7
const {secret} = require('./config')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: '2h'})
}

class authController {
    async register(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Registration for a new user has an error.', errors})

            }
            const {username, password, name} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: 'A user with this username exists.'})
            }
            const hashPassword = bcrypt.hashSync(password, saltRounds)
            const userRole = await Role.findOne({value: "USER"})
            const newUser = new User({username, password: hashPassword, roles: [userRole.value], name})
            await newUser.save()
            return res.status(200).json({message: 'New user registration is a success.'})
        } catch
            (e) {
            console.log(e)
            res.status(400).json({message: 'Registration for a new user has an error.'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const regUser = await User.findOne({username})
            if (!regUser) {
                return res.status(400).json({message: 'The user ' + regUser + ' not found in the database.'})
            }
            const validatePassword = bcrypt.compareSync(password, regUser.password)
            if (!validatePassword) {
                return res.status(400).json({message: 'The password for user ' + regUser + ' not valid.'})
            }
            const token = generateAccessToken(regUser._id, regUser.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error.'})
        }
    }

    async getUserInformation(req, res) {
        try {
            const users = await User.find().select('-password')
            return res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    async getUserProfile(req, res) {
        try {
            const {username} = req.query
            const users = await User.findOne({username}).select('-roles').select('-password')
            return res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    async removeUser(req, res) {
        try {
            const {username} = req.query
            const users = await User.findOne({username})
            if (!users) {
                return res.status(400).json({message: 'The user not found in the database.'})
            }
            const removeUser = await User.findByIdAndDelete(users.id)
            return res.json(removeUser)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()