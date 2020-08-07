'use strict'

const debug = require('debug')('ameritrade:tests') // eslint-disable-line no-unused-vars
// require('debug').enable('ameritrade:tests')

const { TDAmeritrade } = require('../src/')
const { assertApiCall } = require('./setup/common')

const config = {
    baseURL: 'https://localhost:3331/api',
    accessToken: 'test_access_token',
    apiKey: 'testClientId@AMER.OAUTHAP'
}

const api = new TDAmeritrade(config)

const expectedAuthorization = { authorization: 'Bearer test_access_token' }
const expectedApiKey = { apikey: 'testClientId@AMER.OAUTHAP' }

describe('TDAmeritrade', () => {
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
    describe('Other', () => {
        it('should add apiKey suffix, if it is not provided', () => {
            const api = new TDAmeritrade(Object.assign({}, config, {
                apiKey: config.apiKey.replace('@AMER.OAUTHAP', '')
            }))
            return api
                .getQuote('symbol')
                .then(data => {
                    assertApiCall(data, {
                        params: expectedApiKey,
                    })
                })
        })
        it('should return the full axios response, if `returnFullResponse` is set to true', () => {
            const api = new TDAmeritrade(Object.assign({}, config, {
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
        })
    }) // group
}) // group
