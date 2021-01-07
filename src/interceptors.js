'use strict'

const axios = require('axios').default
const get = require('lodash/get')

function appendAccessToken(client) {
    client.axios.interceptors.request.use(request => {
        if (client.config.accessToken) {
            request.headers.Authorization = `Bearer ${client.config.accessToken}`
        }

        return request
    })
} // appendAccessToken()

function updateConfigOnNewToken(client) {
    client.axios.interceptors.response.use(response => {
        if (response.config.url === '/oauth2/token') {
            const token = parseToken(response.data)
            Object.assign(client.config, token)
            client._emitter.emit('token', token)
        }

        return response
    })
} // updateConfigOnNewToken()

function refreshAndRetry(client) {
    client.axios.interceptors.response.use(undefined, error => {
        const originalRequest = error.config
        const condition = client.config.refreshAndRetry
            && get(error, 'response.status') === 401
            && ! originalRequest._retry
            && originalRequest.url !== '/oauth2/token'

        if (condition) {
            originalRequest._retry = true
            return client.refreshAccessToken().then(() => {
                originalRequest.headers.Authorization = `Bearer ${client.config.accessToken}`
                return axios(originalRequest)
            })
        }

        return Promise.reject(error)
    })
} // refreshAndRetry()

function fullResponse(client) {
    client.axios.interceptors.response.use(response => {
        return client.config.returnFullResponse
            ? response
            : get(response, 'data')
    })
} // fullResponse()

//#region helpers

/**
 * Transform the given token object
 *
 * @private
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
 * @private
 * @param {Number} seconds Number of seconds
 * @returns {string|undefined} UTC time string or undefined
 */
function timeFromNow(seconds) {
    return seconds
        ? new Date(Date.now() + 1000 * seconds).toISOString()
        : undefined
} // getTimeFromNow()

/**
 * Filter object
 *
 * @private
 * @param {object} obj Object to filter
 * @param {function} cb Callback
 * @returns {object} Filtered object
 */
function filterObj(obj, cb) {
    return Object.keys(obj).reduce((acc, cur) => {
        if (cb(obj[cur], cur)) {
            acc[cur] = obj[cur]
        }
        return acc
    }, {})
} // filterObj()

//#endregion

const interceptors = {
    appendAccessToken,
    updateConfigOnNewToken,
    refreshAndRetry,
    fullResponse,
}

function setup(client) {
    Object.keys(interceptors).forEach(key => interceptors[key](client))
}

module.exports = Object.assign({}, interceptors, { setup })
