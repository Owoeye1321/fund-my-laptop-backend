const uploadDetails = require('../model/uploadModel')

const readMyController = (req, res) => {
  //console.log(req.user)
  const email = req.user.email
  // console.log(email)
  uploadDetails.find({ email: email }, (error, result) => {
    if (!result)
      return res.json({ status: 403, message: 'unable to fetch data' })
    return res.json(result)
  })
}

const readAllController = async (req, res) => {
  const allData = await uploadDetails.find()
  if (!allData) return res.sendStatus(403)
  return res.json({
    status: 'success',
    message: allData,
  })
}

const readProfileDetailsController = async (req, res) => {
  if (!req.user)
    return res.json({
      status: 401,
      message: 'Invalid user or token',
    })

  res.send(req.user.email)
}

module.exports = {
  readMyController,
  readAllController,
  readProfileDetailsController,
}
