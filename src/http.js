'use strict'

const axios = require('axios').default
const pickBy = require('lodash/pickBy')
const identity = require('lodash/identity')

function http({ method = 'GET', url, params, data }) {
    const headers = { Authorization: `Bearer ${this.config.accessToken}` }
    return axios(
        pickBy(
            { method, url, params, data, headers, baseURL: this.config.baseURL },
            identity
        )
    )
} // http()

module.exports = http
