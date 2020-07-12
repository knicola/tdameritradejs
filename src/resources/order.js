'use strict'

function getOrder(accountId, orderId) {
    return this.http({ url: `/accounts/${accountId}/orders/${orderId}` })
} // getOrder()

function getOrders(accountId, params) {
    return this.http({ url: `/accounts/${accountId}/orders`, params })
} // getOrders()

function getAllOrders(params) {
    return this.http({ url: '/orders', params })
} // getAllOrders()

function placeOrder(accountId, order) {
    return this.http({
        method: 'POST',
        url: `/accounts/${accountId}/orders`,
        data: order,
    })
} // placeOrder()

function replaceOrder(accountId, orderId, order) {
    return this.http({
        method: 'PUT',
        url: `/accounts/${accountId}/orders/${orderId}`,
        data: order,
    })
} // replaceOrder()

function cancelOrder(accountId, orderId) {
    return this.http({ method: 'DELETE', url: `/accounts/${accountId}/orders/${orderId}` })
} // cancelOrder()

module.exports = {
    getOrder,
    getOrders,
    getAllOrders,
    placeOrder,
    replaceOrder,
    cancelOrder,
}
