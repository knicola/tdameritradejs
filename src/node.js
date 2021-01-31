'use strict'

const Client = require('./client')

const url = require('url')
const https = require('https')
const fs = require('fs')
const path = require('path')

const { account, streamer } = require('./common')

/** @typedef {import('./client/base').Config} Config */

/**
 * @augments Client
 */
class TDAmeritrade extends Client {
    /**
     * @param {Config} [config] Config
     * @example
     * const td = new TDAmeritrade({
     *     apiKey: process.env.API_KEY,
     *     redirectUri: 'https://localhost:8443',
     *     sslKey: './selfsigned.key',
     *     sslCert: './selfsigned.crt',
     * })
     */
    constructor(config) {
        super(config)
    }

    /**
     * Bootstrap a local web server for oauth2 authorization. Will request
     * access token and update config if authorization is successful.
     *
     * **(Available for Nodejs only)**
     *
     * @returns {Promise<any>} Success
     *
     * @example
     * td.authorize().then(token => {
     *     console.log(token)
     * }).catch(err => {
     *     console.log(err)
     * })
     */
    authorize() {
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

                this.getAccessToken(decodeURIComponent(_url.query.code.toString()))
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
            server.listen(Number(urlObj.port) || 8443, urlObj.hostname, () => {
                this.emit(
                    'login',
                    `https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=${this.config.redirectUri}&client_id=${this.config.apiKey}`
                )
            })
        }) // Promise()
    } // authorize()

    /**
     * Authorize or refresh the access token depending on whether
     * the access and/or refresh token exist and are not expired.
     *
     * **(Available for Nodejs only)**
     *
     * @returns {Promise<any>} Success
     *
     * @example
     * td.login().then(token => {
     *     console.log(token)
     * }).catch(err => {
     *     console.log(err)
     * })
     */
    login() {
        if (! this.isAccessTokenExpired()) {
            return Promise.resolve()
        }

        if (! this.isRefreshTokenExpired()) {
            return this.refreshAccessToken()
        }

        return this.authorize()
    } // login()
} // class

TDAmeritrade.prototype.account = account
TDAmeritrade.prototype.streamer = streamer

module.exports = { TDAmeritrade }

// Allow use of default import syntax in TypeScript
module.exports.default = { TDAmeritrade }
