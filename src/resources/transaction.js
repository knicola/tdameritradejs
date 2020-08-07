'use strict'

function getTransaction(accountId, transactionId) {
    return this.axios.get(`/accounts/${accountId}/transactions/${transactionId}`)
} // getTransaction()

function getTransactions(accountId, params) {
    return this.axios.get(`/accounts/${accountId}/transactions`, { params })
} // getTransactions()

module.exports = {
    getTransaction,
    getTransactions,
}
