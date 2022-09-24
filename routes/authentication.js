const router = require('express').Router()
const authentication = require('../controller/user-controller')

router.post('/', authentication.login)
module.exports = router
