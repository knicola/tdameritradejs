'use strict'

/* eslint jsdoc/valid-types: 0 */

const Client = require('.')
const partial = require('lodash/partial')

/**
 * @class
 * @augments Client
 */
class Account extends Client {
    constructor(accountId) {
        super()

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

        /** @typedef {import('./index').Preferences} Preferences */
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

        /** @typedef {import('./index').OrderQuery} OrderQuery */
        /**
         * Get a list of orders.
         *
         * @function
         * @param {OrderQuery} params The query parameters
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

        // SAVED ORDERS
        this.createSavedOrder = partial(super.createSavedOrder, accountId)
        this.deleteSavedOrder = partial(super.deleteSavedOrder, accountId)
        this.getSavedOrder = partial(super.getSavedOrder, accountId)
        this.getSavedOrders = partial(super.getSavedOrders, accountId)
        this.replaceSavedOrder = partial(super.replaceSavedOrder, accountId)

        // WATCHLISTS
        this.createWatchlist = partial(super.createWatchlist, accountId)
        this.deleteWatchlist = partial(super.deleteWatchlist, accountId)
        this.getWatchlist = partial(super.getWatchlist, accountId)
        this.getWatchlists = partial(super.getWatchlists, accountId)
        this.replaceWatchlist = partial(super.replaceWatchlist, accountId)
        this.updateWatchlist = partial(super.updateWatchlist, accountId)

        // TRANSACTIONS
        this.getTransaction = partial(super.getTransaction, accountId)
        this.getTransactions = partial(super.getTransactions, accountId)
    }
}

module.exports = Account
