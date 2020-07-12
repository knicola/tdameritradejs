'use strict'

const MockServer = require('./mockServer')

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// const port = process.env.PORT || 3331
const port = 3331
const config = {
    baseUrl: `https://localhost:${port}/api`,
    dataBaseUrl: `wss://localhost:${port}/data`,
    apiKey: 'test_id',
    accessToken: 'test_secret',
    port,
}

module.exports = async () => {
    global.__SERVER__ = new MockServer(config)
    global.__SERVER__.start()
}
