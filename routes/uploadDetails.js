const router = require('express').Router()
const uploadController = require('../controller/upload-controller')
const verifyJwt = require('../middleware/verify-jwt')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('./public'))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })

router.post('/upload', verifyJwt, upload.single('file'), uploadController)

module.exports = router
