'use strict'

const tda = require('./tdAmeritrade')

class TDAmeritrade extends tda {}

TDAmeritrade.prototype.authorize = function () {
    // noop
    return Promise.resolve()
}

TDAmeritrade.prototype.login = function () {
    // noop
    return Promise.resolve()
}

module.exports = { TDAmeritrade }
