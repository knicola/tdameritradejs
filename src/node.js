'use strict'

const Client = require('./client')
const { authorize, login } = require('./client/resources/oauth2')
const { account, streamer } = require('./common')
const TDAccount = require('./client/account')
const TDStreamer = require('./streamer')

/**
 * @typedef {import('./client/config').Config} Config
 */
/**
 * @class
 * @classdesc TD Ameritrade API client
 * @typicalname td
 * @param {Config} [config] Config
 * @example
 * const td = new TDAmeritrade({
 *     apiKey: process.env.API_KEY,
 *     redirectUri: 'https://localhost:8443',
 *     sslKey: './selfsigned.key',
 *     sslCert: './selfsigned.crt',
 * })
 */
class TDAmeritrade extends Client {}

TDAmeritrade.prototype.account = account
TDAmeritrade.prototype.streamer = streamer
TDAmeritrade.prototype.authorize = authorize
TDAmeritrade.prototype.login = login

module.exports = { TDAmeritrade, TDStreamer, TDAccount }

// Allow use of default import syntax in TypeScript
module.exports.default = { TDAmeritrade, TDStreamer, TDAccount }
