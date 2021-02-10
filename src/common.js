'use strict'

const TDAccount = require('./client/account')
const TDStreamer = require('./streamer')
const get = require('lodash/get')

/**
 * Create a new instance of Account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @returns {TDAccount} A new Account instance
 *
 * @example
 * const ira_account = td.account('45678')
 */
function account(accountId) {
    const instance = new TDAccount(accountId)
    instance.config = this.config
    return instance
} // account()

/**
 * Create a new instance of TDStreamer.
 * For the time being, this will select the first available account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @returns {Promise<TDStreamer>} A new TDStreamer instance
 *
 * @example
 * const streamer = await td.streamer()
 */
function streamer() {
    return this.getUserPrincipals([
        'streamerSubscriptionKeys',
        'streamerConnectionInfo',
    ]).then(res => {
        const userPrincipals = this.config.returnFullResponse ? get(res, 'data') : res
        const instance = new TDStreamer(userPrincipals)
        return instance
    })
} // streamer()

module.exports = {
    account,
    streamer,
}
