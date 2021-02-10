'use strict'

/**
 * Get saved order by its ID, for a specific account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} savedOrderId The saved order id
 * @returns {Promise<any>} The saved order details
 */
function getSavedOrder(accountId, savedOrderId) {
    return this.axios.get(`/accounts/${accountId}/savedorders/${savedOrderId}`)
} // getSavedOrder()

/**
 * Get saved orders for a specific account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @returns {Promise<any>} List of saved orders
 */
function getSavedOrders(accountId) {
    return this.axios.get(`/accounts/${accountId}/savedorders`)
} // getSavedOrdersByPath()

/**
 * Save an order for a specific account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {object} savedOrder The saved order
 * @returns {Promise<any>} Success
 *
 * @example
 * await td.createSavedOrder('45678', {
 *     complexOrderStrategyType: 'NONE',
 *     orderType: 'LIMIT',
 *     session: 'NORMAL',
 *     price: '6.45',
 *     duration: 'DAY',
 *     orderStrategyType: 'SINGLE',
 *     orderLegCollection: [
 *         {
 *             instruction: 'BUY_TO_OPEN',
 *             quantity: 10,
 *             instrument: {
 *                 symbol: 'XYZ_032015C49',
 *                 assetType: 'OPTION'
 *             }
 *         }
 *     ]
 * })
 */
function createSavedOrder(accountId, savedOrder) {
    return this.axios.post(`/accounts/${accountId}/savedorders`, savedOrder)
} // createSavedOrder()

/**
 * Replace an existing saved order for an account. The existing saved order will be replaced by the new order.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} savedOrderId The saved order id
 * @param {object} savedOrder The new saved order
 * @returns {Promise<any>} Success
 */
function replaceSavedOrder(accountId, savedOrderId, savedOrder) {
    return this.axios.put(`/accounts/${accountId}/savedorders/${savedOrderId}`, savedOrder)
} // replaceSavedOrder()

/**
 * Delete a specific saved order for a specific account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} savedOrderId The saved order id
 * @returns {Promise<any>} Success
 *
 * @example
 * await td.deleteSavedOrder('45678', '98754')
 */
function deleteSavedOrder(accountId, savedOrderId) {
    return this.axios.delete(`/accounts/${accountId}/savedorders/${savedOrderId}`)
} // deleteSavedOrder()

module.exports = {
    getSavedOrder,
    getSavedOrders,
    createSavedOrder,
    replaceSavedOrder,
    deleteSavedOrder,
}
