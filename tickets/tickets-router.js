
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

router.post('/', requireUserId, (req, res) => {
    const ticketInfo = {...req.body}
    Tickets.addTicket(ticketInfo)
        .then(ticket => {
            res.status(201).json(ticket)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'there was an error adding the ticket'
            })
        })
})

function requireUserId(req, res, next) {
    if (!req.body.user_id) {
        res.status(500).json({
            message: 'a user_id is required'
        })
    } else {
        next()
    }
}
module.exports = router