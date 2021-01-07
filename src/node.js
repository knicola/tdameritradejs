'use strict'

const url = require('url')
const https = require('https')
const fs = require('fs')
const path = require('path')
/**
 * @class
 */
const TDAmeritrade = require('./tdAmeritrade')

TDAmeritrade.prototype.authorize = function authorize() {
    return new Promise((resolve, reject) => {
        const serverOptions = {
            key: fs.readFileSync(path.resolve(this.config.sslKey)),
            cert: fs.readFileSync(path.resolve(this.config.sslCert)),
        }
        const urlObj = url.parse(this.config.redirectUri)
        const server = https.createServer(serverOptions, (req, res) => {
            const _url = url.parse(req.url, true)

            if (! _url.query.code) {
                res.writeHead(422, {'Content-Type': 'text/html'})
                res.write('Authorization code is required.')
                return res.end()
            }

            this.getAccessToken(decodeURIComponent(_url.query.code))
                .then(data => {
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.write('OK')
                    res.end()
                    resolve(data)
                })
                .catch(err => {
                    res.writeHead(500, { 'Content-Type': 'text/html' })
                    res.write('Failed to get access token.')
                    res.end()
                    reject(err)
                })
                .finally(() => server.close())
        })
        server.listen(urlObj.port || 8443, urlObj.hostname, () => {
            this._emitter.emit(
                'login',
                `https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=${this.config.redirectUri}&client_id=${this.config.apiKey}`
            )
        })
    }) // Promise()
} // authorize()

TDAmeritrade.prototype.login = function () {
    if (! this.isAccessTokenExpired()) {
        return Promise.resolve()
    }

    if (! this.isRefreshTokenExpired()) {
        return this.refreshAccessToken()
    }

    return this.authorize()
} // login()

module.exports = { TDAmeritrade }
