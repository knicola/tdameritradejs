'use strict'

const debug = require('debug')('ameritrade:client') // eslint-disable-line no-unused-vars

const http = require('./http')
const market = require('./resources/market')
const instrument = require('./resources/instrument')
const account = require('./resources/account')
const userPrincipal = require('./resources/userPrincipal')
const order = require('./resources/order')
const savedOrder = require('./resources/savedOrder')
const watchlist = require('./resources/watchlist')
const transaction = require('./resources/transaction')
const TDStreamer = require('./tdStreamer')
const TDAccount = require('./tdAccount')
const get = require('lodash/get')

/**
 * @typedef {Settings & Tokens} Config
 *
 * @typedef {object} Settings
 * @property {string} baseUrl
 * @property {string} apiKey
 * @property {string} redirectUri
 * @property {string} sslKey
 * @property {string} sslCert
 * @property {boolean} refreshAndRetry
 * @property {boolean} returnFullResponse
 *
 * @typedef {object} Tokens
 * @property {string} accessToken
 * @property {string} refreshToken
 * @property {string} accessTokenExpiresAt
 * @property {string} refreshTokenExpiresAt
*/
/**
 * @class
 * @param {Config} config The config
 */
function TDAmeritrade(config) {
    http.call(this, config)
} // TDAmeritrade()

/**
 * TDAccount interface
 */
TDAmeritrade.prototype.TDAccount = TDAccount
/**
 * Create a new instance of TDAccount.
 * @param {string} accountId The account id
 * @returns {TDAccount} A new TDAccount instance
 */
TDAmeritrade.prototype.account = function account(accountId) {
    const instance = new TDAccount(accountId)
    instance.config = this.config
    return instance
} // account()

/**
 * TDStreamer interface
 */
TDAmeritrade.prototype.TDStreamer = TDStreamer
/**
 * Create a new instance of TDStreamer.
 * @note This will select the first available account for the time being.
 * @returns {Promise<TDStreamer>} A new TDStreamer instance
 */
TDAmeritrade.prototype.streamer = function streamer() {
    return this.getUserPrincipals([
        'streamerSubscriptionKeys',
        'streamerConnectionInfo',
    ]).then(res => {
        const userPrincipals = this.config.fullResponse ? get(res, 'data') : res
        const instance = new TDStreamer(userPrincipals)
        instance.config = this.config
        return instance
    })
} // streamer()

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
