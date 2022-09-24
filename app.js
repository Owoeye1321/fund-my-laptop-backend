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

app.use('/auth', require('./routes/authentication'))
app.use('/upload', require('./routes/uploadDetails'))

app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, './public/', 'index.html'))
  res.send('hello world')
})

app.all('*', (req, res) => {
  res.send('Hello there, you seem to be lost on this server')
})

app.listen(PORT, () => {
  console.log('listening to port ', PORT)
})
