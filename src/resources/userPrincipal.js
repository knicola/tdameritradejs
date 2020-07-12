'use strict'

function getStreamerSubscriptionKeys(accountIds) {
    return this.http({
        url: '/userprincipals/streamersubscriptionkeys',
        params: {
            accountIds: [].concat(accountIds).join(','),
        },
    })
} // getStreamerSubscriptionKeys()

function getUserPrincipals(fields) {
    return this.http({
        url: '/userprincipals',
        params: {
            fields: [].concat(fields).join(','),
        },
    })
} // getUserPrincipals()

module.exports = {
    getStreamerSubscriptionKeys,
    getUserPrincipals,
}
