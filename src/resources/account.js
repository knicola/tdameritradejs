'use strict'

/**
 * Get account balances, positions, and orders for all linked accounts.
 *
 * @returns {Promise<any>} List of all accounts
 */
function getAccounts() {
    return this.axios.get('/accounts')
} // getAccounts()
/**
 * Get account balances, positions, and orders for a specific account.
 *
 * @param {string} accountId The account id
 * @returns {Promise<any>} The requested account
 */
function getAccount(accountId) {
    return this.axios.get(`/accounts/${accountId}`)
} // getAccount()

/**
 * Get preferences for a specific account.
 *
 * @param {string} accountId The account id
 * @returns {Promise<any>} The account preferences
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
 * Update preferences for a specific account. The directOptionsRouting and
 * directEquityRouting values cannot be modified via this operation.
 *
 * @param {string} accountId The account id
 * @param {Preferences} preferences The updated preferences
 * @returns {Promise<any>} Success
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
