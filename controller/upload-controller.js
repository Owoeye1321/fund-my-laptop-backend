const uploadDetails = require('../model/uploadModel')
const path = require('path')
const fs = require('fs')

const uploadController = (req, res) => {
  console.log(req.file)
  const data = JSON.parse(req.body.data)
  // const data = req.body.data
  //const data = req.body
  if (!data)
    return res.json({
      status: 403,
      message: 'Unable to get user data',
    })
  //console.log(data)
  const name = data.name
  const address = data.address
  const details = data.details
  // fetch the file extension
  //console.log(details)
  const extensionName = path.extname(req.file.filename)
  const allowedExtension = ['.png', '.jpg', '.jpeg']
  if (!allowedExtension.includes(extensionName)) return res.sendStatus(4003)
  if (req.file.size > 50 * 1024) return res.sendStatus(403)
  const addingNewUploades = new uploadDetails({
    name: name,
    address: address,
    details: details,
    image: {
      data: fs.readFileSync(path.resolve('./public/' + req.file.filename)),
      contentType: 'image/png',
    },
    email: req.user.email,
  })
  //console.log(addingNewUploades.details)
  addingNewUploades
    .save()
    .then((result) => {
      return res.json({
        status: 200,
        message: 'success',
      })
    })
    .catch((error) => {
      return res.json({
        status: 501,
        message: 'An error has occured',
      })
      console.log(error)
    })
}

module.exports = uploadController
