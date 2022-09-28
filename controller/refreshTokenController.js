if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY
const authentication = require('../model/authenticationModel')
const jwt = require('jsonwebtoken')
const refreshTokenController = (req, res) => {
  if (!authorizationHeader) return res.sendStatus(4001)
  const refreshToken = authorizationHeader.split(' ')[1]
  if (!refreshToken) return res.sendStatus(401)
  authentication.findOne({ refreshToken: refreshToken }, (error, result) => {
    if (error) return res.sendStatus(401)
    console.log(result)
    const payload = {
      username: result.username,
      email: result.email,
      password: result.password,
    }
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: '1d',
    })
    return res.json({
      status: 200,
      message: accessToken,
    })
  })
}

module.exports = refreshTokenController
