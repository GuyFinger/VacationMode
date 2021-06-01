require('dotenv').config({ path: __dirname + "/.env" })
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')


const app = express()
app.use(express.json())
app.use(cors())

app.use(function (req, res, next) {
    if (req.originalUrl == '/login' || req.originalUrl == '/signup' || req.originalUrl == '/users' ) {
        next()
    } else {


        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })
    }
})

app.use(function (req, res, next) {
    console.log('Time:', Date.now(), '||', 'method: ', req.method)
    next()
})

app.use('/', require('./routes'))

app.listen(1000, () => console.log('server is live'))