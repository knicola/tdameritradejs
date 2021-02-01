'use strict'

/** @typedef {import('express').Request} Request */
/** @typedef {import('express').Response} Response */
/**
 * Create a mock API response.
 *
 * @private
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns {Promise<any>} Request
 */
function apiResponse(req, res) {
    return res.json({
        url: req.path,
        method: req.method,
        params: req.query,
        data: req.body,
        headers: req.headers,
    })
} // apiResponse()

/**
 * Mock axios response.
 *
 * @private
 * @param {object} config Config
 * @returns {Array<any>} Axios response
 */
function mockAxiosResponse(config) {
    let data
    try {
        data = JSON.parse(config.data)
    } catch (ignore) {
        data = Object.fromEntries(new URLSearchParams(config.data))
    }
    return [200, {
        url: config.url,
        method: (config.method + '').toUpperCase(),
        params: config.params,
        data: data,
        headers: config.headers,
    }]
} // mockAxiosResponse()

/**
 * API call assertion.
 *
 * @private
 * @param {object} actual Actual
 * @param {object} expected Expected
 */
function assertApiCall(actual, expected) {
    ! expected.method  || expect(actual.method).toEqual(expected.method)
    ! expected.url     || expect(actual.url).toEqual(expected.url)
    ! expected.data    || expect(actual.data).toEqual(expected.data)
    ! expected.query   || expect(actual.query).toEqual(expected.query)
    ! expected.params  || expect(actual.params).toEqual(expected.params)
    ! expected.headers || expect(actual.headers).toMatchObject(expected.headers)
} // assertApiCall()

module.exports = {
    apiResponse,
    mockAxiosResponse,
    assertApiCall,
}
