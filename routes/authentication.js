const router = require('express').Router()
const authentication = require('../controller/user-controller')

router.post('/login', authentication.login)
router.post('/signup', authentication.signup)
module.exports = router
