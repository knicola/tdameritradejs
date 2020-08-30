'use strict'

const axios = require('axios').default
const defaults = require('./config')
const token = require('./resources/token')
const EventEmitter = require('eventemitter3')
const apiKeySuffix = '@AMER.OAUTHAP'

function http(config) {
    const self = this
    this._emitter = new EventEmitter()

    this.on = (event, fn) => this._emitter.on(event, fn)

    this.config = Object.assign({}, defaults, config, {
        apiKey: (config.apiKey + '').endsWith(apiKeySuffix)
            ? config.apiKey
            : config.apiKey + apiKeySuffix
    }) // config

    this.getAccessToken = token.getAccessToken
    this.refreshAccessToken = token.refreshAccessToken

    this.axios = axios.create({ baseURL: this.config.baseURL })

    // add access token to request
    this.axios.interceptors.request.use(request => {
        if (this.config.accessToken) {
            request.headers.Authorization = `Bearer ${this.config.accessToken}`
        }

        return request
    })

    // update config with new token info
    this.axios.interceptors.response.use(response => {
        if (response.config.url === '/oauth2/token') {
            const token = parseToken(response.data)
            Object.assign(self.config, token)
            self._emitter.emit('token:received', token)
        }

        return response
    })

    // return just the data
    if (! this.config.returnFullResponse) {
        this.axios.interceptors.response.use(response => response.data)
    }
} // http()

/**
 * Transform the given token object
 *
 * @param {Object} data Token info return from oauth endpoint
 * @returns {Object} Transformed token object
 */
function parseToken(data) {
    const res = {
        accessToken: data.access_token,
        accessTokenExpiresAt: timeFromNow(data.expires_in),
        refreshToken: data.refresh_token,
        refreshTokenExpiresAt: timeFromNow(data.refresh_token_expires_in),
        scope: data.scope,
        tokenType: data.token_type,
    }

    // remove props with falsey values
    return filterObj(res, value => value)
} // parseToken()

/**
 * Get the UTC time from now
 *
 * @param {Number} seconds Number of seconds
 * @returns {string|undefined} UTC time string or undefined
 */
function timeFromNow(seconds) {
    return seconds
        ? new Date(Date.now() + 1000 * seconds).toISOString()
        : undefined
} // getTimeFromNow()

function filterObj(obj, cb) {
    return Object.keys(obj).reduce((acc, cur) => {
        if (cb(obj[cur], cur)) {
            acc[cur] = obj[cur]
        }
        return acc
    }, {})
} // filterObj()

module.exports = http
