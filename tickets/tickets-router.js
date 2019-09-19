
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

router.get('/:id/comments', checkId, (req, res) => {
    Tickets.findCommentsByTicketId(req.params.id)
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(err => {
            console.log('Comments error:', err)
            res.status(500).json({
                message: 'there was an error retrieving the comments'
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

router.delete('/:id', checkId, (req, res) => {
    Tickets.removeTicket(req.params.id)
        .then(count => {
            if(count > 0) {
                res.status(200).json({
                    message: 'Christmas was succesfully cancelled on the ticket'
                })
            } else {
                res.status(500).json({
                    message: 'the ticket will still have Christmas'
                })
            }
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

// *-------MIDDLEWARE --------* //
function checkId(req, res, next) {
    const { id } = req.params
    Tickets.findTickectsById(id)
        .then(ticket => {
            if(ticket) {
                req.ticket = ticket
                next()
            } else {
                res.status(404).json({
                    message: 'there is no ticket with the given id'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'there was an error processing the request'
            })
        })
}
module.exports = router