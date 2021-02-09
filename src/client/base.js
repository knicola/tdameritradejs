'use strict'

const axios = require('axios').default
const defaults = require('./config')
const EventEmitter = require('eventemitter3')
const interceptors = require('./interceptors')
const apiKeySuffix = '@AMER.OAUTHAP'

const tokens = require('./resources/tokens')

/**
 * @typedef {import('./config').Config} Config
 */

/**
 * @ignore
 */
class Base {
    /**
     * @param {Config} [config] Config
     */
    constructor(config) {
        this._emitter = new EventEmitter()

        this.config = Object.assign({}, defaults, config, function () {
            if (config) {
                return {
                    apiKey: (config.apiKey + '').endsWith(apiKeySuffix)
                        ? config.apiKey
                        : config.apiKey + apiKeySuffix
                }
            }
        }()) // config

        /**
         * @typedef {import('axios').AxiosInstance} AxiosInstance
         * @external AxiosInstance
         * @see https://github.com/axios/axios/blob/7d3b626a595e5b911c59dfb28a8080e56d840602/index.d.ts#L130
         */
        /**
         * The axios instance used by the client.
         *
         * @name axios
         * @instance
         * @memberof TDAmeritrade
         * @type {AxiosInstance}
         */
        this.axios = axios.create({ baseURL: this.config.baseURL })

        interceptors.setup(this)
    }
} // Base

/**
 * Add a listener for a given event.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {'login'|'token'} event The event name
 * @param {EventEmitter.EventListener<any, any>} fn Callback function
 * @returns {EventEmitter<string | symbol, any>} Event emitter
 */
function on(event, fn) {
    return this._emitter.on(event, fn)
}

Base.prototype.on = on
Base.prototype.getAccessToken = tokens.getAccessToken
Base.prototype.refreshAccessToken = tokens.refreshAccessToken
Base.prototype.isAccessTokenExpired = tokens.isAccessTokenExpired
Base.prototype.isRefreshTokenExpired = tokens.isRefreshTokenExpired

module.exports = Base
