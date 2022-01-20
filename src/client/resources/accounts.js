'use strict'

/**
 * Get account balances, positions, and orders for all linked accounts.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {AccountFields|AccountFields[]} [fields] Fields to include
 * @returns {Promise<any>} List of all accounts
 *
 * @example
 * const accounts = await td.getAccounts()
 */
function getAccounts(fields) {
    return this.axios.get('/accounts', {
        params: {
            fields: [].concat(fields || []).join(',')
        }
    })
} // getAccounts()

/**
 * @typedef {'positions'|'orders'} AccountFields
 */
/**
 * Get account balances, positions, and orders for a specific account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {AccountFields|AccountFields[]} [fields] Fields to include
 * @returns {Promise<any>} The requested account
 *
 * @example
 * const acctInfo = await td.getAccount('45678')
 */
function getAccount(accountId, fields) {
    return this.axios.get(`/accounts/${accountId}`, {
        params: {
            fields: [].concat(fields || []).join(',')
        }
    })
} // getAccount()

/**
 * Get account positions for a specific account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @returns {Promise<any>} The requested account's positions
 *
 * @example
 * const acctInfo = await td.getPositions('45678')
 */
function getPositions(accountId) {
    return this.axios.get(`/accounts/${accountId}`, {
        params: {
            fields: 'positions'
        }
    })
} // getPositions()

/**
 * Get preferences for a specific account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @returns {Promise<any>} The account preferences
 *
 * @example
 * const prefs = await td.getPreferences('45678')
 */
function getPreferences(accountId) {
    return this.axios.get(`/accounts/${accountId}/preferences`)
} // getPreferences()

/**
 * @typedef {object} Preferences
 * @property {boolean} expressTrading Express trading
 * @property {'BUY'|'SELL'|'BUY_TO_COVER'|'SELL_SHORT'|'NONE'} defaultEquityOrderLegInstruction Default equity order leg instruction
 * @property {'MARKET'|'LIMIT'|'STOP'|'STOP_LIMIT'|'TRAILING_STOP'|'MARKET_ON_CLOSE'|'NONE'} defaultEquityOrderType Default order type
 * @property {'VALUE'|'PERCENT'|'NONE'} defaultEquityOrderPriceLinkType Default equity order price link type
 * @property {'DAY'|'GOOD_TILL_CANCEL'|'NONE'} defaultEquityOrderDuration Default equity order duration
 * @property {'AM'|'PM'|'NORMAL'|'SEAMLESS'|'NONE'} defaultEquityOrderMarketSession Default equity order market session
 * @property {number} defaultEquityQuantity Default equity quantity
 * @property {'FIFO'|'LIFO'|'HIGH_COST'|'LOW_COST'|'MINIMUM_TAX'|'AVERAGE_COST'|'NONE'} mutualFundTaxLotMethod Mutual fund taxlot method
 * @property {'FIFO'|'LIFO'|'HIGH_COST'|'LOW_COST'|'MINIMUM_TAX'|'AVERAGE_COST'|'NONE'} optionTaxLotMethod Option taxlot method
 * @property {'FIFO'|'LIFO'|'HIGH_COST'|'LOW_COST'|'MINIMUM_TAX'|'AVERAGE_COST'|'NONE'} equityTaxLotMethod Equity taxlot method
 * @property {'TA'|'N'|'Y'|'TOS'|'NONE'|'CC2'} defaultAdvancedToolLaunch Default advanced tool launch
 * @property {'FIFTY_FIVE_MINUTES'|'TWO_HOURS'|'FOUR_HOURS'|'EIGHT_HOURS'} authTokenTimeout Auth token timeout
 */
/**
 * Update preferences for a specific account. The `directOptionsRouting` and
 * `directEquityRouting` values cannot be modified via this operation.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {Preferences} preferences The updated preferences
 * @returns {Promise<any>} Success
 */
function updatePreferences(accountId, preferences) {
    return this.axios.put(`/accounts/${accountId}/preferences`, preferences)
} // updatePreferences()

/**
 * Get the SubscriptionKey for provided accounts or default accounts.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string|string[]} [accountIds] The account id(s)
 * @returns {Promise<any>} The susbscription keys
 *
 * @example
 * const subsKeys = await td.getStreamerSubscriptionKeys('45678')
 */
function getStreamerSubscriptionKeys(accountIds) {
    return this.axios.get('/userprincipals/streamersubscriptionkeys', {
        params: {
            accountIds: [].concat(accountIds || []).join(',')
        }
    })
} // getStreamerSubscriptionKeys()

/**
 * @typedef {'streamerSubscriptionKeys'|'streamerConnectionInfo'|'preferences'|'surrogateIds'} UserPrincipalFields
 */
/**
 * Get user principal details.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {UserPrincipalFields|UserPrincipalFields[]} [fields] Fields to include
 * @returns {Promise<any>} User principal details
 *
 * @example
 * const usrPrinc = await td.getUserPrincipals()
 * // OR
 * const usrPrinc = await td.getUserPrincipals('streamerSubscriptionKeys')
 * // OR
 * const usrPrinc = await td.getUserPrincipals(['streamerSubscriptionKeys', 'streamerConnectionInfo'])
 */
function getUserPrincipals(fields) {
    return this.axios.get('/userprincipals', {
        params: {
            fields: [].concat(fields || []).join(',')
        }
    })
} // getUserPrincipals()

module.exports = {
    getAccounts,
    getAccount,
    getPositions,
    getPreferences,
    updatePreferences,
    getStreamerSubscriptionKeys,
    getUserPrincipals,
}
