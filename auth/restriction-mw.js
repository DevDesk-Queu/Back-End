const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if(token) {
        jwt.verify(token, process.env.jwt_secret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({
                    message: 'you are not authorized'
                })
            } else {
                req.decodedToken = decodedToken
                next()
            }
        })
    } else {
        res.status(400).json({
            message: 'there was no token provided'
        })
    }
}