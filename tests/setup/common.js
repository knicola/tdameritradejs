'use strict'

function apiResponse(req, res) {
    return res.json({
        url: req.path,
        method: req.method,
        params: req.query,
        data: req.body,
        headers: req.headers,
    })
} // apiResponse()

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
