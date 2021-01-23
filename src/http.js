'use strict'

const debug = require('debug')('ameritrade:client') // eslint-disable-line no-unused-vars

const axios = require('axios').default
const defaults = require('./config')
const token = require('./resources/token')
const EventEmitter = require('eventemitter3')
const interceptors = require('./interceptors')
const apiKeySuffix = '@AMER.OAUTHAP'

/**
 * @typedef {Settings|Tokens} Config
 *
 * @typedef {object} Settings
 * @property {string} apiKey Api key / Client id
 * @property {string} redirectUri OAuth2 redirect uri
 * @property {string} sslKey Path to SSL key
 * @property {string} sslCert Path to SSL cert
 * @property {boolean} refreshAndRetry Refresh and retry on a 401 response
 * @property {boolean} returnFullResponse Return the axios response instead of just the data
 *
 * @typedef {object} Tokens
 * @property {string} accessToken Access token
 * @property {string} refreshToken Refresh token
 * @property {string} accessTokenExpiresAt Access token date and time of expiration
 * @property {string} refreshTokenExpiresAt Refresh token date and time of expiration
 */
/**
 * @private
 * @param {Config} config The config
 */
function http(config = {}) {
    /**
     * @private
     */
    this._emitter = new EventEmitter()

    /**
     * Add a listener for a given event.
     *
     * @param {'login'|'token'} event Event
     * @param {Function} fn Callback
     * @returns {void}
     */
    this.on = (event, fn) => this._emitter.on(event, fn)

    this.config = Object.assign({}, defaults, config, {
        apiKey: (config.apiKey + '').endsWith(apiKeySuffix)
            ? config.apiKey
            : config.apiKey + apiKeySuffix
    }) // config

    this.isAccessTokenExpired = token.isAccessTokenExpired
    this.isRefreshTokenExpired = token.isRefreshTokenExpired

    this.getAccessToken = token.getAccessToken
    this.refreshAccessToken = token.refreshAccessToken

    this.axios = axios.create({ baseURL: this.config.baseURL })

    interceptors.setup(this)
} // http()

module.exports = http
