'use strict'

/* eslint no-console: 0 */  // --> OFF

const opn = require('opn')
const express = require('express')
const https = require('https')
const fs = require('fs')
const path = require('path')
const axios = require('axios').default
const querystring = require('querystring')

require('dotenv').config({ path: path.join(__dirname, '../.env') })

// config
const client_id = process.env.CLIENT_ID
const redirect_uri = process.env.REDIRECT_URI
const port = redirect_uri.split(':')[2] || 80

// ssl cert
const key = fs.readFileSync(path.join(__dirname, '../selfsigned.key'))
const cert = fs.readFileSync(path.join(__dirname, '../selfsigned.crt'))
const options = { key: key, cert: cert }

const app = express()

app.get('/', (req, res) => {
    axios
        .post('https://api.tdameritrade.com/v1/oauth2/token', querystring.stringify({
            grant_type: 'authorization_code',
            access_type: 'offline',
            code: decodeURIComponent(req.query.code),
            client_id: `${client_id}@AMER.OAUTHAP`,
            redirect_uri: redirect_uri,
        }))
        .then(({ data }) => {
            res.send(data)
            console.info(JSON.stringify(data, null, 2))
            fs.writeFileSync(path.join(__dirname, 'accessToken.cache.json'), JSON.stringify(data, null, 2))
        })
        .catch(err => {
            res.send(JSON.stringify(err, null, 2))
            console.error(JSON.stringify(err, null, 2))
        })
        .finally(() => {
            server.close()
        })
}) // app.get()

const server = https.createServer(options, app)

server.listen(port, () => {
    console.log(`server starting on port : ${port}`)
    opn(`https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=${redirect_uri}&client_id=${client_id}@AMER.OAUTHAP`)
}) // server.listen()
