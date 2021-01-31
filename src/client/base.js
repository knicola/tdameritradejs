'use strict'

const axios = require('axios').default
const defaults = require('./config')
const EventEmitter = require('eventemitter3')
const interceptors = require('./interceptors')
const apiKeySuffix = '@AMER.OAUTHAP'

const tokens = require('./resources/tokens')

/**
 * @typedef {object} Config
 * @property {string} [apiKey] Api key / Client id
 * @property {boolean} [refreshAndRetry] Refresh and retry on a 401 response
 * @property {boolean} [returnFullResponse] Return the axios response instead of just the data
 * @property {string} [accessToken] Access token
 * @property {string} [refreshToken] Refresh token
 * @property {string} [accessTokenExpiresAt] Access token date and time of expiration
 * @property {string} [refreshTokenExpiresAt] Refresh token date and time of expiration
 * @property {string} [redirectUri] OAuth2 redirect uri
 * @property {string} [sslKey] Path to SSL key
 * @property {string} [sslCert] Path to SSL cert
 */

/**
 * @private
 */
class Base extends EventEmitter {
    /**
     * @param {Config} [config] Config
     */
    constructor(config) {
        super()

        this.config = Object.assign({}, defaults, config, function () {
            if (config) {
                return {
                    apiKey: (config.apiKey + '').endsWith(apiKeySuffix)
                        ? config.apiKey
                        : config.apiKey + apiKeySuffix
                }
            }
        }()) // config

        this.axios = axios.create({ baseURL: this.config.baseURL })

        interceptors.setup(this)
    }
} // Base

Base.prototype.getAccessToken = tokens.getAccessToken
Base.prototype.refreshAccessToken = tokens.refreshAccessToken
Base.prototype.isAccessTokenExpired = tokens.isAccessTokenExpired
Base.prototype.isRefreshTokenExpired = tokens.isRefreshTokenExpired

module.exports = Base
