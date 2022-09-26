const router = require('express').Router()
const verify = require('../middleware/verify-jwt')
const readController = require('../controller/read-controller')

router.get('/personal', verify, readController.readMyController)
router.get('/all', readController.readAllController)
module.exports = router
