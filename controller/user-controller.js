if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY

const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authentication = require('../model/authenticationModel')

const login = (req, res) => {
  console.log(req.body)
  const username = req.body.data.username
  const password = req.body.data.password
  //checking if a user exist
  authentication.findOne({ username: username }, async (error, result) => {
    if (error) return res.sendStatus(401)
    const isMatch = await bycrypt.compare(password, result.password)
    if (!isMatch) return res.sendStatus(403)
    const payload = {
      username: username,
      password: result.password,
    }
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: '30s',
    })
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY)
    res.json({
      status: 'success',
      accessToken: accessToken,
      refreshToken: refreshToken,
    })
  })
}

const signup = (req, res) => {
  const username = req.body.data.username
  const email = req.body.email
  const password = req.body.data.password
  authentication.exists({ username: email })
}

module.exports = {
  login,
}
