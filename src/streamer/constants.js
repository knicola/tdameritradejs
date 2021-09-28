'use strict'

/**
 * @private
 * @enum {string}
 */
const STATE = {
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    AUTHENTICATED: 'authenticated',
    DISCONNECTING: 'disconnecting',
    DISCONNECTED: 'disconnected',
}
Object.freeze(STATE)

/**
 * @private
 * @enum {string}
 */
const EVENT = {
    STATE_CHANGE: 'state_change',
    MESSAGE: 'message',
    ACCOUNT_ACTIVITY: 'account_activity',
    CHART: 'chart',
    // CHART_EQUITY: 'chart_equity',
    // CHART_FUTURES: 'chart_futures',
    // CHART_OPTIONS: 'chart_options',
    NEWS_HEADLINE: 'news_headline',
    TIMESALE: 'timesale',
    // TIMESALE_EQUITY: 'timesale_equity',
    // TIMESALE_FUTURES: 'timesale_futures',
    // TIMESALE_OPTIONS: 'timesale_options',
    LEVEL_ONE_OPTION: 'level_one_option',
    // TIMESALE_FOREX: 'timesale_forex',
    LEVEL_ONE_EQUITY: 'level_one_equity',
    LEVEL_ONE_FUTURES: 'level_one_futures',
    CHART_HISTORY_FUTURES: 'chart_history_futures',
    ERROR: 'error',
}
Object.freeze(EVENT)

/**
 * @private
 * @enum {string}
 */
const ERROR = {
    UNKNOWN: 'unknown_error',
    UNKNOWN_MESSAGE: 'unknown_message',
    UNKNOWN_RESPONSE: 'unknown_response',
    UNKNOWN_NOTIFICATION: 'unknown_notification',
    UNKNOWN_DATA: 'unknown_data',
    INVALID_MESSAGE: 'invalid_message',
    CONNECTION_REFUSED: 'connection_refused',
    AUTHENTICATION_FAILED: 'authentication_failed',
}
Object.freeze(ERROR)

/**
 * @private
 * @enum {string}
 */
const COMMANDS = {
    LOGIN: 'LOGIN', // Log in to Streamer Server to begin subscribing for data
    STREAM: 'STREAM',
    QOS: 'QOS', // Change quality of service of data update rate.
    SUBS: 'SUBS', // Subscribe to data
    ADD: 'ADD',
    UNSUBS: 'UNSUBS', // Unsubscribe from data
    VIEW: 'VIEW',
    LOGOUT: 'LOGOUT', // Log out of Streamer Server to end streaming session.
    GET: 'GET',
}
Object.freeze(COMMANDS)

/**
 * @private
 * @enum {string}
 */
const SERVICES = {
    ACCT_ACTIVITY: 'ACCT_ACTIVITY', // Account Activity Notifications
    ADMIN: 'ADMIN', // Admin requests: LOGIN, LOGOUT
    ACTIVES_NASDAQ: 'ACTIVES_NASDAQ', // Actives for NASDAQ
    ACTIVES_NYSE: 'ACTIVES_NYSE', // Actives for NYSE
    ACTIVES_OTCBB: 'ACTIVES_OTCBB', // Actives for OTCBB
    ACTIVES_OPTIONS: 'ACTIVES_OPTIONS', // Actives for Options
    FOREX_BOOK: 'FOREX_BOOK', // Level Two book
    FUTURES_BOOK: 'FUTURES_BOOK', // Level Two book
    LISTED_BOOK: 'LISTED_BOOK', // Level Two book
    NASDAQ_BOOK: 'NASDAQ_BOOK', // Level Two book
    OPTIONS_BOOK: 'OPTIONS_BOOK', // Level Two book
    FUTURES_OPTIONS_BOOK: 'FUTURES_OPTIONS_BOOK', // Level Two book
    CHART_EQUITY: 'CHART_EQUITY', // Chart candle for Equity and Index.
    CHART_FUTURES: 'CHART_FUTURES', // Chart candle for Futures and Futures OPtions
    CHART_HISTORY_FUTURES: 'CHART_HISTORY_FUTURES', // Chart history for Futures
    QUOTE: 'QUOTE', // Level 1 Equity
    LEVELONE_FUTURES: 'LEVELONE_FUTURES', // Level 1 Equity Futures
    LEVELONE_FOREX: 'LEVELONE_FOREX', // Level 1 Forex
    LEVELONE_FUTURES_OPTIONS: 'LEVELONE_FUTURES_OPTIONS', // Level 1 Futures Options
    LEVEL_ONE_OPTION: 'OPTION', // Level 1 Options
    LEVELTWO_FUTURES: 'LEVELTWO_FUTURES', // Level 2 Futures
    NEWS_HEADLINE: 'NEWS_HEADLINE', // News headline
    NEWS_STORY: 'NEWS_STORY', // News Content
    NEWS_HEADLINE_LIST: 'NEWS_HEADLINE_LIST', // Historical News
    STREAMER_SERVER: 'STREAMER_SERVER', // Streamer response
    TIMESALE_EQUITY: 'TIMESALE_EQUITY', // Time & sale for Equity
    TIMESALE_FUTURES: 'TIMESALE_FUTURES', // Time & sale for Futures and Futures Options
    TIMESALE_FOREX: 'TIMESALE_FOREX', // Time & sale for Forex
    TIMESALE_OPTIONS: 'TIMESALE_OPTIONS', // Time & sale for Options
}
Object.freeze(SERVICES)

/**
 * @private
 * @enum {object}
 */
const FIELDS = {
    // Quality of Service, or the rate the data will be sent to the client.
    /** @enum {number} */
    QOS: {
        express: 0, // (500 ms)
        realtime: 1, // (750 ms) default value for http binary protocol
        fast: 2, // (1,000 ms) default value for websocket and http asynchronous protocol
        moderate: 3, // (1,500 ms)
        slow: 4, // (3,000 ms)
        delayed: 5, // (5,000 ms)
    },

    /** @enum {number} */
    ACCT_ACTIVITY: {
        subscriptionKey: 0, // Subscription Key
        accountNumber: 1, // Account #
        messageType: 2, // message Type
        messageData: 3, // Message Data
    },

    /** @enum {number} */
    CHART_EQUITY: {
        key: 0, // Ticker symbol in upper case.
        openPrice: 1, // Opening price for the minute
        highPrice: 2, // Highest price for the minute
        lowPrice: 3, // Chart’s lowest price for the minute
        closePrice: 4, // Closing price for the minute
        volume: 5, // Total volume for the minute
        sequence: 6, // Identifies the candle minute
        chartTime: 7, // Milliseconds since Epoch
        chartDay: 8, // Not useful
    },

    /** @enum {number} */
    CHART_FUTURES: {
        key: 0, // Ticker symbol in upper case
        chartTime: 1, // Milliseconds since Epoch
        openPrice: 2, // Opening price for the minute
        highPrice: 3, // Highest price for the minute
        lowPrice: 4, // Chart’s lowest price for the minute
        closePrice: 5, // Closing price for the minute
        volume: 6, // Total volume for the minute
    },

    /** @enum {number} */
    CHART_OPTIONS: {
        key: 0, // Ticker symbol in upper case
        chartTime: 1, // Milliseconds since Epoch
        openPrice: 2, // Opening price for the minute
        highPrice: 3, // Highest price for the minute
        lowPrice: 4, // Chart’s lowest price for the minute
        closePrice: 5, // Closing price for the minute
        volume: 6, // Total volume for the minute
    },

    /** @enum {number} */
    NEWS_HEADLINE: {
        symbol: 0, // Ticker symbol in upper case.
        errorCode: 1, // Specifies if there is any error.
        storyDatetime: 2, // Headline’s datetime in milliseconds since epoch
        headlineId: 3, // Unique ID for the headline
        status: 4,
        headline: 5, // News headline
        storyId: 6,
        countForKeyword: 7,
        keywordArray: 8,
        isHot: 9,
        storySource: 10,
    },

    /** @enum {number} */
    TIMESALE: {
        symbol: 0, // Ticker symbol in upper case.
        tradeTime: 1, // Trade time of the last trade in milliseconds since epoch
        lastPrice: 2, // Price at which the last trade was matched
        lastSize: 3, // Number of shares traded with last trade
        lastSequence: 4, // Number of shares for bid
    },

    /** @enum {number} */
    LEVEL_ONE_EQUITY: {
        symbol: 0, // Ticker symbol in upper case.
        bidPrice: 1, // Current Best Bid Price
        askPrice: 2, // Current Best Ask Price
        lastPrice: 3, // Price at which the last trade was matched
        bidSize: 4, // Number of shares for bid
        askSize: 5, // Number of shares for ask
        askID: 6, // Exchange with the best ask
        bidID: 7, // Exchange with the best bid
        totalVolume: 8, // Aggregated shares traded throughout the day, including pre/post market hours.
        lastSize: 9, // Number of shares traded with last trade
        tradeTime: 10, // Trade time of the last trade
        quoteTime: 11, // Trade time of the last quote
        highPrice: 12, // Day’s high trade price
        lowPrice: 13, // Day’s low trade price
        bidTick: 14, // Indicates Up or Downtick (NASDAQ NMS & Small Cap)
        closePrice: 15, // Previous day’s closing price
        exchangeID: 16, // Primary "listing" Exchange
        marginable: 17, // Stock approved by the Federal Reserve and an investor's broker as being suitable for providing collateral for margin debt.
        shortable: 18, // Stock can be sold short.
        // islandBid: 19, // No longer used
        // islandAsk: 20, // No longer used
        // islandVolume: 21, // No longer used
        quoteDay: 22, // Day of the quote
        tradeDay: 23, // Day of the trade
        volatility: 24, // Option Risk/Volatility Measurement
        description: 25, // A company, index or fund name
        lastID: 26, // Exchange where last trade was executed
        digits: 27, // Valid decimal points
        openPrice: 28, // Day's Open Price
        netChange: 29, // Current Last-Prev Close
        '52WeekHigh': 30, // Higest price traded in the past 12 months, or 52 weeks
        '52WeekLow': 31, // Lowest price traded in the past 12 months, or 52 weeks
        peRatio: 32,
        dividendAmount: 33, // Earnings Per Share
        dividendYield: 34, // Dividend Yield
        // islandBidSize: 35, // No longer used
        // islandAskSize: 36, // No longer used
        nav: 37, // Mutual Fund Net Asset Value
        fundPrice: 38,
        exchangeName: 39, // Display name of exchange
        dividendDate: 40,
        regularMarketQuote: 41,
        regularMarketTrade: 42,
        regularMarketLastPrice: 43,
        regularMarketLastSize: 44,
        regularMarketTradeTime: 45,
        regularMarketTradeDay: 46,
        regularMarketNetChange: 47,
        securityStatus: 48,
        mark: 49, // Mark Price
        quoteTimeInLong: 50, // Last quote time in milliseconds since Epoch
        tradeTimeInLong: 51, // Last trade time in milliseconds since Epoch
        regularMarketTradeTimeInLong: 52, // Regular market trade time in milliseconds since Epoch
    },

    /** @enum {number} */
    LEVEL_ONE_FUTURES: {
        symbol: 0, // Ticker symbol in upper case.
        bidPrice: 1, // Current Best Bid Price
        askPrice: 2, // Current Best Ask Price
        lastPrice: 3, // Price at which the last trade was matched
        bidSize: 4, // Number of shares for bid
        askSize: 5, // Number of shares for ask
        askID: 6, // Exchange with the best ask
        bidID: 7, // Exchange with the best bid
        totalVolume: 8, // Aggregated shares traded throughout the day, including pre/post market hours.
        lastSize: 9, // Number of shares traded with last trade
        quoteTime: 10, // Trade time of the last quote in milliseconds since epoch
        tradeTime: 11, // Trade time of the last trade in milliseconds since epoch
        highPrice: 12, // Day’s high trade price
        lowPrice: 13, // Day’s low trade price
        closePrice: 14, // Previous day’s closing price
        exchangeID: 15, // Primary "listing" Exchange
        description: 16, // Description of the product
        lastID: 17, // Exchange where last trade was executed
        openPrice: 18, // Day's Open Price
        netChange: 19, // Current Last-Prev Close
        futurePercentChange: 20, // Current percent change
        exhangeName: 21, // Name of exchange
        securityStatus: 22, // Trading status of the symbol
        openInterest: 23, // The total number of futures ontracts that are not closed or delivered on a particular day
        mark: 24, // Mark-to-Market value is calculated daily using current prices to determine profit/loss
        tick: 25, // Minimum price movement
        tickAmount: 26, // Minimum amount that the price of the market can change
        product: 27, // Futures product
        futurePriceFormat: 28, // Display in fraction or decimal format.
        futureTradingHours: 29, // Trading hours
        futureIsTradable: 30, // Flag to indicate if this future contract is tradable
        futureMultiplier: 31, // Point value
        futureIsActive: 32, // Indicates if this contract is active
        futureSettlementPrice: 33, // Closing price
        futureActiveSymbol: 34, // Symbol of the active contract
        futureExpirationDate: 35, // Expiration date of this contract
    },
    /** @enum {number} */
    LEVEL_ONE_OPTION: {
        symbol: 0,
        description: 1,
        bidPrice: 2,
        askPrice: 3,
        lastPrice: 4,
        highPrice: 5,
        lowPrice: 6,
        closePrice: 7,
        totalVolume: 8,
        openInterest: 9,
        volatility: 10,
        quoteTime: 11,
        tradeTime: 12,
        intrinsicValue: 13,
        quoteDay: 14,
        tradeDay: 15,
        expirationYear: 16,
        multiplier: 17,
        digits: 18,
        openPrice: 19,
        bidSize: 20,
        askSize: 21,
        lastSize: 22,
        netChange: 23,
        strikePrice: 24,
        contractType: 25,
        underlying: 26,
        expirationMonth: 27,
        deliverables: 28,
        timeValue: 29,
        expirationDay: 30,
        daysToExpiration: 31,
        delta: 32,
        gamma: 33,
        theta: 34,
        vega: 35,
        rho: 36,
        securityStatus: 37,
        theoreticalOptionValue: 38,
        underlyingPrice: 39,
        uvExpirationType: 40,
        mark: 41,
    },
} // FIELDS
deepFreeze(FIELDS)

/**
 * Freeze object recursively.
 *
 * @private
 * @param {object} obj Object
 * @returns {object} Frozen object
 */
function deepFreeze(obj) {
    Object.freeze(obj)

    Object.getOwnPropertyNames(obj).forEach(function (prop) {
        if (typeof obj[prop] === 'object') {
            deepFreeze(obj[prop])
        }
    })

    return obj
}

module.exports = {
    STATE,
    EVENT,
    ERROR,
    COMMANDS,
    SERVICES,
    FIELDS,
}
