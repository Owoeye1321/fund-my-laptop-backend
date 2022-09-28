const authentication = require('../model/authenticationModel')
const logOut = (req, res) => {
  const authorizationHeader = req.headers['authorization']
  if (!authorizationHeader) return res.sendStatus(401)
  const refreshToken = authorizationHeader.split(' ')[1]
  if (!refreshToken) return res.sendStatus(401)
  authentication.findOne({ refreshToken: refreshToken }, (error, result) => {
    if (error) return res.sendStatus(401)
    authentication
      .updateOne(
        { email: result.email },
        {
          $set: {
            refreshToken: '',
          },
        },
      )
      .then((newResult) => {
        res.send('success')
        console.log('deleted refresh token')
      })
      .catch((newError) => {
        res.send('error')
        console.log('unable to delete data')
      })
  })
}
module.exports = logOut
