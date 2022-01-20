'use strict'

const debug = require('debug')('ameritrade:tests') // eslint-disable-line no-unused-vars
// require('debug').enable('ameritrade:tests')

const axios = require('axios').default
const MockAdapter = require('axios-mock-adapter').default
const mockAxios = new MockAdapter(axios)

const Client = require('../src/client')
const { assertApiCall, mockAxiosResponse } = require('./setup/common')

const config = {
    accessToken: 'test_access_token',
    apiKey: 'testClientId@AMER.OAUTHAP',
}

const api = new Client(config)

const expectedAuthorization = { Authorization: 'Bearer test_access_token' }
const expectedApiKey = { apikey: 'testClientId@AMER.OAUTHAP' }

describe('Client', () => {
    beforeEach(() => {
        mockAxios.onAny().reply(mockAxiosResponse)
    })
    afterEach(() => {
        mockAxios.reset()
    })
    describe('.getAccounts()', () => {
        it('should get all Accounts', () => {
            return api
                .getAccounts()
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
        it('should be able to include positions and orders', () => {
            return api
                .getAccounts(['orders', 'positions'])
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts',
                        headers: expectedAuthorization,
                        params: { fields: 'orders,positions' },
                    })
                })
        }) // test
    }) // group
    describe('.getAccount()', () => {
        it('should get a single account', () => {
            return api
                .getAccount('123')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts/123',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
        it('should be able to include positions and orders', () => {
            return api
                .getAccount('123', [ 'orders', 'positions' ])
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts/123',
                        headers: expectedAuthorization,
                        params: { fields: 'orders,positions' },
                    })
                })
        }) // test
    }) // group
    describe('.getPositions', () => {
        it('should get account positions', () => {
            return api
                .getPositions('123')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts/123',
                        headers: expectedAuthorization,
                        params: { fields: 'positions' }
                    })
                })
        }) // test
    }) // group
    describe('.getUserPrincipals()', () => {
        it('should get the user principals', () => {
            return api
                .getUserPrincipals()
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/userprincipals',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
        it('should get the user principals with additional fields', () => {
            return api
                .getUserPrincipals(['field-one', 'field-two'])
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/userprincipals',
                        params: { fields: 'field-one,field-two' },
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getStreamerSubscriptionKeys()', () => {
        it('should get a single account', () => {
            return api
                .getStreamerSubscriptionKeys(['some-account', 'some-other-account'])
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/userprincipals/streamersubscriptionkeys',
                        params: { accountIds: 'some-account,some-other-account' },
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getPreferences()', () => {
        it('should get the account\'s preferences', () => {
            return api
                .getPreferences('123')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts/123/preferences',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.updatePreferences()', () => {
        it('should update the account\'s preferences', () => {
            return api
                .updatePreferences('123', { field: 'new value' })
                .then(data => {
                    assertApiCall(data, {
                        method: 'PUT',
                        url: '/accounts/123/preferences',
                        data: { field: 'new value' },
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getAllOrders()', () => {
        it('should get all orders from all accounts', () => {
            return api
                .getAllOrders()
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/orders',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
        it('should get all orders from all accounts using a filter', () => {
            return api
                .getAllOrders({ filter: 'value' })
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/orders',
                        params: { filter: 'value' },
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getOrders()', () => {
        it('should get all orders from a single account', () => {
            return api
                .getOrders('123')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts/123/orders',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
        it('should get all orders from a single account using a filter', () => {
            return api
                .getOrders('123', { filter: 'value' })
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts/123/orders',
                        params: { filter: 'value' },
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getOrder()', () => {
        it('should get a single order from a single account', () => {
            return api
                .getOrder('123', '456')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts/123/orders/456',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.placeOrder()', () => {
        it('should place a new order', () => {
            return api
                .placeOrder('123', { name: 'new order' })
                .then(data => {
                    assertApiCall(data, {
                        method: 'POST',
                        url: '/accounts/123/orders',
                        data: { name: 'new order' },
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.replaceOrder()', () => {
        it('should replace an existing order', () => {
            return api
                .replaceOrder('123', '456', { name: 'updated order' })
                .then(data => {
                    assertApiCall(data, {
                        method: 'PUT',
                        url: '/accounts/123/orders/456',
                        data: { name: 'updated order' },
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.cancelOrder()', () => {
        it('should cancel an existing order', () => {
            return api
                .cancelOrder('123', '456')
                .then(data => {
                    assertApiCall(data, {
                        method: 'DELETE',
                        url: '/accounts/123/orders/456',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getSavedOrders()', () => {
        it('should get all saved orders of a single account', () => {
            return api
                .getSavedOrders('123')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts/123/savedorders',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getSavedOrder()', () => {
        it('should get an existing saved order', () => {
            return api
                .getSavedOrder('123', '456')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts/123/savedorders/456',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.createSavedOrder()', () => {
        it('should create a new saved order', () => {
            return api
                .createSavedOrder('123', { name: 'new saved order' })
                .then(data => {
                    assertApiCall(data, {
                        method: 'POST',
                        url: '/accounts/123/savedorders',
                        data: { name: 'new saved order' },
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.replaceSavedOrder()', () => {
        it('should create a new saved order', () => {
            return api
                .replaceSavedOrder('123', '456', { name: 'updated saved order' })
                .then(data => {
                    assertApiCall(data, {
                        method: 'PUT',
                        url: '/accounts/123/savedorders/456',
                        data: { name: 'updated saved order' },
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.deleteSavedOrder()', () => {
        it('should create a new saved order', () => {
            return api
                .deleteSavedOrder('123', '456')
                .then(data => {
                    assertApiCall(data, {
                        method: 'DELETE',
                        url: '/accounts/123/savedorders/456',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getAllWatchlists()', () => {
        it('should get all watchlists for all accounts', () => {
            return api
                .getAllWatchlists()
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts/watchlists',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getWatchlists()', () => {
        it('should get all watchlists for a single account', () => {
            return api
                .getWatchlists('123')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts/123/watchlists',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getWatchlist()', () => {
        it('should get a single watchlist', () => {
            return api
                .getWatchlist('123', '456')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts/123/watchlists/456',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.createWatchlist()', () => {
        it('should create a new watchlist', () => {
            return api
                .createWatchlist('123', { name: 'new watchlist' })
                .then(data => {
                    assertApiCall(data, {
                        method: 'POST',
                        url: '/accounts/123/watchlists',
                        date: { name: 'new watchlist' },
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.replaceWatchlist()', () => {
        it('should replace an existing watchlist', () => {
            return api
                .replaceWatchlist('123', '456', { name: 'updated watchlist' })
                .then(data => {
                    assertApiCall(data, {
                        method: 'PUT',
                        url: '/accounts/123/watchlists/456',
                        date: { name: 'updated watchlist' },
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.updateWatchlist()', () => {
        it('should update an existing watchlist', () => {
            return api
                .updateWatchlist('123', '456', { name: 'updated watchlist' })
                .then(data => {
                    assertApiCall(data, {
                        method: 'PATCH',
                        url: '/accounts/123/watchlists/456',
                        date: { name: 'updated watchlist' },
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.deleteWatchlist()', () => {
        it('should delete an existing watchlist', () => {
            return api
                .deleteWatchlist('123', '456')
                .then(data => {
                    assertApiCall(data, {
                        method: 'DELETE',
                        url: '/accounts/123/watchlists/456',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getTransactions()', () => {
        it('should get transaction history for a specific account', () => {
            return api
                .getTransactions('123')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts/123/transactions',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
        it('should get transaction history for a specific account using a filter', () => {
            return api
                .getTransactions('123', { name: 'some-filter' })
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts/123/transactions',
                        params: { name: 'some-filter' },
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getTransaction()', () => {
        it('should get a single transaction for a specific account', () => {
            return api
                .getTransaction('123', '456')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/accounts/123/transactions/456',
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getMarketHours()', () => {
        it('should get market hours for a specific date', () => {
            return api
                .getMarketHours('equity', '2020-01-01')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/marketdata/hours',
                        params: Object.assign({}, expectedApiKey, { markets: 'equity', date: '2020-01-01' }),
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getMovers()', () => {
        it('should get mover information by index symbol, direction type and change', () => {
            return api
                .getMovers('index', 'direction', 'change')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/marketdata/index/movers',
                        params: Object.assign({}, expectedApiKey, { direction: 'direction', change: 'change' }),
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getQuotes()', () => {
        it('should get quotes for one or more symbols', () => {
            return api
                .getQuotes(['symbol1', 'symbol2'])
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/marketdata/quotes',
                        params: Object.assign({}, expectedApiKey, { symbol: 'symbol1,symbol2' }),
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getQuote()', () => {
        it('should get quotes for one or more symbols', () => {
            return api
                .getQuote('symbol1')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/marketdata/symbol1/quotes',
                        params: expectedApiKey,
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getPriceHistory()', () => {
        it('should get price history for a symbol', () => {
            return api
                .getPriceHistory('symbol1')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/marketdata/symbol1/pricehistory',
                        params: expectedApiKey,
                        headers: expectedAuthorization,
                    })
                })
        }) // test
        it('should get price history for a symbol using a filter', () => {
            return api
                .getPriceHistory('symbol1', { name: 'some filter' })
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/marketdata/symbol1/pricehistory',
                        params: Object.assign({}, expectedApiKey, { name: 'some filter' }),
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getOptionChain()', () => {
        it('should get option chain for an optionable Symbol', () => {
            return api
                .getOptionChain('symbol1')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/marketdata/chains',
                        params: Object.assign({}, expectedApiKey, { symbol: 'symbol1' }),
                        headers: expectedAuthorization,
                    })
                })
        }) // test
        it('should get option chain for an optionable Symbol using a filter', () => {
            return api
                .getOptionChain('symbol1', { name: 'some filter' })
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/marketdata/chains',
                        params: Object.assign({}, expectedApiKey, { symbol: 'symbol1', name: 'some filter' }),
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getInstrument()', () => {
        it('should get an instrument by CUSIP', () => {
            return api
                .getInstrument('some-cusip')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/instruments/some-cusip',
                        params: expectedApiKey,
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.searchInstruments()', () => {
        it('should search or retrieve instrument data, including fundamental data', () => {
            return api
                .searchInstruments('symbol1', 'symbol-search')
                .then(data => {
                    assertApiCall(data, {
                        method: 'GET',
                        url: '/instruments',
                        params: Object.assign({}, expectedApiKey, { symbol: 'symbol1', projection: 'symbol-search' }),
                        headers: expectedAuthorization,
                    })
                })
        }) // test
    }) // group
    describe('.getAccessToken()', () => {
        it('should request an access token', () => {
            const api = new Client({
                apiKey: 'testClientId@AMER.OAUTHAP',
                redirectUri: 'https://localhost:8080',
                authCode: 'test_authorization_code',
            })

            return api
                .getAccessToken()
                .then(res => {
                    expect(res.headers).not.toHaveProperty('authorization')
                    expect(res.params).toBeUndefined()
                    expect(res.data).toEqual({
                        grant_type: 'authorization_code',
                        access_type: 'offline',
                        client_id: 'testClientId@AMER.OAUTHAP',
                        redirect_uri: 'https://localhost:8080',
                        code: 'test_authorization_code'
                    })
                })
        }) // test
        it('should use the given authCode when provided, instead of the one in the config', () => {
            const api = new Client({
                apiKey: 'testClientId@AMER.OAUTHAP',
                redirectUri: 'https://localhost:8080',
                authCode: 'not_this_auth_code',
            })

            return api
                .getAccessToken('some_auth_code')
                .then(res => {
                    expect(res.headers).not.toHaveProperty('authorization')
                    expect(res.params).toBeUndefined()
                    expect(res.data).toEqual({
                        grant_type: 'authorization_code',
                        access_type: 'offline',
                        client_id: 'testClientId@AMER.OAUTHAP',
                        redirect_uri: 'https://localhost:8080',
                        code: 'some_auth_code'
                    })
                })
        }) // test
        it('should update config with the access and refresh tokens', () => {
            const api = new Client({
                apiKey: 'testClientId@AMER.OAUTHAP',
                redirectUri: 'https://localhost:8080',
                authCode: 'test_authorization_code',
            })

            const mockResponse = {
                access_token: 'new_test_access_token',
                refresh_token: 'new_test_refresh_token',
                scope: 'PlaceTrades AccountAccess MoveMoney',
                expires_in: 1800,
                refresh_token_expires_in: 7776000,
                token_type: 'Bearer'
            }
            mockAxios.reset()
            mockAxios.onPost('/oauth2/token').reply(200, mockResponse)
            const mockDate = jest.spyOn(Date, 'now')
            mockDate.mockImplementation(() => new Date('2020-01-01T01:01:01.000Z').getTime())

            return api
                .getAccessToken()
                .then(res => {
                    expect(api.config.accessToken).toEqual('new_test_access_token')
                    expect(api.config.refreshToken).toEqual('new_test_refresh_token')
                    expect(api.config.accessTokenExpiresAt).toEqual('2020-01-01T01:31:01.000Z')
                    expect(api.config.refreshTokenExpiresAt).toEqual('2020-03-31T01:01:01.000Z')
                    // make sure we're only tapping into the
                    // response and not intercepting it.
                    expect(res).toEqual(mockResponse)
                })
                .finally(() => mockDate.mockRestore())
        }) // test
        it('should update config even when the full http response is returned', () => {
            const api = new Client({
                apiKey: 'testClientId@AMER.OAUTHAP',
                accessToken: 'test_access_token',
                refreshToken: 'test_refresh_token',
                returnFullResponse: true,
            })

            const mockResponse = {
                access_token: 'new_test_access_token',
                refresh_token: 'new_test_refresh_token',
                scope: 'PlaceTrades AccountAccess MoveMoney',
                expires_in: 1800,
                refresh_token_expires_in: 7776000,
                token_type: 'Bearer'
            }
            mockAxios.reset()
            mockAxios.onPost('/oauth2/token').reply(200, mockResponse)
            const mockDate = jest.spyOn(Date, 'now')
            mockDate.mockImplementation(() => new Date('2020-01-01T01:01:01.000Z').getTime())

            return api
                .getAccessToken()
                .then(res => {
                    expect(api.config.accessToken).toEqual('new_test_access_token')
                    expect(api.config.refreshToken).toEqual('new_test_refresh_token')
                    expect(api.config.accessTokenExpiresAt).toEqual('2020-01-01T01:31:01.000Z')
                    expect(api.config.refreshTokenExpiresAt).toEqual('2020-03-31T01:01:01.000Z')
                    expect(res.data).toEqual(mockResponse)
                })
                .finally(() => mockDate.mockRestore())
        }) // test
        it('should emit event `token` when a token is requested', async () => {
            const td = new Client({
                apiKey: 'testClientId@AMER.OAUTHAP',
                accessToken: 'test_access_token',
                refreshToken: 'test_refresh_token',
            })
            const mockResponse = {
                access_token: 'new_test_access_token',
                refresh_token: 'new_test_refresh_token',
                scope: 'PlaceTrades AccountAccess MoveMoney',
                expires_in: 1800,
                refresh_token_expires_in: 7776000,
                token_type: 'Bearer'
            }
            mockAxios.reset()
            mockAxios.onPost('/oauth2/token').reply(200, mockResponse)
            const mockDate = jest.spyOn(Date, 'now')
            mockDate.mockImplementation(() => new Date('2020-01-01T01:01:01.000Z').getTime())
            const spy = jest.fn()
            td.on('token', spy)
            await td.getAccessToken()
            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith({
                accessToken: 'new_test_access_token',
                refreshToken: 'new_test_refresh_token',
                scope: 'PlaceTrades AccountAccess MoveMoney',
                accessTokenExpiresAt: '2020-01-01T01:31:01.000Z',
                refreshTokenExpiresAt: '2020-03-31T01:01:01.000Z',
                tokenType: 'Bearer'
            })
            mockDate.mockRestore()
        }) // test
    }) // group
    describe('.refreshAccessToken()', () => {
        it('should request for a "fresh" access token', () => {
            const api = new Client({
                apiKey: 'testClientId@AMER.OAUTHAP',
                accessToken: 'test_access_token',
                refreshToken: 'test_refresh_token',
            })
            mockAxios.onPost('/oauth2/token').reply(mockAxiosResponse)

            return api
                .refreshAccessToken()
                .then(res => {
                    expect(res.headers).not.toHaveProperty('authorization')
                    expect(res.params).toBeUndefined()
                    expect(res.data).toEqual({
                        grant_type: 'refresh_token',
                        access_type: 'offline',
                        client_id: 'testClientId@AMER.OAUTHAP',
                        refresh_token: 'test_refresh_token',
                    })
                })
        }) // test
        it('should use the given refreshToken when provided, instead of the one in the config', () => {
            const api = new Client({
                apiKey: 'testClientId@AMER.OAUTHAP',
                accessToken: 'test_access_token',
                refreshToken: 'not_this_refresh_token',
            })

            return api
                .refreshAccessToken('some_refresh_token')
                .then(res => {
                    expect(res.headers).not.toHaveProperty('authorization')
                    expect(res.params).toBeUndefined()
                    expect(res.data).toEqual({
                        grant_type: 'refresh_token',
                        access_type: 'offline',
                        client_id: 'testClientId@AMER.OAUTHAP',
                        refresh_token: 'some_refresh_token',
                    })
                })
        }) // test
        it('should update config with the new access and refresh tokens', () => {
            const api = new Client({
                apiKey: 'testClientId@AMER.OAUTHAP',
                accessToken: 'test_access_token',
                refreshToken: 'test_refresh_token',
            })

            const mockResponse = {
                access_token: 'new_test_access_token',
                refresh_token: 'new_test_refresh_token',
                scope: 'PlaceTrades AccountAccess MoveMoney',
                expires_in: 1800,
                refresh_token_expires_in: 7776000,
                token_type: 'Bearer'
            }
            mockAxios.reset()
            mockAxios.onPost('/oauth2/token').reply(200, mockResponse)
            const mockDate = jest.spyOn(Date, 'now')
            mockDate.mockImplementation(() => new Date('2020-01-01T01:01:01.000Z').getTime())

            return api
                .refreshAccessToken()
                .then(res => {
                    expect(api.config.accessToken).toEqual('new_test_access_token')
                    expect(api.config.refreshToken).toEqual('new_test_refresh_token')
                    expect(api.config.accessTokenExpiresAt).toEqual('2020-01-01T01:31:01.000Z')
                    expect(api.config.refreshTokenExpiresAt).toEqual('2020-03-31T01:01:01.000Z')
                    // make sure we're only tapping into the
                    // response and not intercepting it.
                    expect(res).toEqual(mockResponse)
                })
                .finally(() => mockDate.mockRestore())
        }) // test
        it('should update config even when the full http response is returned', () => {
            const api = new Client({
                apiKey: 'testClientId@AMER.OAUTHAP',
                accessToken: 'test_access_token',
                refreshToken: 'test_refresh_token',
                returnFullResponse: true,
            })

            const mockResponse = {
                access_token: 'new_test_access_token',
                refresh_token: 'new_test_refresh_token',
                scope: 'PlaceTrades AccountAccess MoveMoney',
                expires_in: 1800,
                refresh_token_expires_in: 7776000,
                token_type: 'Bearer'
            }
            mockAxios.reset()
            mockAxios.onPost('/oauth2/token').reply(200, mockResponse)
            const mockDate = jest.spyOn(Date, 'now')
            mockDate.mockImplementation(() => new Date('2020-01-01T01:01:01.000Z').getTime())

            return api
                .refreshAccessToken()
                .then(res => {
                    expect(api.config.accessToken).toEqual('new_test_access_token')
                    expect(api.config.refreshToken).toEqual('new_test_refresh_token')
                    expect(api.config.accessTokenExpiresAt).toEqual('2020-01-01T01:31:01.000Z')
                    expect(api.config.refreshTokenExpiresAt).toEqual('2020-03-31T01:01:01.000Z')
                    expect(res.data).toEqual(mockResponse)
                })
                .finally(() => mockDate.mockRestore())
        }) // test
        it('should emit event `token` when a token is requested', async () => {
            const td = new Client({
                apiKey: 'testClientId@AMER.OAUTHAP',
                accessToken: 'test_access_token',
                refreshToken: 'test_refresh_token',
            })
            const mockResponse = {
                access_token: 'new_test_access_token',
                refresh_token: 'new_test_refresh_token',
                scope: 'PlaceTrades AccountAccess MoveMoney',
                expires_in: 1800,
                refresh_token_expires_in: 7776000,
                token_type: 'Bearer'
            }
            mockAxios.reset()
            mockAxios.onPost('/oauth2/token').reply(200, mockResponse)
            const mockDate = jest.spyOn(Date, 'now')
            mockDate.mockImplementation(() => new Date('2020-01-01T01:01:01.000Z').getTime())
            const spy = jest.fn()
            td.on('token', spy)
            await td.refreshAccessToken()
            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith({
                accessToken: 'new_test_access_token',
                refreshToken: 'new_test_refresh_token',
                scope: 'PlaceTrades AccountAccess MoveMoney',
                accessTokenExpiresAt: '2020-01-01T01:31:01.000Z',
                refreshTokenExpiresAt: '2020-03-31T01:01:01.000Z',
                tokenType: 'Bearer'
            })
            mockDate.mockRestore()
        }) // test
    }) // group
    describe('.isAccessTokenExpired()', () => {
        it('should return `false` if access token is still valid', () => {
            const accessTokenDate = new Date()
            accessTokenDate.setSeconds(1500)
            const td = new Client({
                accessToken: 'test_access_token',
                accessTokenExpiresAt: accessTokenDate.toISOString(),
            })
            expect(td.isAccessTokenExpired()).toBeFalsy()
        }) // test
        it('should return `true` if access token is expired', () => {
            const td = new Client({
                accessToken: 'test_access_token',
                accessTokenExpiresAt: '2020-01-01T01:31:01.000Z',
            })
            expect(td.isAccessTokenExpired()).toBeTruthy()
        }) // test
        it('should return `true` if there is no access token expiration date', () => {
            const td = new Client({
                accessToken: 'test_access_token',
            })
            expect(td.isAccessTokenExpired()).toBeTruthy()
        }) // test
    }) // group
    describe('.isRefreshTokenExpired()', () => {
        it('should return `false` if refresh token is still valid', () => {
            const refreshTokenDate = new Date()
            refreshTokenDate.setSeconds(1500)
            const td = new Client({
                refreshToken: 'test_refresh_token',
                refreshTokenExpiresAt: refreshTokenDate.toISOString(),
            })
            expect(td.isRefreshTokenExpired()).toBeFalsy()
        }) // test
        it('should return `true` if refresh token is expired', () => {
            const td = new Client({
                refreshToken: 'test_refresh_token',
                refreshTokenExpiresAt: '2020-01-01T01:31:01.000Z',
            })
            expect(td.isRefreshTokenExpired()).toBeTruthy()
        }) // test
        it('should return `true` if there is no refresh token expiration date', () => {
            const td = new Client({
                refreshToken: 'test_refresh_token',
            })
            expect(td.isRefreshTokenExpired()).toBeTruthy()
        }) // test
    }) // group
    describe('Other', () => {
        it('should add apiKey suffix, if it is not provided', () => {
            const api = new Client(Object.assign({}, config, {
                apiKey: config.apiKey.replace('@AMER.OAUTHAP', '')
            }))
            return api
                .getQuote('symbol')
                .then(data => {
                    assertApiCall(data, {
                        params: expectedApiKey,
                    })
                })
        }) // test
        it('should return axios response, if `returnFullResponse` is TRUE', () => {
            const api = new Client(Object.assign({}, config, {
                returnFullResponse: true
            }))
            return api
                .getQuote('symbol')
                .then(res => {
                    expect(res).toHaveProperty('data')
                    expect(res).toHaveProperty('headers')
                    expect(res).toHaveProperty('status', 200)
                    assertApiCall(res.data, {
                        method: 'GET',
                        url: '/marketdata/symbol/quotes',
                        params: expectedApiKey,
                        headers: expectedAuthorization,
                    })
                })
        }) // test
        it('should return the axios error reponse, if `returnFullResponse` is TRUE', async () => {
            const api = new Client(Object.assign({}, config, {
                returnFullResponse: true
            }))
            mockAxios.reset()
            mockAxios.onAny().replyOnce(404, {
                error: 'nothing to see here'
            })
            mockAxios.onAny().networkErrorOnce()
            // server error
            await api
                .getQuote('symbol')
                .then(() => 'should never happen')
                .catch(err => {
                    expect(err).toHaveProperty('isAxiosError', true)
                })
                .then(res => expect(res).toBeUndefined())
            // network error
            await api
                .getQuote('symbol')
                .then(() => 'should never happen')
                .catch(err => {
                    expect(err).toHaveProperty('isAxiosError', true)
                })
                .then(res => expect(res).toBeUndefined())
        }) // test
        it('should return custom error, if `returnFullResponse` is FALSE', async () => {
            const api = new Client(Object.assign({}, config, {
                returnFullResponse: false
            }))
            mockAxios.reset()
            mockAxios.onAny().replyOnce(404, {
                error: 'nothing to see here'
            })
            mockAxios.onAny().networkErrorOnce()
            // server error
            await api
                .getQuote('symbol')
                .then(() => 'should never happen')
                .catch(err => {
                    expect(err).toStrictEqual({
                        error: 'nothing to see here',
                        status: 404
                    })
                })
                .then(res => expect(res).toBeUndefined())
            // network error
            await api
                .getQuote('symbol')
                .then(() => 'should never happen')
                .catch(err => {
                    expect(err).toHaveProperty('message', 'Network Error')
                    expect(err).toHaveProperty('stack')
                    expect(err.stack.startsWith('Error: Network Error')).toBeTruthy()
                })
                .then(res => expect(res).toBeUndefined())
        }) // test
        it('should refresh token on 401 response and retry request, if `refreshAndRetry` is set to TRUE', () => {
            const api = new Client(Object.assign({}, config, {
                refreshAndRetry: true,
            }))
            const mockResponse = {
                access_token: 'new_test_access_token',
                refresh_token: 'new_test_refresh_token',
                scope: 'PlaceTrades AccountAccess MoveMoney',
                expires_in: 1800,
                refresh_token_expires_in: 7776000,
                token_type: 'Bearer'
            }
            mockAxios.reset()
            mockAxios
                .onGet('/accounts').replyOnce(401)
                .onPost('/oauth2/token').replyOnce(200, mockResponse)
                .onGet('/accounts').replyOnce(200, { accounts: [] })

            expect(api.config.accessToken).toEqual('test_access_token')
            return api
                .getAccounts()
                .then(res => {
                    expect(res).toEqual({ accounts: [] })
                    expect(api.config.accessToken).toEqual('new_test_access_token')
                    expect(api.config.refreshToken).toEqual('new_test_refresh_token')
                })
        }) // test
        it('should NOT refresh token on 401 response nor retry request, if `refreshAndRetry` is set to FALSE', () => {
            const api = new Client(Object.assign({}, config, {
                refreshAndRetry: true,
            }))
            const mockResponse = {
                access_token: 'new_test_access_token',
                refresh_token: 'new_test_refresh_token',
                scope: 'PlaceTrades AccountAccess MoveMoney',
                expires_in: 1800,
                refresh_token_expires_in: 7776000,
                token_type: 'Bearer'
            }
            mockAxios.reset()
            mockAxios
                .onPost('/oauth2/token').replyOnce(401)
                .onPost('/oauth2/token').replyOnce(200, mockResponse)
                .onPost('/oauth2/token').replyOnce(200, mockResponse)

            expect(api.config.accessToken).toEqual('test_access_token')
            return api
                .refreshAccessToken()
                .then(res => {
                    expect(res).toEqual({ accounts: [] })
                    expect(api.config.accessToken).toEqual('new_test_access_token')
                    expect(api.config.refreshToken).toEqual('new_test_refresh_token')
                })
                .catch(debug)
        }) // test
    }) // group
}) // group
