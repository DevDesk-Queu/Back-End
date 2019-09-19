
const Tickets = require('./tickets-model.js')

const router = require('express').Router()

router.get('/', (req, res) => {
    Tickets.findTickets()
        .then(tickets => {
            res.status(200).json(tickets)
        })
        .catch(err => {
            res.status(500).json({
                message: 'there was an error getting the tickets'
            })
        })
})

module.exports = router