if (process.env.NODE_ENV !== 'production') require('dotenv')

const clientId = process.env.client_id
const client_secret = process.env.client_secret
const token_uri = process.env.token_uri

const nodemailer = require('nodemailer')

const contact = (req, res) => {
  console.log(req.body)
  if (req.body) {
    async function main() {
      const fname = req.body.data.fname
      const email = req.body.data.email
      const subject = req.body.data.subject
      const message = req.body.data.message

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
          from: email, // sender address
          to: 'Owoeye1321@gmail.com', // list of receivers
          subject: subject, // Subject line
          html: `<h1>Hello,</h1> <h5>I'm ${fname} </h5> \n <h6>${message}</h6>`, // plain text body
        },
        (err, result) => {
          if (!err) {
            console.log('working on sending the emails')
            console.log(result)
            res.send('success')
          } else {
            console.log('An error has occured and an issue need to be fixed')
            console.log(err)
          }
        },
      )
    }
    main().catch(console.error)
  } else {
    res.send('error')
    console.log('Invalid parameter')
  }
}

module.exports = contact
