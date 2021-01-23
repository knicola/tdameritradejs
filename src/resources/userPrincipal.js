'use strict'

/**
 * Get the SubscriptionKey for provided accounts or default accounts.
 *
 * @param {string|string[]} [accountIds] The account id(s)
 * @returns {Promise<any>} The susbscription keys
 */
function getStreamerSubscriptionKeys(accountIds) {
    return this.axios.get('/userprincipals/streamersubscriptionkeys', {
        params: {
            accountIds: [].concat(accountIds).join(',')
        }
    })
} // getStreamerSubscriptionKeys()

/**
 * @typedef {'streamerSubscriptionKeys'|'streamerConnectionInfo'|'preferences'|'surrogateIds'} UserPrincipalFields
 */
/**
 * Get user principal details.
 *
 * @param {UserPrincipalFields|UserPrincipalFields[]} [fields] Fields to include
 * @returns {Promise<any>} User principal details
 */
function getUserPrincipals(fields) {
    return this.axios.get('/userprincipals', {
        params: {
            fields: [].concat(fields).join(',')
        }
    })
} // getUserPrincipals()

module.exports = {
    getStreamerSubscriptionKeys,
    getUserPrincipals,
}
