const express = require('express')
require('dotenv').config()

const server = express()

server.use(express.json())
// server.use('/api/users')
// server.use('/api/tickets')

server.get('/', (req, res) => {
    res.status(200).json({ api:'up' })
})

module.exports = server