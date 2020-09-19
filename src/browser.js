'use strict'

const TDAmeritrade = require('./tdAmeritrade')

TDAmeritrade.prototype.authorize = function () {
    // noop
    return Promise.resolve()
}

TDAmeritrade.prototype.login = function () {
    // noop
    return Promise.resolve()
}

module.exports = { TDAmeritrade }
