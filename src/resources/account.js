'use strict'

/**
 * Get account balances, positions, and orders for all linked accounts.
 * @returns {Promise} List of all accounts
 */
function getAccounts() {
    return this.axios.get('/accounts')
} // getAccounts()

/**
 * Get account balances, positions, and orders for a specific account.
 * @param {string} accountId The account id
 * @returns {Promise} The requested account
 */
function getAccount(accountId) {
    return this.axios.get(`/accounts/${accountId}`)
} // getAccount()

/**
 * Get preferences for a specific account.
 * @param {string} accountId The account id
 * @returns {Promise} The account preferences
 */
function getPreferences(accountId) {
    return this.axios.get(`/accounts/${accountId}/preferences`)
} // getPreferences()

/**
 * Update preferences for a specific account.
 * @note The directOptionsRouting and directEquityRouting values cannot be modified via this operation.
 * @param {string} accountId The account id
 * @param {object} preferences The updated preferences
 * @returns {Promise} Success
 */
function updatePreferences(accountId, preferences) {
    return this.axios.put(`/accounts/${accountId}/preferences`, preferences)
} // updatePreferences()

module.exports = {
    getAccounts,
    getAccount,
    getPreferences,
    updatePreferences,
}
