if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const clientId = process.env.client_id
const client_secret = process.env.client_secret
const token_uri = process.env.token_uri

const router = require('express').Router()
const nodemailer = require('nodemailer')
const authenticate_user = require('../model/authenticationModel')

router.post('/', async (req, res) => {
  // console.log(req.body)

  if (req.body.email) {
    async function main() {
      const email = req.body.email
      const response = await authenticate_user.findOne({ email: email })
      if (response) {
        //  console.log(response)
        // create reusable transporter object using the default SMTP transport
        let transporter = await nodemailer.createTransport(
          {
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: 'owoeye1321@gmail.com',
              pass: 'Owoeye1234',
              clientId: clientId,
              clientSecret: client_secret,
              refreshToken: token_uri,
            },
          },
          (err, result) => {
            if (!err) console.log(result)
            console.log(err)
          },
        )
        // send mail with defined transport object
        transporter.sendMail(
          {
            from: 'Owoeye1321@gmail.com',
            to: response.email,
            subject: 'Forget Password Reset',
            html: `<h1>Hello ${response.username}, </h1> \n <h5>Your password is ${response.password} </h5>`, // plain text body
          },
          (err, result) => {
            if (!err) {
              console.log('working on sending the emails')
              //  console.log(result);
              res.send('success')
            } else {
              res.send('failed')
              console.log(
                'An error has occured and an issue need to be fixed',
                err,
              )
            }
          },
        )
      } else {
        res.send('failed')
        console.log('Unable to send email details')
      }
    }

    main().catch(console.error)
  } else {
    res.send('error')
    console.log('No email specified')
  }
})

module.exports = router
