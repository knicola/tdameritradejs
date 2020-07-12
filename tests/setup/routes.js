'use strict'

const routes = require('express').Router()
const { apiResponse } = require('./common')

// MARKET
routes.get('/marketdata/hours', apiResponse)
routes.get('/marketdata/:index/movers', apiResponse)
routes.get('/marketdata/quotes', apiResponse)
routes.get('/marketdata/:symbol/quotes', apiResponse)
routes.get('/marketdata/:symbol/pricehistory', apiResponse)
routes.get('/marketdata/chains', apiResponse)

// INSTRUMENT
routes.get('/instruments', apiResponse)
routes.get('/instruments/:cusip', apiResponse)

// ACCOUNTS
routes.get('/accounts', apiResponse)
routes.get('/accounts/:accountId', apiResponse)
routes.get('/accounts/:accountId/preferences', apiResponse)
routes.put('/accounts/:accountId/preferences', apiResponse)

// ORDERS
routes.get('/orders', apiResponse)
routes.get('/accounts/:accountId/orders', apiResponse)
routes.post('/accounts/:accountId/orders', apiResponse)
routes.get('/accounts/:accountId/orders/:orderId', apiResponse)
routes.put('/accounts/:accountId/orders/:orderId', apiResponse)
routes.delete('/accounts/:accountId/orders/:orderId', apiResponse)

// SAVED ORDERS
routes.get('/accounts/:accountId/savedorders', apiResponse)
routes.post('/accounts/:accountId/savedorders', apiResponse)
routes.get('/accounts/:accountId/savedorders/:savedOrderId', apiResponse)
routes.put('/accounts/:accountId/savedorders/:savedOrderId', apiResponse)
routes.delete('/accounts/:accountId/savedorders/:savedOrderId', apiResponse)

// TRANSACTIONS
routes.get('/accounts/:accountId/transactions', apiResponse)
routes.get('/accounts/:accountId/transactions/:transactionId', apiResponse)

// USER PRINCIPALS
routes.get('/userprincipals', apiResponse)
routes.get('/userprincipals/streamersubscriptionkeys', apiResponse)

// WATCHLISTS
routes.get('/accounts/watchlists', apiResponse)
routes.post('/accounts/:accountId/watchlists', apiResponse)
routes.get('/accounts/:accountId/watchlists', apiResponse)
routes.get('/accounts/:accountId/watchlists/:watchlistId', apiResponse)
routes.put('/accounts/:accountId/watchlists/:watchlistId', apiResponse)
routes.patch('/accounts/:accountId/watchlists/:watchlistId', apiResponse)
routes.delete('/accounts/:accountId/watchlists/:watchlistId', apiResponse)

module.exports = routes
