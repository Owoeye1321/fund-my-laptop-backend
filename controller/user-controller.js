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
    if (error) {
      return res.json({
        status: 401,
        message: 'Invalid username or password ',
      })
    } else {
      console.log(result)
      const result_password = result.password
      const isMatch = await bycrypt.compare(password, result_password)
      if (!isMatch) {
        return res.json({
          status: 403,
          message: 'Invalid username or password',
        })
      } else {
        const payloadToRefresh = {
          username: result.username,
          email: result.email,
          password: result_password,
        }
        const refreshToken = jwt.sign(
          payloadToRefresh,
          REFRESH_TOKEN_SECRET_KEY,
        )
        const payloadToAccessToken = {
          username: payloadToRefresh.username,
          email: payloadToRefresh.email,
          password: payloadToRefresh.password,
          refreshToken: refreshToken,
        }
        const accessToken = jwt.sign(
          payloadToAccessToken,
          ACCESS_TOKEN_SECRET_KEY,
          {
            expiresIn: '1d',
          },
        )
        authentication.updateOne(
          { email: payloadToRefresh.email },
          { $set: { refreshToken: refreshToken } },
          (errorRefreshing, resultRefreshing) => {
            if (!resultRefreshing) return res.sendStatus(403)
            res.json({
              status: '200',
              message: 'success',
              accessToken: accessToken,
              refreshToken: refreshToken,
            })
          },
        )
      }
    }
  })
}

//Sign up controller

const signup = (req, res) => {
  console.log(req.body)
  const saltRounds = 10
  const username = req.body.data.username
  const email = req.body.data.email
  const password = req.body.data.password
  authentication.exists({ email: email }, (error, result) => {
    if (result) {
      return res.json({
        status: 403,
        message: 'User exist',
      })
    } else {
      if (
        validator.isLength(username, { min: 3, max: 50 }) &&
        validator.isEmail(email) &&
        validator.isLength(password, { min: 8, max: 50 })
      ) {
        bycrypt.hash(password, saltRounds, (err, hash) => {
          // Store hash in your password DB.
          if (err) {
            return res.json({
              status: 403,
              message: 'Unable to hash password',
            })
          } else {
            console.log('Password is :' + hash)

            const payloadToRefresh = {
              username: username,
              email: email,
              password: hash,
            }
            const refreshToken = jwt.sign(
              payloadToRefresh,
              REFRESH_TOKEN_SECRET_KEY,
            )
            const payloadToAccessToken = {
              username: username,
              email: email,
              password: hash,
              refreshToken: refreshToken,
            }
            const accessToken = jwt.sign(
              payloadToAccessToken,
              ACCESS_TOKEN_SECRET_KEY,
              {
                expiresIn: '1d',
              },
            )

            const saveAuthentication = new authentication({
              username: payloadToAccessToken.username,
              email: payloadToAccessToken.email,
              password: payloadToAccessToken.password,
              refreshToken: payloadToAccessToken.refreshToken,
            })

            saveAuthentication
              .save()
              .then((result) => {
                console.log(result)
                return res.json({
                  status: '200',
                  message: 'success',
                  data: result,
                  accessToken: accessToken,
                  refreshToken: refreshToken,
                })
              })
              .catch((error) => {
                return res.json({
                  status: '403',
                  message: 'An error has occured',
                  error: 'An error  has occured ' + error,
                })
              })
          }
        })
      } else {
        return res.json({
          status: 403,
          message: 'Invalid details',
        })
      }
    }
  })
}

module.exports = {
  login,
  signup,
}
