const router = require('express').Router()
const contactController = require('../controller/contact-controller')
router.post('/contact', contactController)
module.exports = router
