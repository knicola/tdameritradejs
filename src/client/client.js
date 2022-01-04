'use strict'

const debug = require('debug')('ameritrade:client') // eslint-disable-line no-unused-vars

const Base = require('./base')

/**
 * @ignore
 */
class Client extends Base {}

const market = require('./resources/market')
const accounts = require('./resources/accounts')
const orders = require('./resources/orders')
const savedOrders = require('./resources/savedOrders')
const watchlists = require('./resources/watchlists')
const transactions = require('./resources/transactions')

Client.prototype.getMarketHours = market.getMarketHours
Client.prototype.getMovers = market.getMovers
Client.prototype.getQuotes = market.getQuotes
Client.prototype.getQuote = market.getQuote
Client.prototype.getPriceHistory = market.getPriceHistory
Client.prototype.getOptionChain = market.getOptionChain
Client.prototype.searchInstruments = market.searchInstruments
Client.prototype.getInstrument = market.getInstrument
Client.prototype.getAccounts = accounts.getAccounts
Client.prototype.getAccount = accounts.getAccount
Client.prototype.getPositions = accounts.getPositions
Client.prototype.getPreferences = accounts.getPreferences
Client.prototype.updatePreferences = accounts.updatePreferences
Client.prototype.getStreamerSubscriptionKeys = accounts.getStreamerSubscriptionKeys
Client.prototype.getUserPrincipals = accounts.getUserPrincipals
Client.prototype.getOrder = orders.getOrder
Client.prototype.getOrders = orders.getOrders
Client.prototype.getAllOrders = orders.getAllOrders
Client.prototype.placeOrder = orders.placeOrder
Client.prototype.replaceOrder = orders.replaceOrder
Client.prototype.cancelOrder = orders.cancelOrder
Client.prototype.getSavedOrder = savedOrders.getSavedOrder
Client.prototype.getSavedOrders = savedOrders.getSavedOrders
Client.prototype.createSavedOrder = savedOrders.createSavedOrder
Client.prototype.replaceSavedOrder = savedOrders.replaceSavedOrder
Client.prototype.deleteSavedOrder = savedOrders.deleteSavedOrder
Client.prototype.createWatchlist = watchlists.createWatchlist
Client.prototype.deleteWatchlist = watchlists.deleteWatchlist
Client.prototype.getWatchlist = watchlists.getWatchlist
Client.prototype.getWatchlists = watchlists.getWatchlists
Client.prototype.getAllWatchlists = watchlists.getAllWatchlists
Client.prototype.replaceWatchlist = watchlists.replaceWatchlist
Client.prototype.updateWatchlist = watchlists.updateWatchlist
Client.prototype.getTransaction = transactions.getTransaction
Client.prototype.getTransactions = transactions.getTransactions

module.exports = Client
