'use strict'

/**
 * Get a specific order for a specific account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} orderId The order id
 * @returns {Promise<any>} The order details
 *
 * @example
 * const order = await td.getOrder('45678', '98745')
 */
function getOrder(accountId, orderId) {
    return this.axios.get(`/accounts/${accountId}/orders/${orderId}`)
} // getOrder()

/**
 * @typedef {'AWAITING_PARENT_ORDER'|'AWAITING_CONDITION'|'AWAITING_MANUAL_REVIEW'
 *   |'ACCEPTED'|'AWAITING_UR_OUT'|'PENDING_ACTIVATION'|'QUEUED'|'WORKING'
 *   |'REJECTED'|'PENDING_CANCEL'|'CANCELED'|'PENDING_REPLACE'|'REPLACED'
 *   |'FILLED'|'EXPIRED'
 * } OrderStatus
 */
/**
 * @typedef {object} OrdersQuery
 * @property {number} [maxResults] The max number of orders to retrieve.
 * @property {string} [fromEnteredTime] Specifies that no orders entered before this time should be returned. Valid
 * ISO-8601 formats are: `yyyy-MM-dd`. Date must be within 60 days from today's date. `toEnteredTime` must also be set.
 * @property {string} [toEnteredTime] Specifies that no orders entered after this time should be returned. Valid
 * ISO-8601 formats are: `yyyy-MM-dd`. `fromEnteredTime` must also be set.
 * @property {OrderStatus} [status] Specifies that only orders of this status should be returned.
 */
/**
 * Get a list of orders for a specific account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {OrdersQuery} params The query parameters
 * @returns {Promise<any>} List of orders
 *
 * @example
 *  const orders = await td.getOrders('45678', {
 *     fromEnteredTime: '2021-01-01',
 *     toEnteredTime: '2021-01-15',
 *     maxResults: 25,
 *     status: 'FILLED'
 * })
 */
function getOrders(accountId, params) {
    return this.axios.get(`/accounts/${accountId}/orders`, { params })
} // getOrders()

/**
 * Get a list of orders from all accounts.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {OrdersQuery} params The query parameters
 * @returns {Promise<any>} List of orders
 *
 * @example
 *  const orders = await td.getAllOrders({
 *     fromEnteredTime: '2021-01-01',
 *     toEnteredTime: '2021-01-15',
 *     maxResults: 25,
 *     status: 'FILLED'
 * })
 */
function getAllOrders(params) {
    return this.axios.get('/orders', { params })
} // getAllOrders()

/**
 * Place an order for a specific account.
 * Read {@link https://developer.tdameritrade.com/content/place-order-samples Place Order Samples} for more info.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {object} order The order
 * @returns {Promise<any>} Success
 *
 * @example
 * await td.placeOrder('45678', {
 *     orderType: 'MARKET',
 *     session: 'NORMAL',
 *     duration: 'DAY',
 *     orderStrategyType: 'SINGLE',
 *     orderLegCollection: [
 *         {
 *             instruction: 'Buy',
 *             quantity: 15,
 *             instrument: {
 *                 symbol: 'XYZ',
 *                 assetType: 'EQUITY'
 *             }
 *         }
 *     ]
 * })
 */
function placeOrder(accountId, order) {
    return this.axios.post(`/accounts/${accountId}/orders`, order)
} // placeOrder()

/**
 * Replace an existing order for an account. The existing order will be replaced by the new order.
 * Once replaced, the old order will be canceled and a new order will be created.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} orderId The order id
 * @param {object} order The new order
 * @returns {Promise<any>} Success
 */
function replaceOrder(accountId, orderId, order) {
    return this.axios.put(`/accounts/${accountId}/orders/${orderId}`, order)
} // replaceOrder()

/**
 * Cancel a specific order for a specific account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} orderId The order id
 * @returns {Promise<any>} Success
 *
 * @example
 * await td.cancelOrder('45678', '98745')
 */
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
