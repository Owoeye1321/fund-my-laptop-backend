const verifyjwt = require('../middleware/verify-jwt')
const uploadDetails = require('../model/uploadModel')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('./public'))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })

const uploadController =
  (verifyjwt,
  (req, res) => {
    const email = req.user.email
  })
