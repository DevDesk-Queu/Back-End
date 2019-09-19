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
            const token = makeAToken(saved)
            res.status(201).json({
                user: saved,
                token
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.post('/login', (req, res) => {
    let { email, password } = req.body
    Users.findBy({ email })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = makeAToken(user)
                res.status(200).json({
                    message: `Welcome ${user.fullName}`,
                    token
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

function makeAToken(user) {
    const payload = {
        sub: user.id,
        email: user.email,
        fullName: user.name,
        role: user.role
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, process.env.jwt_secret, options)
}

module.exports = router