'use strict'

function getSavedOrder(accountId, savedOrderId) {
    return this.axios.get(`/accounts/${accountId}/savedorders/${savedOrderId}`)
} // getSavedOrder()

function getSavedOrders(accountId) {
    return this.axios.get(`/accounts/${accountId}/savedorders`)
} // getSavedOrdersByPath()

function createSavedOrder(accountId, savedOrder) {
    return this.axios.post(`/accounts/${accountId}/savedorders`, savedOrder)
} // createSavedOrder()

function replaceSavedOrder(accountId, savedOrderId, savedOrder) {
    return this.axios.put(`/accounts/${accountId}/savedorders/${savedOrderId}`, savedOrder)
} // replaceSavedOrder()

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
