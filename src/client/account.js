'use strict'

const Client = require('./client')
const partial = require('lodash/partial')

/**
 * @class
 * @augments Client
 */
class TDAccount extends Client {
    constructor(accountId) {
        super({})

        /** @ignore */ this.authorize = undefined
        /** @ignore */ this.login = undefined
        /** @ignore */ this.account = undefined
        /** @ignore */ this.streamer = undefined
        /** @ignore */ this.getAllOrders = undefined
        /** @ignore */ this.getAllWatchlists = undefined

        /**
         * Get account balances, positions, and orders.
         *
         * @function
         * @returns {Promise<any>} The requested account
         */
        this.getAccount = partial(super.getAccount, accountId)

        /**
         * Get account preferences.
         *
         * @function
         * @returns {Promise<any>} The account preferences
         */
        this.getPreferences = partial(super.getPreferences, accountId)

        /** @typedef {import('./client').Preferences} Preferences */
        /**
         * Update account preferences. The `directOptionsRouting` and
         * `directEquityRouting` values cannot be modified via this operation.
         *
         * @function
         * @param {Preferences} preferences The updated preferences
         * @returns {Promise<any>} Success
         */
        this.updatePreferences = partial(super.updatePreferences, accountId)

        /**
         * Get the SubscriptionKey.
         *
         * @function
         * @returns {Promise<any>} The susbscription keys
         */
        this.getStreamerSubscriptionKeys = partial(super.getStreamerSubscriptionKeys, accountId)

        /** @typedef {import('./client').OrdersQuery} OrdersQuery */
        /**
         * Get a list of orders.
         *
         * @function
         * @param {OrdersQuery} params The query parameters
         * @returns {Promise<any>} List of orders
         */
        this.getOrders = partial(super.getOrders, accountId)

        /**
         * Get a specific order.
         *
         * @function
         * @param {string} orderId The order id
         * @returns {Promise<any>} The order details
         */
        this.getOrder = partial(super.getOrder, accountId)

        /**
         * Place an order.
         * Read {@link https://developer.tdameritrade.com/content/place-order-samples Place Order Samples} for more info.
         *
         * @function
         * @param {object} order The order
         * @returns {Promise<any>} Success
         */
        this.placeOrder = partial(super.placeOrder, accountId)

        /**
         * Replace an existing order. The existing order will be replaced by the new order.
         * Once replaced, the old order will be canceled and a new order will be created.
         *
         * @function
         * @param {string} orderId The order id
         * @param {object} order The new order
         * @returns {Promise<any>} Success
         */
        this.replaceOrder = partial(super.replaceOrder, accountId)

        /**
         * Cancel a specific order.
         *
         * @function
         * @param {string} orderId The order id
         * @returns {Promise<any>} Success
         */
        this.cancelOrder = partial(super.cancelOrder, accountId)

        /**
         * Save an order.
         *
         * @function
         * @param {object} savedOrder The saved order
         * @returns {Promise<any>} Success
         */
        this.createSavedOrder = partial(super.createSavedOrder, accountId)

        /**
         * Delete a specific saved order.
         *
         * @function
         * @param {string} savedOrderId The saved order id
         * @returns {Promise<any>} Success
         */
        this.deleteSavedOrder = partial(super.deleteSavedOrder, accountId)

        /**
         * Get saved order by its ID.
         *
         * @function
         * @param {string} savedOrderId The saved order id
         * @returns {Promise<any>} The saved order details
         */
        this.getSavedOrder = partial(super.getSavedOrder, accountId)

        /**
         * Get saved orders.
         *
         * @function
         * @returns {Promise<any>} List of saved orders
         */
        this.getSavedOrders = partial(super.getSavedOrders, accountId)

        /**
         * Replace an existing saved order for an account. The existing saved order will be replaced by the new order.
         *
         * @function
         * @param {string} savedOrderId The saved order id
         * @param {object} savedOrder The new saved order
         * @returns {Promise<any>} Success
         */
        this.replaceSavedOrder = partial(super.replaceSavedOrder, accountId)

        /** @typedef {import('./client').Watchlist} Watchlist */
        /**
         * Create watchlist.
         *
         * @function
         * @param {Watchlist} watchlist The watchlist
         * @returns {Promise<any>} Success
         */
        this.createWatchlist = partial(super.createWatchlist, accountId)

        /**
         * Delete watchlist.
         *
         * @function
         * @param {string} watchlistId The watchlist id
         * @returns {Promise<any>} Success
         */
        this.deleteWatchlist = partial(super.deleteWatchlist, accountId)

        /**
         * Get watchlist.
         *
         * @function
         * @param {string} watchlistId The watchlist id
         * @returns {Promise<any>} Success
         */
        this.getWatchlist = partial(super.getWatchlist, accountId)

        /**
         * Get all watchlists.
         *
         * @function
         * @returns {Promise<any>} List of watchlists
         */
        this.getWatchlists = partial(super.getWatchlists, accountId)

        /**
         * Replace watchlist. This method does not verify that the symbol or asset type are valid.
         *
         * @function
         * @param {string} watchlistId The watchlist id
         * @param {Watchlist} watchlist The watchlist
         * @returns {Promise<any>} Success
         */
        this.replaceWatchlist = partial(super.replaceWatchlist, accountId)

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
        this.updateWatchlist = partial(super.updateWatchlist, accountId)

        /**
         * Get a transaction.
         *
         * @function
         * @param {string} transactionId The transaction id
         * @returns {Promise<any>} The transaction details
         */
        this.getTransaction = partial(super.getTransaction, accountId)

        /** @typedef {import('./client').TransactionQuery} TransactionQuery */
        /**
         * Get all transactions.
         *
         * @function
         * @param {TransactionQuery} params The query parameters
         * @returns {Promise<any>} The transaction history
         */
        this.getTransactions = partial(super.getTransactions, accountId)
    }
}

module.exports = TDAccount
