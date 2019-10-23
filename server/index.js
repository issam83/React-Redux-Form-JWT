const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const expressServer = express()
const router = require('./route')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb+srv://issam:reggeaton@cluster0-xrlum.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true })
mongoose.connection
.once('open', () => console.log('Connecté a mongoDB', ))
.on('error', error => console.error('Erreur de connection a mongoDB : ',error))

expressServer.use(morgan('combined'))
expressServer.use(bodyParser.json({type: '*/*'}))
expressServer.use(cors())

const port = 3090
const server = http.createServer(expressServer)
router(expressServer)
server.listen(port)
console.log('le serveur écoute sur le port :', port)