const User = require('./models/User')
const Role = require('./models/Role')

class authController {

    async register(req, res) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async getUserInformation(req, res) {
        try {
            res.json('Server return all users.')
        } catch (e) {
            console.log(e)
        }
    }
}


module.exports = new authController()