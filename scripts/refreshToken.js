'use strict'

/* eslint no-console: 0 */  // --> OFF

const fs = require('fs')
const path = require('path')
const axios = require('axios').default
const querystring = require('querystring')

require('dotenv').config({ path: path.join(__dirname, '../.env') })

// config
const client_id = process.env.CLIENT_ID

const cacheFile = path.join(__dirname, 'accessToken.cache.json')

if (! fs.existsSync(cacheFile)) {
    console.error(`${cacheFile} does not exist. Please run 'npm run authorize' first.`)
    process.exit()
}

const token = JSON.parse(fs.readFileSync(cacheFile))

axios
    .post('https://api.tdameritrade.com/v1/oauth2/token', querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
        access_type: 'offline',
        client_id: `${client_id}@AMER.OAUTHAP`,
    }))
    .then(({ data }) => {
        console.info(JSON.stringify(data, null, 2))
        fs.writeFileSync(path.join(__dirname, 'accessToken.cache.json'), JSON.stringify(data, null, 2))
    })
    .catch(err => {
        console.error(JSON.stringify(err, null, 2))
        console.error("It's possible that both the access token and refresh token have expired. Try running 'npm run authorize' first.")
    })
