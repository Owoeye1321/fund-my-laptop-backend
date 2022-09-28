if (process.env.NODE_ENV !== 'production') require('dotenv')
const pulicKey = process.env.PUBLIC_PAYSTACK_KEY

const router = require('express').Router()
router.get('/', (req, res) => {
  res.send(pulicKey)
})

module.exports = router
