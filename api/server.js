const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()

const authRouter = require('../auth/auth-router.js')
const usersRouter = require('../users/users-router.js')
const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)
// server.use('/api/tickets')

server.get('/', (req, res) => {
    res.send(`
    <h2>DevDesk API<h2>
    `)
})

module.exports = server