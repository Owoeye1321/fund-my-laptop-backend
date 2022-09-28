if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY

const jwt = require('jsonwebtoken')

const verifyJwt = async (req, res, next) => {
  const authorizationHeader = req.headers['authorization']
  if (!authorizationHeader)
    return res.json({
      status: 401,
      message: 'empty token',
    })
  const accessToken = authorizationHeader.split(' ')[1]
  if (!accessToken)
    return res.json({
      status: 401,
      message: 'unauthorized',
    })
  jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY, (err, result) => {
    if (!result)
      return res.json({
        status: 403,
        message: 'unauthorized',
      })
    //console.log(result)
    req.user = result
    next()
  })
}

module.exports = verifyJwt
