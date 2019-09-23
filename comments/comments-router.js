
const Comments = require('./comments-model.js')
const restriction = require('../auth/restriction-mw.js')
const router = require('express').Router()

router.get('/', restriction, (req, res) => {
    Comments.findComments()
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(err => {
            res.status(500).json({
                message: 'there was an error retrieving the comments'
            })
        })
})

router.delete('/:id', restriction, (req, res) => {
    Comments.removeComment(req.params.id)
        .then(count => {
            if(count > 0) {
                res.status(200).json({
                    message: 'Christmas was successfully cancelled for this comment'
                })
            } else {
                res.status(500).json({
                    message: 'for some reasons unknown Christmas was not cancelled'
                })
            }
        })
})

router.put('/:id', [requiredBody, restriction], (req, res) => {
    Comments.updateComment(req.params.id, req.body)
        .then(comment => {
            if(comment) {
                res.status(200).json(comment)
            } else {
                res.status(404).json({
                    message: 'the comment could not be updated'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'there was an error updating the comment'
            })
        })
})


function requiredBody(req, res, next) {
    if(!req.body) {
        res.status(500).json({
            message: 'IDK what you are trying to change'
        })
    }
}
module.exports = router