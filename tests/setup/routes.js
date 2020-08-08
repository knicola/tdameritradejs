'use strict'

const pub = require('express').Router()
const unauth = require('express').Router()
const auth = require('express').Router()
const { apiResponse } = require('./common')

// AUTHENTICATION
pub.post('/oauth2/token', apiResponse)

// MARKET
unauth.get('/marketdata/hours', apiResponse)
unauth.get('/marketdata/:index/movers', apiResponse)
unauth.get('/marketdata/quotes', apiResponse)
unauth.get('/marketdata/:symbol/quotes', apiResponse)
unauth.get('/marketdata/:symbol/pricehistory', apiResponse)
unauth.get('/marketdata/chains', apiResponse)

// INSTRUMENT
unauth.get('/instruments', apiResponse)
unauth.get('/instruments/:cusip', apiResponse)

// ACCOUNTS
auth.get('/accounts', apiResponse)
auth.get('/accounts/:accountId', apiResponse)
auth.get('/accounts/:accountId/preferences', apiResponse)
auth.put('/accounts/:accountId/preferences', apiResponse)

// ORDERS
auth.get('/orders', apiResponse)
auth.get('/accounts/:accountId/orders', apiResponse)
auth.post('/accounts/:accountId/orders', apiResponse)
auth.get('/accounts/:accountId/orders/:orderId', apiResponse)
auth.put('/accounts/:accountId/orders/:orderId', apiResponse)
auth.delete('/accounts/:accountId/orders/:orderId', apiResponse)

// SAVED ORDERS
auth.get('/accounts/:accountId/savedorders', apiResponse)
auth.post('/accounts/:accountId/savedorders', apiResponse)
auth.get('/accounts/:accountId/savedorders/:savedOrderId', apiResponse)
auth.put('/accounts/:accountId/savedorders/:savedOrderId', apiResponse)
auth.delete('/accounts/:accountId/savedorders/:savedOrderId', apiResponse)

// TRANSACTIONS
auth.get('/accounts/:accountId/transactions', apiResponse)
auth.get('/accounts/:accountId/transactions/:transactionId', apiResponse)

// USER PRINCIPALS
auth.get('/userprincipals', apiResponse)
auth.get('/userprincipals/streamersubscriptionkeys', apiResponse)

// WATCHLISTS
auth.get('/accounts/watchlists', apiResponse)
auth.post('/accounts/:accountId/watchlists', apiResponse)
auth.get('/accounts/:accountId/watchlists', apiResponse)
auth.get('/accounts/:accountId/watchlists/:watchlistId', apiResponse)
auth.put('/accounts/:accountId/watchlists/:watchlistId', apiResponse)
auth.patch('/accounts/:accountId/watchlists/:watchlistId', apiResponse)
auth.delete('/accounts/:accountId/watchlists/:watchlistId', apiResponse)

module.exports = {
    pub,
    unauth,
    auth,
}
