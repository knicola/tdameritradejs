'use strict'

function getAccounts() {
    return this.axios.get('/accounts')
} // getAccounts()

function getAccount(accountId) {
    return this.axios.get(`/accounts/${accountId}`)
} // getAccount()

function getPreferences(accountId) {
    return this.axios.get(`/accounts/${accountId}/preferences`)
} // getPreferences()

function updatePreferences(accountId, preferences) {
    return this.axios.put(`/accounts/${accountId}/preferences`, preferences)
} // updatePreferences()

module.exports = {
    getAccounts,
    getAccount,
    getPreferences,
    updatePreferences,
}
