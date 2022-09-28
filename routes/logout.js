const router = require('express').Router()
const logout = require('../controller/logout-controller')
router.get('/', logout)
module.exports = router
