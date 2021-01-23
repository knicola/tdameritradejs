'use strict'

const partial = require('lodash/partial')
const http = require('./http')
const account = require('./resources/account')
const order = require('./resources/order')
const savedOrder = require('./resources/savedOrder')
const watchlist = require('./resources/watchlist')
const transaction = require('./resources/transaction')
const userPrincipal = require('./resources/userPrincipal')

/**
 * @class
 * @param {string} accountId The account id
 * @param {object} config The config
 */
function TDAccount(accountId, config) {
    http.call(this, config)

    // ACCOUNT INFO
    this.getAccount = partial(account.getAccount, accountId)

    // PREFERENCES
    this.getPreferences = partial(account.getPreferences, accountId)
    this.updatePreferences = partial(account.updatePreferences, accountId)

    // USER PRINCIPAL
    this.getStreamerSubscriptionKeys = partial(userPrincipal.getStreamerSubscriptionKeys, accountId)
    this.getUserPrincipals = userPrincipal.getUserPrincipals

    // ORDERS
    this.getOrders = partial(order.getOrders, accountId)
    this.getOrder = partial(order.getOrder, accountId)
    this.placeOrder = partial(order.placeOrder, accountId)
    this.replaceOrder = partial(order.replaceOrder, accountId)
    this.cancelOrder = partial(order.cancelOrder, accountId)

    // SAVED ORDERS
    this.createSavedOrder = partial(savedOrder.createSavedOrder, accountId)
    this.deleteSavedOrder = partial(savedOrder.deleteSavedOrder, accountId)
    this.getSavedOrder = partial(savedOrder.getSavedOrder, accountId)
    this.getSavedOrders = partial(savedOrder.getSavedOrders, accountId)
    this.replaceSavedOrder = partial(savedOrder.replaceSavedOrder, accountId)

    // WATCHLISTS
    this.createWatchlist = partial(watchlist.createWatchlist, accountId)
    this.deleteWatchlist = partial(watchlist.deleteWatchlist, accountId)
    this.getWatchlist = partial(watchlist.getWatchlist, accountId)
    this.getWatchlists = partial(watchlist.getWatchlists, accountId)
    this.replaceWatchlist = partial(watchlist.replaceWatchlist, accountId)
    this.updateWatchlist = partial(watchlist.updateWatchlist, accountId)

    // TRANSACTIONS
    this.getTransaction = partial(transaction.getTransaction, accountId)
    this.getTransactions = partial(transaction.getTransactions, accountId)
} // Account()

module.exports = TDAccount
