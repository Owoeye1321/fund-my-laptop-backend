if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY

const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
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
      email: result.email,
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
  authentication.exists({ email: email }, (error, result) => {
    if (result) return res.sendStatus(403)

    if (
      !validator.isLength(username, { min: 3, max: 50 }) &&
      !validator.isEmail(email) &&
      !validator.isLength(password, { min: 8, max: 50 })
    ) {
      return res.sendStatus(401)
    }
    const payload = {
      username: username,
      email: email,
      password: password,
    }
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: '30s',
    })
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY)

    const saveAuthentication = new authentication({
      username: payload.username,
      email: payload.email,
      password: payload.password,
      rerefreshToken: refreshToken,
    })

    saveAuthentication
      .save()
      .then((result) => {
        return res.json({
          status: '200',
          data: result,
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
      })
      .catch((error) => {
        return res.json({
          status: '500',
          error: error,
        })
      })
  })
}

module.exports = {
  login,
  signup,
}
