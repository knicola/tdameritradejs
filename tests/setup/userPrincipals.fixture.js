'use strict'

const userPrincipals = {
    authToken: 'test_authToken',
    userId: 'test_userId',
    userCdDomainId: 'A000000011111111',
    primaryAccountId: '123456789',
    lastLoginTime: '2020-01-01T00:00:00+0000',
    tokenExpirationTime: '2020-01-01T00:30:00+0000',
    loginTime: '2020-01-01T00:00:00+0000',
    accessLevel: 'CUS',
    stalePassword: false,
    streamerInfo: {
        streamerBinaryUrl: 'localhost:3331',
        streamerSocketUrl: 'localhost:3331',
        token: 'test_token',
        tokenTimestamp: '2020-01-01T00:00:00+0000',
        userGroup: 'ACCT',
        accessLevel: 'ACCT',
        acl: 'test_acl',
        appId: 'test_appId'
    },
    professionalStatus: 'NON_PROFESSIONAL',
    quotes: {
        isNyseDelayed: false,
        isNasdaqDelayed: false,
        isOpraDelayed: false,
        isAmexDelayed: false,
        isCmeDelayed: true,
        isIceDelayed: true,
        isForexDelayed: true
    },
    streamerSubscriptionKeys: {
        keys: [{ key: 'test_key' }]
    },
    accounts: [
        {
            accountId: '123456789',
            displayName: 'test_displayName',
            accountCdDomainId: 'A000000011111111',
            company: 'AMER',
            segment: 'AMER',
            acl: 'test_acl',
            authorizations: {
                apex: false,
                levelTwoQuotes: true,
                stockTrading: true,
                marginTrading: false,
                streamingNews: true,
                optionTradingLevel: 'NONE',
                streamerAccess: true,
                advancedMargin: false,
                scottradeAccount: false
            }
        }
    ]
}

module.exports = userPrincipals
