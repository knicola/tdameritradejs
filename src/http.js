'use strict'

const axios = require('axios').default
const defaults = require('./config')
const apiKeySuffix = '@AMER.OAUTHAP'

function http(config) {
    this.config = Object.assign({}, defaults, config, {
        apiKey: (config.apiKey + '').endsWith(apiKeySuffix)
            ? config.apiKey
            : config.apiKey + apiKeySuffix
    })

    this.axios = axios.create({ baseURL: this.config.baseURL })

    this.axios.interceptors.request.use(request => {
        if (this.config.accessToken) {
            request.headers.Authorization = `Bearer ${this.config.accessToken}`
        }

        return request
    })
} // http()

module.exports = http
