'use strict'

class TDAmeritrade extends require('./tdAmeritrade') {}

TDAmeritrade.prototype.authorize = function () {
    // noop
    return Promise.resolve()
}

TDAmeritrade.prototype.login = function () {
    // noop
    return Promise.resolve()
}

module.exports = { TDAmeritrade }
