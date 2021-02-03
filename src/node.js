'use strict'

const Client = require('./client')

const { authorize, login } = require('./client/resources/oauth2')

const { account, streamer } = require('./common')

/** @typedef {import('./client/base').Config} Config */

/**
 * @class
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

TDAmeritrade.prototype.TDAccount = require('./client/account')
TDAmeritrade.prototype.TDStreamer = require('./streamer')

TDAmeritrade.prototype.account = account
TDAmeritrade.prototype.streamer = streamer
TDAmeritrade.prototype.authorize = authorize
TDAmeritrade.prototype.login = login

module.exports = { TDAmeritrade }

// Allow use of default import syntax in TypeScript
module.exports.default = { TDAmeritrade }
