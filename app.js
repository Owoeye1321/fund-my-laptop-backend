const client = require('./controller/client')
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 6000
const app = express()

app.use(express.static(path.resolve('./public')))
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/auth', require('./routes/authentication'))
app.use('/api/newUpload', require('./routes/uploadDetails'))
app.use('/api/read', require('./routes/readDetails'))
app.use('/api/token', require('./routes/refreshToken'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/', 'index.html'))
})

app.all('*', (req, res) => {
  res.send('Hello there, you seem to be lost on this server')
})

app.listen(PORT, () => {
  console.log('listening to port ', PORT)
})
