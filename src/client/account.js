'use strict'

const Base = require('./base')

const accounts = require('./resources/accounts')
const orders = require('./resources/orders')
const savedOrders = require('./resources/savedOrders')
const watchlists = require('./resources/watchlists')
const transactions = require('./resources/transactions')

/**
 * @typedef {import('./config').Config} Config
 */
/**
 * @class
 * @typicalname account
 */
class TDAccount extends Base {
    /**
     * @param {string} accountId The account id
     * @param {Config} [config] Config
     */
    constructor(accountId, config) {
        super(config)
        this.accountId = accountId
    }
}

/**
 * @typedef {import('./resources/accounts').AccountFields} AccountFields
 */
/**
 * Get account balances, positions, and orders.
 *
 * @param {AccountFields|AccountFields[]} [fields] Fields to include
 * @function
 * @returns {Promise<any>} The requested account
 */
TDAccount.prototype.getAccount = function (fields) {
    return accounts.getAccount.call(this, [this.accountId, fields])
}

/**
 * Get account positions.
 *
 * @function
 * @returns {Promise<any>} The requested account's positions
 */
TDAccount.prototype.getPositions = function () {
    return accounts.getPositions.call(this, [this.accountId])
}

/**
 * Get account preferences.
 *
 * @function
 * @returns {Promise<any>} The account preferences
 */
TDAccount.prototype.getPreferences = function () {
    return accounts.getPreferences.call(this, [this.accountId])
}

/**
 * @typedef {import('./resources/accounts').Preferences} Preferences
 */
/**
 * Update account preferences. The `directOptionsRouting` and
 * `directEquityRouting` values cannot be modified via this operation.
 *
 * @function
 * @param {Preferences} preferences The updated preferences
 * @returns {Promise<any>} Success
 */
TDAccount.prototype.updatePreferences = function (preferences) {
    return accounts.updatePreferences.call(this, [this.accountId, preferences])
}

/**
 * Get the SubscriptionKey.
 *
 * @function
 * @returns {Promise<any>} The susbscription keys
 */
TDAccount.prototype.getStreamerSubscriptionKeys = function () {
    return accounts.getStreamerSubscriptionKeys.call(this, [this.accountId])
}

/**
 * @typedef {import('./resources/orders').OrdersQuery} OrdersQuery
 */
/**
 * Get a list of orders.
 *
 * @function
 * @param {OrdersQuery} params The query parameters
 * @returns {Promise<any>} List of orders
 */
TDAccount.prototype.getOrders = function (params) {
    return orders.getOrders.call(this, [this.accountId, params])
}

/**
 * Get a specific order.
 *
 * @function
 * @param {string} orderId The order id
 * @returns {Promise<any>} The order details
 */
TDAccount.prototype.getOrder = function (orderId) {
    return orders.getOrder.call(this, [this.accountId, orderId])
}

/**
 * Place an order.
 * Read {@link https://developer.tdameritrade.com/content/place-order-samples Place Order Samples} for more info.
 *
 * @function
 * @param {object} order The order
 * @returns {Promise<any>} Success
 */
TDAccount.prototype.placeOrder = function (order) {
    return orders.placeOrder.call(this, [this.accountId, order])
}

/**
 * Replace an existing order. The existing order will be replaced by the new order.
 * Once replaced, the old order will be canceled and a new order will be created.
 *
 * @function
 * @param {string} orderId The order id
 * @param {object} order The new order
 * @returns {Promise<any>} Success
 */
TDAccount.prototype.replaceOrder = function (orderId, order) {
    return orders.replaceOrder.call(this, [this.accountId, orderId, order])
}

/**
 * Cancel a specific order.
 *
 * @function
 * @param {string} orderId The order id
 * @returns {Promise<any>} Success
 */
TDAccount.prototype.cancelOrder = function (orderId) {
    return orders.cancelOrder.call(this, [this.accountId, orderId])
}

/**
 * Save an order.
 *
 * @function
 * @param {object} savedOrder The saved order
 * @returns {Promise<any>} Success
 */
TDAccount.prototype.createSavedOrder = function (savedOrder) {
    return savedOrders.createSavedOrder.call(this, [this.accountId, savedOrder])
}

/**
 * Delete a specific saved order.
 *
 * @function
 * @param {string} savedOrderId The saved order id
 * @returns {Promise<any>} Success
 */
TDAccount.prototype.deleteSavedOrder = function (savedOrderId) {
    return savedOrders.deleteSavedOrder.call(this, [this.accountId, savedOrderId])
}

/**
 * Get saved order by its ID.
 *
 * @function
 * @param {string} savedOrderId The saved order id
 * @returns {Promise<any>} The saved order details
 */
TDAccount.prototype.getSavedOrder = function (savedOrderId) {
    return savedOrders.getSavedOrder.call(this, [this.accountId, savedOrderId])
}

/**
 * Get saved orders.
 *
 * @function
 * @returns {Promise<any>} List of saved orders
 */
TDAccount.prototype.getSavedOrders = function () {
    return savedOrders.getSavedOrders.call(this, [this.accountId])
}

/**
 * Replace an existing saved order for an account. The existing saved order will be replaced by the new order.
 *
 * @function
 * @param {string} savedOrderId The saved order id
 * @param {object} savedOrder The new saved order
 * @returns {Promise<any>} Success
 */
TDAccount.prototype.replaceSavedOrder = function (savedOrderId, savedOrder) {
    return savedOrders.replaceSavedOrder.call(this, [this.accountId, savedOrderId, savedOrder])
}

/**
 * @typedef {import('./resources/watchlists').Watchlist} Watchlist
 */
/**
 * Create watchlist.
 *
 * @function
 * @param {Watchlist} watchlist The watchlist
 * @returns {Promise<any>} Success
 */
TDAccount.prototype.createWatchlist = function (watchlist) {
    return watchlists.createWatchlist.call(this, [this.accountId, watchlist])
}

/**
 * Delete watchlist.
 *
 * @function
 * @param {string} watchlistId The watchlist id
 * @returns {Promise<any>} Success
 */
TDAccount.prototype.deleteWatchlist = function (watchlistId) {
    return watchlists.deleteWatchlist.call(this, [this.accountId, watchlistId])
}

/**
 * Get watchlist.
 *
 * @function
 * @param {string} watchlistId The watchlist id
 * @returns {Promise<any>} Success
 */
TDAccount.prototype.getWatchlist = function (watchlistId) {
    return watchlists.getWatchlist.call(this, [this.accountId, watchlistId])
}

/**
 * Get all watchlists.
 *
 * @function
 * @returns {Promise<any>} List of watchlists
 */
TDAccount.prototype.getWatchlists = function () {
    return watchlists.getWatchlists.call(this, [this.accountId])
}

/**
 * Replace watchlist. This method does not verify that the symbol or asset type are valid.
 *
 * @function
 * @param {string} watchlistId The watchlist id
 * @param {Watchlist} watchlist The watchlist
 * @returns {Promise<any>} Success
 */
TDAccount.prototype.replaceWatchlist = function (watchlistId, watchlist) {
    return watchlists.replaceWatchlist.call(this, [this.accountId, watchlistId, watchlist])
}

/**
 * Partially update watchlist: change watchlist name, add to the
 * beginning/end of a watchlist, update or delete items in a watchlist.
 * This method does not verify that the symbol or asset type are valid.
 *
 * @function
 * @param {string} watchlistId The watchlist id
 * @param {Watchlist} watchlist The new watchlist
 * @returns {Promise<any>} Success
 */
TDAccount.prototype.updateWatchlist = function (watchlistId, watchlist) {
    return watchlists.updateWatchlist.call(this, [this.accountId, watchlistId, watchlist])
}

/**
 * Get a transaction.
 *
 * @function
 * @param {string} transactionId The transaction id
 * @returns {Promise<any>} The transaction details
 */
TDAccount.prototype.getTransaction = function (transactionId) {
    return transactions.getTransaction.call(this, [this.accountId, transactionId])
}

/**
 * @typedef {import('./resources/transactions').TransactionQuery} TransactionQuery
 */
/**
 * Get all transactions.
 *
 * @function
 * @param {TransactionQuery} params The query parameters
 * @returns {Promise<any>} The transaction history
 */
TDAccount.prototype.getTransactions = function (params) {
    return transactions.getTransactions.call(this, [this.accountId, params])
}

module.exports = TDAccount
