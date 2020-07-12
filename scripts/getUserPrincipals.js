'use strict'

/* eslint no-console: 0 */  // --> OFF

const fs = require('fs')
const path = require('path')
const axios = require('axios').default

const cacheFile = path.join(__dirname, 'accessToken.cache.json')

if (! fs.existsSync(cacheFile)) {
    console.error(`${cacheFile} does not exist. Please run 'npm run authorize' first.`)
    process.exit()
}

const token = JSON.parse(fs.readFileSync(cacheFile))

axios
    .get('https://api.tdameritrade.com/v1/userprincipals', {
        headers: { Authorization: `Bearer ${token.access_token}` },
        params: { fields: 'streamerSubscriptionKeys,streamerConnectionInfo' }
    })
    .then(({ data }) => {
        console.info(JSON.stringify(data, null, 2))
        fs.writeFileSync(path.join(__dirname, 'userPrincipals.cache.json'), JSON.stringify(data, null, 2))
    })
    .catch(err => {
        console.error(JSON.stringify(err, null, 2))
        console.error("It's possible that both the access token and refresh token have expired. Try running 'npm run refresh_token' or 'npm run authorize' first.")
    })
