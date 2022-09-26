const router = require('express').Router()
const refreshTokenController = require('../controller/refreshTokenController')

router.get('/refresh', refreshTokenController)
module.exports = router
