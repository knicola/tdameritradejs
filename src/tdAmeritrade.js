'use strict'

const http = require('./http')
const market = require('./resources/market')
const instrument = require('./resources/instrument')
const account = require('./resources/account')
const userPrincipal = require('./resources/userPrincipal')
const order = require('./resources/order')
const savedOrder = require('./resources/savedOrder')
const watchlist = require('./resources/watchlist')
const transaction = require('./resources/transaction')

const defaults = require('./config')
const apiKeySuffix = '@AMER.OAUTHAP'

function TDAmeritrade(config) {
    this.config = Object.assign({}, defaults, config, {
        apiKey: (config.apiKey + '').endsWith(apiKeySuffix)
            ? config.apiKey
            : config.apiKey + apiKeySuffix
    })
} // TDAmeritrade()

TDAmeritrade.prototype.http = http

// MARKET
TDAmeritrade.prototype.getMarketHours = market.getMarketHours
TDAmeritrade.prototype.getMovers = market.getMovers
TDAmeritrade.prototype.getQuotes = market.getQuotes
TDAmeritrade.prototype.getQuote = market.getQuote
TDAmeritrade.prototype.getPriceHistory = market.getPriceHistory
TDAmeritrade.prototype.getOptionChain = market.getOptionChain

// INSTRUMENTS
TDAmeritrade.prototype.searchInstruments = instrument.searchInstruments
TDAmeritrade.prototype.getInstrument = instrument.getInstrument

// ACCOUNT
TDAmeritrade.prototype.getAccounts = account.getAccounts
TDAmeritrade.prototype.getAccount = account.getAccount

// PREFERENCES
TDAmeritrade.prototype.getPreferences = account.getPreferences
TDAmeritrade.prototype.updatePreferences = account.updatePreferences

// USER PRINCIPAL
TDAmeritrade.prototype.getUserPrincipals = userPrincipal.getUserPrincipals
TDAmeritrade.prototype.getStreamerSubscriptionKeys = userPrincipal.getStreamerSubscriptionKeys

// ORDERS
TDAmeritrade.prototype.getAllOrders = order.getAllOrders
TDAmeritrade.prototype.getOrders = order.getOrders
TDAmeritrade.prototype.getOrder = order.getOrder
TDAmeritrade.prototype.placeOrder = order.placeOrder
TDAmeritrade.prototype.replaceOrder = order.replaceOrder
TDAmeritrade.prototype.cancelOrder = order.cancelOrder

// SAVED ORDERS
TDAmeritrade.prototype.createSavedOrder = savedOrder.createSavedOrder
TDAmeritrade.prototype.deleteSavedOrder = savedOrder.deleteSavedOrder
TDAmeritrade.prototype.getSavedOrder = savedOrder.getSavedOrder
TDAmeritrade.prototype.getSavedOrders = savedOrder.getSavedOrders
TDAmeritrade.prototype.replaceSavedOrder = savedOrder.replaceSavedOrder

// WATCHLISTS
TDAmeritrade.prototype.createWatchlist = watchlist.createWatchlist
TDAmeritrade.prototype.deleteWatchlist = watchlist.deleteWatchlist
TDAmeritrade.prototype.getWatchlist = watchlist.getWatchlist
TDAmeritrade.prototype.getWatchlists = watchlist.getWatchlists
TDAmeritrade.prototype.getAllWatchlists = watchlist.getAllWatchlists
TDAmeritrade.prototype.replaceWatchlist = watchlist.replaceWatchlist
TDAmeritrade.prototype.updateWatchlist = watchlist.updateWatchlist

// TRANSACTIONS
TDAmeritrade.prototype.getTransaction = transaction.getTransaction
TDAmeritrade.prototype.getTransactions = transaction.getTransactions

module.exports = TDAmeritrade

module.exports.default = TDAmeritrade
