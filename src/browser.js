'use strict'

const Client = require('./client')
const { account, streamer } = require('./common')

class TDAmeritrade extends Client {}

TDAmeritrade.prototype.account = account
TDAmeritrade.prototype.streamer = streamer
TDAmeritrade.prototype.authorize = () => Promise.resolve() // noop
TDAmeritrade.prototype.login = () => Promise.resolve() // noop

module.exports = { TDAmeritrade }
