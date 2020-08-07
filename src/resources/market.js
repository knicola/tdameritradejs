'use strict'

function getMarketHours(markets, date) {
    return this.axios.get('/marketdata/hours', {
        params: {
            markets: [].concat(markets).join(','),
            date,
            apikey: this.config.apiKey,
        },
    })
} // getMarketHours()

function getMovers(index, direction, change) {
    return this.axios.get(`/marketdata/${index}/movers`, {
        params: {
            direction,
            change,
            apikey: this.config.apiKey,
        },
    })
} // getMovers()

function getQuotes(symbols) {
    return this.axios.get('/marketdata/quotes', {
        params: {
            symbol: [].concat(symbols).join(','),
            apikey: this.config.apiKey,
        },
    })
} // getQuotes()

function getQuote(symbol) {
    return this.axios.get(`/marketdata/${symbol}/quotes`, {
        params: {
            apikey: this.config.apiKey,
        },
    })
} // getQuote()

function getPriceHistory(symbol, params) {
    return this.axios.get(`/marketdata/${symbol}/pricehistory`, {
        params: Object.assign({}, params, { apikey: this.config.apiKey }),
    })
} // getPriceHistory()

function getOptionChain(symbol, params) {
    return this.axios.get('/marketdata/chains', {
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
