'use strict'

const STATE = Object.freeze({
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    AUTHENTICATED: 'authenticated',
    DISCONNECTING: 'disconnecting',
    DISCONNECTED: 'disconnected',
})

const EVENT = Object.freeze({
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
    // TIMESALE_FOREX: 'timesale_forex',
    ERROR: 'error',
})

const ERROR = Object.freeze({
    UNKNOWN: 'unknown_error',
    UNKNOWN_MESSAGE: 'unknown_message',
    UNKNOWN_RESPONSE: 'unknown_response',
    UNKNOWN_NOTIFICATION: 'unknown_notification',
    UNKNOWN_DATA: 'unknown_data',
    INVALID_MESSAGE: 'invalid_message',
    CONNECTION_REFUSED: 'connection_refused',
    AUTHENTICATION_FAILED: 'authentication_failed',
})

const COMMANDS = Object.freeze({
    /** Log in to Streamer Server to begin subscribing for data */
    LOGIN: 'LOGIN',
    STREAM: 'STREAM',
    /** Change quality of service of data update rate. */
    QOS: 'QOS',
    /** Subscribe to data */
    SUBS: 'SUBS',
    ADD: 'ADD',
    /** Unsubscribe from data */
    UNSUBS: 'UNSUBS',
    VIEW: 'VIEW',
    /** Log out of Streamer Server to end streaming session. */
    LOGOUT: 'LOGOUT',
})

const SERVICES = Object.freeze({
    /** Account Activity Notifications */
    ACCT_ACTIVITY: 'ACCT_ACTIVITY',
    /** Admin requests: LOGIN, LOGOUT */
    ADMIN: 'ADMIN',
    /** Actives for NASDAQ */
    ACTIVES_NASDAQ: 'ACTIVES_NASDAQ',
    /** Actives for NYSE */
    ACTIVES_NYSE: 'ACTIVES_NYSE',
    /** Actives for OTCBB */
    ACTIVES_OTCBB: 'ACTIVES_OTCBB',
    /** Actives for Options */
    ACTIVES_OPTIONS: 'ACTIVES_OPTIONS',
    /** Level Two book */
    FOREX_BOOK: 'FOREX_BOOK',
    /** Level Two book */
    FUTURES_BOOK: 'FUTURES_BOOK',
    /** Level Two book */
    LISTED_BOOK: 'LISTED_BOOK',
    /** Level Two book */
    NASDAQ_BOOK: 'NASDAQ_BOOK',
    /** Level Two book */
    OPTIONS_BOOK: 'OPTIONS_BOOK',
    /** Level Two book */
    FUTURES_OPTIONS_BOOK: 'FUTURES_OPTIONS_BOOK',
    /** Chart candle for Equity and Index. */
    CHART_EQUITY: 'CHART_EQUITY',
    /** Chart candle for Futures and Futures OPtions */
    CHART_FUTURES: 'CHART_FUTURES',
    /** Chart history for Futures */
    CHART_HISTORY_FUTURES: 'CHART_HISTORY_FUTURES',
    /** Level 1 Equity */
    QUOTE: 'QUOTE',
    /** Level 1 Equity Futures */
    LEVELONE_FUTURES: 'LEVELONE_FUTURES',
    /** Level 1 Forex */
    LEVELONE_FOREX: 'LEVELONE_FOREX',
    /** Level 1 Futures Options */
    LEVELONE_FUTURES_OPTIONS: 'LEVELONE_FUTURES_OPTIONS',
    /** Level 1 Options */
    OPTION: 'OPTION',
    /** Level 2 Futures */
    LEVELTWO_FUTURES: 'LEVELTWO_FUTURES',
    /** News headline */
    NEWS_HEADLINE: 'NEWS_HEADLINE',
    /** News Content */
    NEWS_STORY: 'NEWS_STORY',
    /** Historical News */
    NEWS_HEADLINE_LIST: 'NEWS_HEADLINE_LIST',
    /** Streamer response */
    STREAMER_SERVER: 'STREAMER_SERVER',
    /** Time & sale for Equity */
    TIMESALE_EQUITY: 'TIMESALE_EQUITY',
    /** Time & sale for Futures and Futures Options */
    TIMESALE_FUTURES: 'TIMESALE_FUTURES',
    /** Time & sale for Forex */
    TIMESALE_FOREX: 'TIMESALE_FOREX',
    /** Time & sale for Options */
    TIMESALE_OPTIONS: 'TIMESALE_OPTIONS',
})

const FIELDS = Object.freeze({
    // Quality of Service, or the rate the data will be sent to the client.
    QOS: Object.freeze({
        /** (500 ms) */
        express: 0,
        /** (750 ms) default value for http binary protocol */
        realtime: 1,
        /** (1,000 ms) default value for websocket and http asynchronous protocol */
        fast: 2,
        /** (1,500 ms) */
        moderate: 3,
        /** (3,000 ms) */
        slow: 4,
        /** (5,000 ms) */
        delayed: 5,
    }),

    ACCT_ACTIVITY: Object.freeze({
        /** Subscription Key */
        subscriptionKey: 0,
        /** Account # */
        accountNumber: 1,
        /** message Type */
        messageType: 2,
        /** Message Data */
        messageData: 3,
    }),

    CHART_EQUITY: Object.freeze({
        /** Ticker symbol in upper case. */
        key: 0,
        /** Opening price for the minute */
        openPrice: 1,
        /** Highest price for the minute */
        highPrice: 2,
        /** Chart’s lowest price for the minute */
        lowPrice: 3,
        /** Closing price for the minute */
        closePrice: 4,
        /** Total volume for the minute */
        volume: 5,
        /** Identifies the candle minute */
        sequence: 6,
        /** Milliseconds since Epoch */
        chartTime: 7,
        /** Not useful */
        chartDay: 8,
    }),

    CHART_FUTURES: Object.freeze({
        /** Ticker symbol in upper case */
        key: 0,
        /** Milliseconds since Epoch */
        chartTime: 1,
        /** Opening price for the minute */
        openPrice: 2,
        /** Highest price for the minute */
        highPrice: 3,
        /** Chart’s lowest price for the minute */
        lowPrice: 4,
        /** Closing price for the minute */
        closePrice: 5,
        /** Total volume for the minute */
        volume: 6,
    }),

    CHART_OPTIONS: Object.freeze({
        /** Ticker symbol in upper case */
        key: 0,
        /** Milliseconds since Epoch */
        chartTime: 1,
        /** Opening price for the minute */
        openPrice: 2,
        /** Highest price for the minute */
        highPrice: 3,
        /** Chart’s lowest price for the minute */
        lowPrice: 4,
        /** Closing price for the minute */
        closePrice: 5,
        /** Total volume for the minute */
        volume: 6,
    }),

    NEWS_HEADLINE: Object.freeze({
        /** Ticker symbol in upper case. */
        symbol: 0,
        /** Specifies if there is any error. */
        errorCode: 1,
        /** Headline’s datetime in milliseconds since epoch */
        storyDatetime: 2,
        /** Unique ID for the headline */
        headlineId: 3,
        status: 4,
        /** News headline */
        headline: 5,
        storyId: 6,
        countForKeyword: 7,
        keywordArray: 8,
        isHot: 9,
        storySource: 10,
    }),

    TIMESALE: Object.freeze({
        /** Ticker symbol in upper case. */
        symbol: 0,
        /** Trade time of the last trade in milliseconds since epoch */
        tradeTime: 1,
        /** Price at which the last trade was matched */
        lastPrice: 2,
        /** Number of shares traded with last trade */
        lastSize: 3,
        /** Number of shares for bid */
        lastSequence: 4,
    })
}) // FIELDS

module.exports = {
    STATE,
    EVENT,
    ERROR,
    COMMANDS,
    SERVICES,
    FIELDS,
}
