const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../users/users-model.js')

router.post('/register', (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash

    Users.add(user)
        .then(saved => {
            console.log('*******saved********,', saved)
            const token = makeAToken(saved)
            res.status(201).json({
                user: saved,
                token
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'is this working?'
            })
        })
})

router.post('/login', (req, res) => {
    let { email, password } = req.body
    Users.findBy({ email })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = makeAToken(user)
                delete user.password
                console.log(user)
                res.status(200).json({
                    message: `Welcome ${user.fullName}`,
                    token,
                    user: user
                })
            } else {
                res.status(401).json({
                    message: 'invalid credentials'
                })
            }
        })
        .catch(err => {
            console.log('login err', err)
            res.status(500).json(err)
        })
})

// Function creates a token given to client upon succesfully adding a user, or loggin in
// token used for access to other functions with the database, 
// ie post request to add tickets
function makeAToken(user) {
    const payload = {
        sub: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, process.env.jwt_secret, options)
}

module.exports = router