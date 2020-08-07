'use strict'

function getOrder(accountId, orderId) {
    return this.axios.get(`/accounts/${accountId}/orders/${orderId}`)
} // getOrder()

function getOrders(accountId, params) {
    return this.axios.get(`/accounts/${accountId}/orders`, { params })
} // getOrders()

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
