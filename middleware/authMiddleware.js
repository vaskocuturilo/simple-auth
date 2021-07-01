const jwt = require('jsonwebtoken')
const {secret} = require('../config')


module.exports = function (req, res, next) {
    if (req.method == "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[0]
        if (!token) {
            return res.status(401).json({message: 'Unauthorized user.'})
        }
        const decodeToken = jwt.verify(token, secret)
        req.user = decodeToken
        next()
    } catch (e) {
        console.log(e)
        return res.status(401).json({message: 'Unauthorized user.'})
    }
};