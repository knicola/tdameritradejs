'use strict'

/**
 * Get a specific order for a specific account.
 * @param {string} accountId The account id
 * @param {string} orderId The order id
 * @returns {Promise} The order details
 */
function getOrder(accountId, orderId) {
    return this.axios.get(`/accounts/${accountId}/orders/${orderId}`)
} // getOrder()

/**
 * @typedef {
        |'AWAITING_PARENT_ORDER'|'AWAITING_CONDITION'|'AWAITING_MANUAL_REVIEW'
        |'ACCEPTED'|'AWAITING_UR_OUT'|'PENDING_ACTIVATION'|'QUEUED'|'WORKING'
        |'REJECTED'|'PENDING_CANCEL'|'CANCELED'|'PENDING_REPLACE'|'REPLACED'
        |'FILLED'|'EXPIRED'
    } OrderStatus
 */
/**
 * @typedef OrderParams
 * @property {number} maxResults The max number of orders to retrieve.
 * @property {string} fromEnteredTime Specifies that no orders entered before this time should be returned. Valid
 * ISO-8601 formats are: `yyyy-MM-dd`. Date must be within 60 days from today's date. `toEnteredTime` must also be set.
 * @property {string} toEnteredTime Specifies that no orders entered after this time should be returned. Valid
 * ISO-8601 formats are: `yyyy-MM-dd`. `fromEnteredTime` must also be set.
 * @property {OrderStatus} status Specifies that only orders of this status should be returned.
 */
/**
 * Get a list of orders for a specific account.
 * @param {string} accountId The account id
 * @param {OrderParams} params The query parameters
 * @returns {Promise} List of orders
 */
function getOrders(accountId, params) {
    return this.axios.get(`/accounts/${accountId}/orders`, { params })
} // getOrders()

/**
 * Get a list of orders from all accounts.
 * @param {OrderParams} params The query parameters
 * @returns {Promise} List of orders
 */
function getAllOrders(params) {
    return this.axios.get('/orders', { params })
} // getAllOrders()

function placeOrder(accountId, order) {
    return this.axios.post(`/accounts/${accountId}/orders`, order)
} // placeOrder()

function replaceOrder(accountId, orderId, order) {
    return this.axios.put(`/accounts/${accountId}/orders/${orderId}`, order)
} // replaceOrder()

function cancelOrder(accountId, orderId) {
    return this.axios.delete(`/accounts/${accountId}/orders/${orderId}`)
} // cancelOrder()

module.exports = {
    getOrder,
    getOrders,
    getAllOrders,
    placeOrder,
    replaceOrder,
    cancelOrder,
}
