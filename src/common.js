'use strict'

const Account = require('./client/account')
const Streamer = require('./streamer')
const get = require('lodash/get')

/**
 * Create a new instance of Account.
 *
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @returns {Account} A new Account instance
 */
function account(accountId) {
    const instance = new Account(accountId)
    instance.config = this.config
    return instance
} // account()

/**
 * Create a new instance of Streamer.
 * For the time being, this will select the first available account.
 *
 * @memberof TDAmeritrade
 * @returns {Promise<Streamer>} A new Streamer instance
 */
function streamer() {
    return this.getUserPrincipals([
        'streamerSubscriptionKeys',
        'streamerConnectionInfo',
    ]).then(res => {
        const userPrincipals = this.config.fullResponse ? get(res, 'data') : res
        const instance = new Streamer(userPrincipals)
        instance.config = this.config
        return instance
    })
} // streamer()

module.exports = {
    account,
    streamer,
}
