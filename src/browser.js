'use strict'

const Client = require('./client')
const { account, streamer } = require('./common')
const TDAccount = require('./client/account')
const TDStreamer = require('./streamer')

class TDAmeritrade extends Client {}

TDAmeritrade.prototype.account = account
TDAmeritrade.prototype.streamer = streamer
TDAmeritrade.prototype.authorize = () => Promise.resolve() // noop
TDAmeritrade.prototype.login = () => Promise.resolve() // noop

module.exports = { TDAmeritrade, TDStreamer, TDAccount }

// Allow use of default import syntax in TypeScript
module.exports.default = { TDAmeritrade, TDStreamer, TDAccount }
