const Router = require('express')
const router = new Router()
const controller = require('./authController')

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/users', controller.getUserInformation)


module.exports = router