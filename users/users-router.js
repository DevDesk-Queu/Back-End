
const Users = require('./users-model.js')
const router = require('express').Router()

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

module.exports = router