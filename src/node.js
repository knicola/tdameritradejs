'use strict'

const Client = require('./client')

const url = require('url')
const https = require('https')
const fs = require('fs')
const path = require('path')

const { account, streamer } = require('./common')

/**
 * @augments Client
 */
class TDAmeritrade extends Client {
    /**
     * Bootstrap a local web server for oauth2 authorization. Will request
     * access token and update config if authorization is successful.
     *
     * ** Nodejs only **
     *
     * @returns {Promise<any>} Success
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
     * ** Nodejs only **
     *
     * @returns {Promise<any>} Success
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
