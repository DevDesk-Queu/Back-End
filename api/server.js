const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const authRouter = require('../auth/auth-router.js')
const usersRouter = require('../users/users-router.js')
const ticketsRouter = require('../tickets/tickets-router.js')
const commentsRouter = require('../comments/comments-router.js')
const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(methodLogger)

server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)
server.use('/api/tickets', ticketsRouter)
server.use('/api/comments', commentsRouter)
// server.use('/api/tickets')

server.get('/', (req, res) => {
    res.send(`
    <h2>DevDesk API<h2>
    `)
})

// Logging middleware, logs all methods passed to db
function methodLogger(req, res, next){
    console.log(` A ${req.method} Request was made to ${req.url}, it returned a status code of ${res.statusCode}`)
    next()
  }
module.exports = server