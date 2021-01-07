'use strict'

/**
 * @typedef {'EQUITY'|'OPTION'|'FUTURE'|'BOND'|'FOREX'} Market
 */
/**
 * Get the market hours for the specified market(s).
 * @param {Market|Market[]} markets The market(s) for which you're requesting market hours
 * @param {string} date The date for which market hours information is requested. Valid ISO-8601 formats are `yyyy-MM-dd` and `yyyy-MM-dd'T'HH:mm:ssz`
 * @returns {Promise} The market hours
 */
function getMarketHours(markets, date) {
    return this.axios.get('/marketdata/hours', {
        params: {
            markets: [].concat(markets).join(','),
            date,
            apikey: this.config.apiKey,
        },
    })
} // getMarketHours()

/**
 * Get mover information by index symbol, direction type and change.
 * @param {'$COMPX'|'$DJI'|'$SPX.X'} index The index symbol
 * @param {'up'|'down'} direction The direction
 * @param {'value'|'percent'} change The change type
 * @returns {Promise} The mover information
 */
function getMovers(index, direction, change) {
    return this.axios.get(`/marketdata/${index}/movers`, {
        params: {
            direction,
            change,
            apikey: this.config.apiKey,
        },
    })
} // getMovers()

/**
 * Get quote data for one or more symbols.
 * @param {string|string[]} symbols The ticker symbol(s)
 * @returns {Promise} The quote data
 */
function getQuotes(symbols) {
    return this.axios.get('/marketdata/quotes', {
        params: {
            symbol: [].concat(symbols).join(','),
            apikey: this.config.apiKey,
        },
    })
} // getQuotes()

/**
 * Get quote data for a specified symbol.
 * @param {string} symbol The ticker symbol
 * @returns {Promise} The quote data
 */
function getQuote(symbol) {
    return this.axios.get(`/marketdata/${symbol}/quotes`, {
        params: {
            apikey: this.config.apiKey,
        },
    })
} // getQuote()

/**
 * @typedef PriceHistoryParams
 * @property {'day'|'month'|'year'|'ytd'} periodType The type of period to show
 * @property {1|2|3|4|5|6|10|15|20} period The number of periods to show
 * - `day` : 1, 2, 3, 4, 5, 10*
 * - `month` : 1*, 2, 3, 6
 * - `year` : 1*, 2, 3, 5, 10, 15, 20
 * - `ytd` : 1*
 * @property {'day'|'month'|'year'|'ytd'} frequencyType The type of frequency with which a new candle is formed
 * - `day` : minute*
 * - `month` : daily, weekly*
 * - `year` : daily, weekly, monthly*
 * - `ytd` : daily, weekly*
 * @property {string} startDate Start date as milliseconds since epoch. If `startDate` and `endDate` are provided, period should not be provided
 * @property {string} endDate End date as milliseconds since epoch. If `startDate` and `endDate` are provided, period should not be provided. Default is previous trading day
 * @property {boolean} [needExtendedHoursData=true] Include extended hours data. Default is `true`
 */
/**
 * Get price history for a specified symbol.
 * @param {string} symbol The ticker symbol
 * @param {PriceHistoryParams} params The query parameters
 * @returns {Promise} The price history
 */
function getPriceHistory(symbol, params) {
    return this.axios.get(`/marketdata/${symbol}/pricehistory`, {
        params: Object.assign({}, params, { apikey: this.config.apiKey }),
    })
} // getPriceHistory()

/**
 * @typedef {
        |'SINGLE'|'ANALYTICAL'|'COVERED'|'VERTICAL'
        |'CALENDAR'|'STRANGLE'|'STRADDLE'|'BUTTERFLY'
        |'CONDOR'|'DIAGONAL'|'COLLAR'|'ROLL'
  } OptionStrategy
 */
/**
 * @typedef OptionChainParams
 * @property {'CALL'|'PUT'|'ALL'} [contractType='ALL'] Type of contracts to return in the chain. Default is `ALL`
 * @property {number} strikeCount The number of strikes to return above and below the at-the-money price
 * @property {boolean} [includeQuotes=false] Include quotes for options in the option chain. Default is `false`
 * @property {OptionStrategy} strategy Passing a value returns a Strategy Chain. Default is `SINGLE`
 * @property {OptionStrategy} interval Strike interval for spread strategy chains
 * @property {number} strike Provide a strike price to return options only at that strike price
 * @property {'ITM'|'NTM'|'OTM'|'SAK'|'SBK'|'SNK'|'ALL'} range Returns options for the given range. Default is `ALL`
 * - `ITM` : In-the-money
 * - `NTM` : Near-the-money
 * - `OTM` : Out-of-the-money
 * - `SAK` : Strikes Above Market
 * - `SBK` : Strikes Below Market
 * - `SNK` : Strikes Near Market
 * - `ALL` : All Strikes
 * @property {string} fromDate Only return expirations after this date. For strategies, expiration refers
 * to the nearest term expiration in the strategy. Valid ISO-8601 formats are: `yyyy-MM-dd` and `yyyy-MM-dd'T'HH:mm:ssz`
 * @property {string} toDate Only return expirations before this date. For strategies, expiration refers
 * to the nearest term expiration in the strategy. Valid ISO-8601 formats are: `yyyy-MM-dd` and `yyyy-MM-dd'T'HH:mm:ssz`
 * @property {OptionStrategy} volatility Volatility to use in calculations.Applies only to `ANALYTICAL` strategy chains
 * @property {OptionStrategy} underlyingPrice Underlying price to use in calculations.Applies only to ANALYTICAL strategy chains
 * @property {OptionStrategy} interestRate Interest rate to use in calculations.Applies only to ANALYTICAL strategy chains
 * @property {OptionStrategy} daysToExpiration Days to expiration to use in calculations.Applies only to ANALYTICAL strategy chains
 * @property {string} expMonth Return only options expiring in the specified month. Month is given in the three
 * character format (eg. `JAN`). Default is ALL
 * @property {'S'|'NS'|'ALL'} optionType Type of contracts to return. Default is `ALL`
 */
/**
 * Get Option Chains for optionable symbols.
 * @param {string} symbol The ticker symbol
 * @param {OptionChainParams} params The query parameters
 * @returns {Promise} The option chain
 */
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
