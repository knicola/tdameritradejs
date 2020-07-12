'use strict'

function getSavedOrder(accountId, savedOrderId) {
    return this.http({ url: `/accounts/${accountId}/savedorders/${savedOrderId}` })
} // getSavedOrder()

function getSavedOrders(accountId) {
    return this.http({ url: `/accounts/${accountId}/savedorders` })
} // getSavedOrdersByPath()

function createSavedOrder(accountId, savedOrder) {
    return this.http({
        method: 'POST',
        url: `/accounts/${accountId}/savedorders`,
        data: savedOrder,
    })
} // createSavedOrder()

function replaceSavedOrder(accountId, savedOrderId, savedOrder) {
    return this.http({
        method: 'PUT',
        url: `/accounts/${accountId}/savedorders/${savedOrderId}`,
        data: savedOrder
    })
} // replaceSavedOrder()

function deleteSavedOrder(accountId, savedOrderId) {
    return this.http({ method: 'DELETE', url: `/accounts/${accountId}/savedorders/${savedOrderId}` })
} // deleteSavedOrder()

module.exports = {
    createSavedOrder,
    deleteSavedOrder,
    getSavedOrder,
    getSavedOrders,
    replaceSavedOrder,
}
