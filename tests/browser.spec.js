'use strict'

const debug = require('debug')('ameritrade:tests') // eslint-disable-line no-unused-vars
// require('debug').enable('ameritrade:tests')

const axios = require('axios').default
const MockAdapter = require('axios-mock-adapter').default
const mockAxios = new MockAdapter(axios)
const { mockAxiosResponse } = require('./setup/common')

const { TDAmeritrade } = require('../src/browser')

describe('TDAmeritrade (Browser)', () => {
    beforeEach(() => {
        // intercept all calls to make sure we
        // will never hit any live endpoints
        mockAxios.onAny().reply(mockAxiosResponse)
    })
    afterEach(() => {
        mockAxios.reset()
    })
    describe('.authorize()', () => {
        it('should only resolve an empty promise', () => {
            const td = new TDAmeritrade()
            td.authorize().then(res => {
                expect(res).toBeUndefined()
            })
        }) // test
    }) // group
    describe('.login()', () => {
        it('should only resolve an empty promise', () => {
            const td = new TDAmeritrade()
            td.login().then(res => {
                expect(res).toBeUndefined()
            })
        }) // test
    }) // group
}) // group
