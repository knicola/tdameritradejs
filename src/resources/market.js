'use strict'

function getMarketHours(markets, date) {
    return this.http({
        url: '/marketdata/hours',
        params: {
            markets: [].concat(markets).join(','),
            date,
            apikey: this.config.apiKey,
        },
    })
} // getMarketHours()

function getMovers(index, direction, change) {
    return this.http({
        url: `/marketdata/${index}/movers`,
        params: {
            direction,
            change,
            apikey: this.config.apiKey,
        },
    })
} // getMovers()

function getQuotes(symbols) {
    return this.http({
        url: '/marketdata/quotes',
        params: {
            symbol: [].concat(symbols).join(','),
            apikey: this.config.apiKey,
        },
    })
} // getQuotes()

function getQuote(symbol) {
    return this.http({
        url: `/marketdata/${symbol}/quotes`,
        params: {
            apikey: this.config.apiKey,
        },
    })
} // getQuote()

function getPriceHistory(symbol, params) {
    return this.http({
        url: `/marketdata/${symbol}/pricehistory`,
        params: Object.assign({}, params, { apikey: this.config.apiKey }),
    })
} // getPriceHistory()

function getOptionChain(symbol, params) {
    return this.http({
        url: '/marketdata/chains',
        params: Object.assign({}, params, { symbol, apikey: this.config.apiKey }),
    })
} // getOptionChain()

module.exports = {
    getMarketHours,
    getMovers,
    getQuotes,
    getQuote,
    getPriceHistory,
    getOptionChain,
}
