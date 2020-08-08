'use strict'

function getStreamerSubscriptionKeys(accountIds) {
    return this.axios.get('/userprincipals/streamersubscriptionkeys', {
        params: {
            accountIds: [].concat(accountIds).join(',')
        }
    })
} // getStreamerSubscriptionKeys()

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
