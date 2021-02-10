'use strict'

/**
 * Get a transaction for a specific account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} transactionId The transaction id
 * @returns {Promise<any>} The transaction details
 *
 * @example
 * const transaction = await td.getTransaction('45678', '98754')
 */
function getTransaction(accountId, transactionId) {
    return this.axios.get(`/accounts/${accountId}/transactions/${transactionId}`)
} // getTransaction()

/**
 * @typedef {object} TransactionQuery
 * @property {'ALL'|'TRADE'|'BUY_ONLY'|'SELL_ONLY'|'CASH_IN_OR_CASH_OUT'
 *   |'CHECKING'|'DIVIDEND'|'INTEREST'|'OTHER'|'ADVISOR_FEES'
 * } type Only transactions with the specified type will be returned.
 * @property {string} symbol Only transactions with the specified symbol will be returned.
 * @property {string} startDate Only transactions after the Start Date will be returned.
 * Note: The maximum date range is one year. Valid ISO-8601 formats are: `yyyy-MM-dd`.
 * @property {string} endDate Only transactions before the End Date will be returned.
 * Note: The maximum date range is one year. Valid ISO-8601 formats are: `yyyy-MM-dd`.
 */
/**
 * Get all transactions for a specific account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {TransactionQuery} params The query parameters
 * @returns {Promise<any>} The transaction history
 *
 * @example
 * const transactions = await td.getTransactions('45678', {
 *     symbol: 'SPY',
 *     startDate: '2021-01-01',
 *     endDate: '2021-01-31',
 * })
 */
function getTransactions(accountId, params) {
    return this.axios.get(`/accounts/${accountId}/transactions`, { params })
} // getTransactions()

module.exports = {
    getTransaction,
    getTransactions,
}
