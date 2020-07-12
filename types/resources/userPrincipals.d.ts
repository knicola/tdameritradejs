export interface UserPrincipal {
    authToken: string,
    userId: string,
    userCdDomainId: string,
    primaryAccountId: string,
    lastLoginTime: string,
    tokenExpirationTime: string,
    loginTime: string,
    accessLevel: string,
    stalePassword: boolean,
    streamerInfo: {
      streamerBinaryUrl: string,
      streamerSocketUrl: string,
      token: string,
      tokenTimestamp: string,
      userGroup: string,
      accessLevel: string,
      acl: string,
      appId: string
    },
    professionalStatus: 'PROFESSIONAL' | 'NON_PROFESSIONAL' | 'UNKNOWN_STATUS',
    quotes: {
      isNyseDelayed: boolean,
      isNasdaqDelayed: boolean,
      isOpraDelayed: boolean,
      isAmexDelayed: boolean,
      isCmeDelayed: boolean,
      isIceDelayed: boolean,
      isForexDelayed: boolean
    },
    streamerSubscriptionKeys: {
        keys: {
            key: string
        }[]
    },
    accounts: {
        accountId: string,
        description: string,
        displayName: string,
        accountCdDomainId: string,
        company: string,
        segment: string,
        surrogateIds: object,
        preferences: {
            expressTrading: boolean,
            directOptionsRouting: boolean,
            directEquityRouting: boolean,
            defaultEquityOrderLegInstruction: 'BUY' | 'SELL' | 'BUY_TO_COVER' | 'SELL_SHORT' | 'NONE',
            defaultEquityOrderType: 'MARKET' | 'LIMIT' | 'STOP' | 'STOP_LIMIT' | 'TRAILING_STOP' | 'MARKET_ON_CLOSE' | 'NONE',
            defaultEquityOrderPriceLinkType: 'VALUE' | 'PERCENT' | 'NONE',
            defaultEquityOrderDuration: 'DAY' | 'GOOD_TILL_CANCEL' | 'NONE',
            defaultEquityOrderMarketSession: 'AM' | 'PM' | 'NORMAL' | 'SEAMLESS' | 'NONE',
            defaultEquityQuantity: number,
            mutualFundTaxLotMethod: 'FIFO' | 'LIFO' | 'HIGH_COST' | 'LOW_COST' | 'MINIMUM_TAX' | 'AVERAGE_COST' | 'NONE',
            optionTaxLotMethod: 'FIFO' | 'LIFO' | 'HIGH_COST' | 'LOW_COST' | 'MINIMUM_TAX' | 'AVERAGE_COST' | 'NONE',
            equityTaxLotMethod: 'FIFO' | 'LIFO' | 'HIGH_COST' | 'LOW_COST' | 'MINIMUM_TAX' | 'AVERAGE_COST' | 'NONE',
            defaultAdvancedToolLaunch: 'TA' | 'N' | 'Y' | 'TOS' | 'NONE' | 'CC2',
            authTokenTimeout: 'FIFTY_FIVE_MINUTES' | 'TWO_HOURS' | 'FOUR_HOURS' | 'EIGHT_HOURS'
        },
        acl: string,
        authorizations: {
            apex: boolean,
            levelTwoQuotes: boolean,
            stockTrading: boolean,
            marginTrading: boolean,
            streamingNews: boolean,
            optionTradingLevel: 'COVERED' | 'FULL' | 'LONG' | 'SPREAD' | 'NONE',
            streamerAccess: boolean,
            advancedMargin: boolean,
            scottradeAccount: boolean
        }
    }[]
}

export interface SubscriptionKeys {
    keys: {
        key: string
    }[]
  }
