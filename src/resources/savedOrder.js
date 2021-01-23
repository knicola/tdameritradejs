'use strict'

/**
 * Get saved order by its ID, for a specific account.
 * @param {string} accountId The account id
 * @param {string} savedOrderId The saved order id
 * @returns {Promise<any>} The saved order details
 */
function getSavedOrder(accountId, savedOrderId) {
    return this.axios.get(`/accounts/${accountId}/savedorders/${savedOrderId}`)
} // getSavedOrder()

/**
 * Get saved orders for a specific account.
 * @param {string} accountId The account id
 * @returns {Promise<any>} List of saved orders
 */
function getSavedOrders(accountId) {
    return this.axios.get(`/accounts/${accountId}/savedorders`)
} // getSavedOrdersByPath()

/**
 * Save an order for a specific account.
 * @param {string} accountId The account id
 * @param {object} savedOrder The saved order
 * @returns {Promise<any>} Success
 */
function createSavedOrder(accountId, savedOrder) {
    return this.axios.post(`/accounts/${accountId}/savedorders`, savedOrder)
} // createSavedOrder()

/**
 * Replace an existing saved order for an account. The existing saved order will be replaced by the new order.
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
 * @param {string} accountId The account id
 * @param {string} savedOrderId The saved order id
 * @returns {Promise<any>} Success
 */
function deleteSavedOrder(accountId, savedOrderId) {
    return this.axios.delete(`/accounts/${accountId}/savedorders/${savedOrderId}`)
} // deleteSavedOrder()

module.exports = {
    createSavedOrder,
    deleteSavedOrder,
    getSavedOrder,
    getSavedOrders,
    replaceSavedOrder,
}
