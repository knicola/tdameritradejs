'use strict'

const axios = require('axios').default
const defaults = require('./config')
const token = require('./resources/token')
const apiKeySuffix = '@AMER.OAUTHAP'

function http(config) {
    this.config = Object.assign({}, defaults, config, {
        apiKey: (config.apiKey + '').endsWith(apiKeySuffix)
            ? config.apiKey
            : config.apiKey + apiKeySuffix
    })

    this.authenticate = token.authenticate
    this.refreshToken = token.refreshToken

    this.axios = axios.create({ baseURL: this.config.baseURL })

    this.axios.interceptors.request.use(request => {
        if (this.config.accessToken) {
            request.headers.Authorization = `Bearer ${this.config.accessToken}`
        }

        return request
    })

    if (! this.config.returnFullResponse) {
        this.axios.interceptors.response.use(response => response.data)
    }
} // http()

module.exports = http
