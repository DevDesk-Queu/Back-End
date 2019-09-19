
const Comments = require('./comments-model.js')

const router = require('express').Router()

router.get('/', (req, res) => {
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

module.exports = router