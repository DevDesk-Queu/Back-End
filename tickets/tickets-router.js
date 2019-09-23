
const router = require('express').Router()
const Tickets = require('./tickets-model.js')
const Comments = require('../comments/comments-model.js')

const restrction = require('../auth/restriction-mw.js')

router.get('/', restrction, (req, res) => {
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

router.get('/:id/comments', [checkId, restrction], (req, res) => {
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

router.post('/', [requireUserId, restrction], (req, res) => {
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

// adds a comment to the ticket
router.post('/:id/comments', [requireUserId, restrction], (req, res) => {
    const comment = {...req.body, ticket_id: req.params.id}
    Comments.addComment(comment)
        .then(comments => {
            res.status(201).json(comments)
        })
        .catch(err => {
            res.status(500).json({
                message: 'there was an error adding the comment'
            })
        })

})

router.delete('/:id', [checkId, restrction], (req, res) => {
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

router.put('/:id', [checkId, requiredBody, restrction], (req, res) => {
    Tickets.updateTicket(req.params.id, req.body)
        .then(ticket => {
            if(ticket) {
                res.status(200).json(ticket)
            } else {
                res.status(404).json({
                    message: 'the ticket could not be updated'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'there was an error updating the ticket'
            })
        })
})

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

function requireUserId(req, res, next) {
    if (!req.body.user_id) {
        res.status(500).json({
            message: 'a user_id is required'
        })
    } else {
        next()
    }
}

function requiredBody(req, res, next) {
    if(!req.body) {
        res.status(500).json({
            message: 'IDK what you are trying to change'
        })
    }
}

module.exports = router