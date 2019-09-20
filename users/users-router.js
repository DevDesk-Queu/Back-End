

const router = require('express').Router()
const Users = require('./users-model.js')
const Tickets = require('../tickets/tickets-model.js')

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})

router.get('/:id', checkId, (req, res) => {
    res.status(200).json(req.user)
})

router.delete('/:id', checkId, (req, res) => {
    Users.remove(req.params.id)
        .then(count => {
            if(count > 0) {
                res.status(200).json({
                    message: 'there user was deleted successfully'
                })
            } else {
                res.status(500).json({
                    message: 'the user could not be deleted'
                })
            }
        })
        .catch(err => {
            console.log('deleting err', err)
            res.status(500).json({
                message: 'there was an error delelting the user'
            })
        })
})

router.put('/:id', checkId, (req, res) => {
    Users.update(req.params.id, req.body)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({
                    message: 'the user could not be updated'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'there was an error updating the user'
            })
        })
})

// endpoint to retrieve tickets based on user id
router.get('/:id/tickets', checkId, (req, res, next) => {
    Users.findTicketsByUser(req.params.id)
        .then(tickets => {
            res.status(200).json(tickets)
        })
        .catch(err => {
            res.status(500).json({
                message: 'there was an error getting the tickets'
            })
        })
})

// endpoint to add new ticket to a user
router.post('/:id/tickets', (req, res) => {
    const ticketInfo = {...req.body, user_id: req.params.id}
    Tickets.addTicket(ticketInfo)
        .then(ticket => {
            res.status(201).json(ticket)
        })
        .catch(err => {
            console.log('ticket creation error:', err)
            res.status(500).json({
                message: 'there was an error adding the ticket'
            })
        })
})

// *------- MIDDLEWARE FUNCTIONS ------------* //
function checkId(req, res, next) {
    const { id } = req.params
    Users.findById(id)
        .then(user => {
            if(user) {
                req.user = user
                next()
            } else {
                res.status(404).json({
                    message: 'there is no user with the given id'
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