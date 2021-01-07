'use strict'

/**
 * Get a transaction for a specific account.
 * @param {string} accountId The account id
 * @param {string} transactionId The transaction id
 * @returns {Promise} The transaction details
 */
function getTransaction(accountId, transactionId) {
    return this.axios.get(`/accounts/${accountId}/transactions/${transactionId}`)
} // getTransaction()

/**
 * @typedef {
        |'ALL'|'TRADE'|'BUY_ONLY'|'SELL_ONLY'|'CASH_IN_OR_CASH_OUT'
        |'CHECKING'|'DIVIDEND'|'INTEREST'|'OTHER'|'ADVISOR_FEES'
    } TransactionType
 */
/**
 * @typedef TransactionParams
 * @property {TransactionType} type Only transactions with the specified type will be returned.
 * @property {string} symbol Only transactions with the specified symbol will be returned.
 * @property {string} startDate Only transactions after the Start Date will be returned.
 * Note: The maximum date range is one year. Valid ISO-8601 formats are: `yyyy-MM-dd`.
 * @property {string} endDate Only transactions before the End Date will be returned.
 * Note: The maximum date range is one year. Valid ISO-8601 formats are: `yyyy-MM-dd`.
 */
/**
 * Get all transactions for a specific account.
 * @param {string} accountId The account id
 * @param {TransactionParams} params The query parameters
 * @returns {Promise} The transaction history
 */
function getTransactions(accountId, params) {
    return this.axios.get(`/accounts/${accountId}/transactions`, { params })
} // getTransactions()

module.exports = {
    getTransaction,
    getTransactions,
}
