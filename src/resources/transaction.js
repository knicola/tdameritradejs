'use strict'

function getTransaction(accountId, transactionId) {
    return this.http({ url: `/accounts/${accountId}/transactions/${transactionId}` })
} // getTransaction()

function getTransactions(accountId, params) {
    return this.http({ url: `/accounts/${accountId}/transactions`, params })
} // getTransactions()

module.exports = {
    getTransaction,
    getTransactions,
}
