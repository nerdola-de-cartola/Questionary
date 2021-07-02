const express = require('express')
const questionController = require('./controllers/question-controller')

const route = express.Router()

route.get('/', (req, res) => res.render('index', {page: 'enter-room'}))
route.get('/create-pass', (req, res) => res.render('index', {page: 'create-pass'}))

route.get('/room', (req, res) => res.render('room'))

route.post('/room/:room/:question/:action', questionController.index)

module.exports = route