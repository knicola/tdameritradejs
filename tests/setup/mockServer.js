'use strict'

const express = require('express')
const https = require('https')
const fs = require('fs')
const path = require('path')
const routes = require('./routes')
const WebSocket = require('ws')

// ssl cert
const key = fs.readFileSync(path.join(__dirname, '../../selfsigned.key'))
const cert = fs.readFileSync(path.join(__dirname, '../../selfsigned.crt'))
const options = { key: key, cert: cert }

function auth(req, res, next) {
    if (req.get('Authorization') === 'Bearer test_access_token') {
        next()
    }
    res.sendStatus(401)
}

class MockServer {
    constructor(config) {
        this.config = config
        this.app = express()
            .use(express.json())
            .use('/api', auth, routes)
    } // constructor()

    start() {
        this.http = https.createServer(options, this.app)
        this.ws = new WebSocket.Server({ server: this.http, path: '/ws' })
        this.ws.on('connection', ws => ws.on('message', ws.send))
        this.http.listen(this.config.port)
    } // start()

    stop() {
        this.ws.close()
        this.http.close()
    } // stop()
} // MockServer

module.exports = MockServer
