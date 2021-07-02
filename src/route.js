const express = require('express')
const questionController = require('./controllers/question-controller')
const roomController = require('./controllers/room-controller')

const route = express.Router()

route.get('/', (req, res) => res.render('index', {page: 'enter-room'}))
route.get('/create-pass', (req, res) => res.render('index', {page: 'create-pass'}))

route.post('/create-room', roomController.create)
route.get('/room/:room', (req, res) => res.render('room'))

route.post('/question/:room/:question/:action', questionController.index)

module.exports = route