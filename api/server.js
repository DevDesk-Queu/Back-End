const express = require('express')
require('dotenv').config()

const authRouter = require('../auth/auth-router.js')
const server = express()

server.use(express.json())

server.use('/api/auth', authRouter)
// server.use('/api/users')
// server.use('/api/tickets')

server.get('/', (req, res) => {
    res.status(200).json({ api:'up' })
})

module.exports = server