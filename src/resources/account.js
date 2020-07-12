'use strict'

function getAccounts() {
    return this.http({ url: '/accounts' })
} // getAccounts()

function getAccount(accountId) {
    return this.http({ url: `/accounts/${accountId}` })
} // getAccount()

function getPreferences(accountId) {
    return this.http({ url: `/accounts/${accountId}/preferences` })
} // getPreferences()

function updatePreferences(accountId, preferences) {
    return this.http({
        method: 'PUT',
        url: `/accounts/${accountId}/preferences`,
        data: preferences,
    })
} // updatePreferences()

module.exports = {
    getAccounts,
    getAccount,
    getPreferences,
    updatePreferences,
}
