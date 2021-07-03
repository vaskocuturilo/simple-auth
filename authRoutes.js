const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')

router.post('/register', [
    check('username', 'The username field cannot is empty').notEmpty(),
    check('password', 'The password field cannot is empty').notEmpty(),
    check('password', 'The password length must be min 4, but not max 8 elements.').isLength({min: 4, max: 8}),
    check('name', 'The name field cannot is empty').notEmpty()
], controller.register)
router.post('/login', controller.login)
router.get('/users', authMiddleware, controller.getUserInformation)
router.get('/profile', authMiddleware, controller.getUserProfile)


module.exports = router