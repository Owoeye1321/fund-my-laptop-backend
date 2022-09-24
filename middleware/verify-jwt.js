if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY

const jwt = require('jsonwebtoken')

const verifyJwt = async (req, res, next) => {
  const authorizationHeader = req.headers['authorization']
  const accessToken = authorizationHeader.split(' ')[1]
  if (!accessToken) return res.sendStatus(401)
  jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY, (err, result) => {
    if (err) return res.sendStatus(403)
    req.user = result
    next()
  })
}

module.exports = verifyJwt
