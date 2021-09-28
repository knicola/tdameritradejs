'use strict'

const debug = require('debug')('ameritrade:streamer') // eslint-disable-line no-unused-vars

const EventEmitter = require('eventemitter3')
const WebSocket = require('isomorphic-ws')
const cuid = require('cuid')

const { STATE, EVENT, ERROR, COMMANDS, SERVICES, FIELDS } = require('./constants')
const transform = require('./transforms')

const emitter = Symbol()
const socket = Symbol()
const state = Symbol()
const listeners = Symbol()

/**
 * @typedef {'connecting'|'connected'|'authenticated'|'disconnecting'|'disconnected'} State
 */
/**
 * @typedef {'state_change'|'message'|'account_activity'|'chart'|'news_headline'|'timesale'
 * |'level_one_equity'|'level_one_futures'|'level_one_option'|'chart_history_futures'|'error'} Event
 */
/**
 * @typedef {'unknown_error'|'unknown_message'|'unknown_response'|'unknown_notification'
 * |'unknown_data'|'invalid_message'|'connection_refused'|'authentication_failed'} Error
 */

/**
 * @class
 * @typicalname streamer
 */
class TDStreamer {
    /**
     * @param {object} userPrincipals User principals object
     */
    constructor(userPrincipals) {
        this.userPrincipals = userPrincipals
        this[emitter] = new EventEmitter()

        // subscribe to all state changes
        Object.keys(STATE).forEach(key => {
            this.on(STATE[key], () => {
                debug('State changed: %s', STATE[key])
                this[state] = STATE[key]
                this[emitter].emit(EVENT.STATE_CHANGE, STATE[key])
            })
        })

        // subscribe to all errors
        Object.keys(ERROR).forEach(key => {
            this.on(ERROR[key], (data) => {
                const error = { error: ERROR[key], data }
                debug('Error: %j', error)
                this[emitter].emit(EVENT.ERROR, error)
            })
        })

        // login
        this[emitter].on(STATE.CONNECTED, () => this.sendRequest(login(this.userPrincipals)))

        // handle incoming messages
        this[emitter].on(EVENT.MESSAGE, data => handleMessage(this[emitter], data))

        // logout
        this[emitter].on(STATE.DISCONNECTING, () => this.sendRequest(logout()))
    } // constructor()

    /**
     * @returns {State} state
     */
    get state() {
        return this[state]
    } // state

    /**
     * Add a listener for a given event.
     *
     * @param {State|Event|Error} event The event name
     * @param {EventEmitter.EventListener<any, any>} fn Callback function
     * @returns {EventEmitter<string | symbol, any>} Event emitter
     */
    on(event, fn) {
        return this[emitter].on(event, fn)
    } // on()

    /**
     * Add a one-time listener for a given event.
     *
     * @param {State|Event|Error} event The event name
     * @param {EventEmitter.EventListener<any, any>} fn Callback function
     * @returns {EventEmitter<string | symbol, any>} Event emitter
     */
    once(event, fn) {
        return this[emitter].once(event, fn)
    } // once()

    /**
     * Remove the listeners of a given event.
     *
     * @param {State|Event} event The event name
     * @param {EventEmitter.EventListener<any, any>} fn Callback function
     * @returns {void}
     */
    removeListener(event, fn) {
        this[emitter].removeListener(event, fn)
    } // removeListener()

    /**
     * Remove all listeners, or those of the specified event.
     *
     * @param {State|Event|Error} [event] The event name
     * @returns {void}
     */
    removeAllListeners(event) {
        this[emitter].removeAllListeners(event)
    } // removeAllListeners()

    /**
     * Return an array listing the events for which
     * the streamer has registered listeners.
     *
     * @returns {Array<string|symbol>} event names
     */
    eventNames() {
        return this[emitter].eventNames()
    }

    /**
     * Return the listeners registered for a given event.
     *
     * @param {State|Event|Error} event The event name
     * @returns {Array<EventEmitter.EventListener<any, any>>} List of listeners
     */
    listeners(event) {
        return this[emitter].listeners(event)
    } // listeners()

    /**
     * Return the number of listeners listening to a given event.
     *
     * @param {State|Event|Error} event The event name
     * @returns {number} Number of listeners
     */
    listenerCount(event) {
        return this[emitter].listenerCount(event)
    } // listenerCount()

    /**
     * Connect to the server
     *
     * @returns {void}
     */
    connect() {
        this[emitter].emit(STATE.CONNECTING)
        this[socket] = new WebSocket(`wss://${this.userPrincipals.streamerInfo.streamerSocketUrl}/ws`)
        this[socket].onopen = () => this[emitter].emit(STATE.CONNECTED)
        this[socket].onmessage = message => this[emitter].emit(EVENT.MESSAGE, message.data)
        this[socket].onerror = () => this[emitter].emit(ERROR.CONNECTION_REFUSED)
        this[socket].onclose = () => this[emitter].emit(STATE.DISCONNECTED)
    } // connect()

    /**
     * @typedef {object} DisconnectOptions
     * @property {boolean} force Disconnect immediately
     */
    /**
     * Disconnect from the server
     *
     * @param {DisconnectOptions} options Options
     * @returns {void}
     */
    disconnect({ force } = { force: false }) {
        if (this.state !== STATE.DISCONNECTED) {
            this[emitter].emit(STATE.DISCONNECTING)
            setTimeout(() => this[socket].close(), force ? 0 : 3000)
        }
    } // disconnect()

    /**
     * The request object
     *
     * @typedef {object} Request
     * @property {string} [requestid] A unique request identifier
     * @property {string} service The service name
     * @property {object} parameters The service parameters
     * @property {string} command The command
     */
    /**
     * Create a request object
     *
     * @param {Request|Request[]} requests The requests to send to the server
     * @returns {object} The requests object
     */
    createRequest(requests) {
        const data = { requests: [] }

        data.requests = [].concat(requests).map(request => Object.assign({}, {
            requestid: cuid(),
            account: this.userPrincipals.accounts[0].accountId,
            source: this.userPrincipals.streamerInfo.appId,
        }, request))

        return data
    } // createRequest()

    /**
     * Send a request to the server
     *
     * @param {Request|Request[]} requests The requests to send to the server
     * @returns {object[]} The requests sent to the server
     */
    sendRequest(requests) {
        const data = this.createRequest(requests)

        debug('Sending request: %j', data)

        this.send(data)

        return data
    } // send()

    /**
     * Send a message to the server
     *
     * @param {object} message The JSON message to send to server
     * @returns {void}
     */
    send(message) {
        debug('Sending message: %j', message)

        this[socket].send(
            JSON.stringify(message)
        )
    } // send()

    /**
     * The service object
     *
     * @typedef {object} Service
     * @property {string} [requestid] A unique request identifier
     * @property {string} service The service name
     * @property {object} [parameters] The service parameters
     */
    /**
     * Subscribe for service updates
     *
     * @param {Service|Service[]} services The services to subscribe to
     * @returns {object[]} The request objects sent to the server
     */
    subscribe(services) {
        return this.sendRequest(
            [].concat(services).map(service => {
                return Object.assign({}, service, { command: COMMANDS.SUBS })
            })
        )
    } // subscribe()

    /**
     * Unsubscribe from services updates
     *
     * @param {Service|Service[]} services The services to unsubscribe from
     * @returns {object[]} The request objects sent to the server
     */
    unsubscribe(services) {
        return this.sendRequest(
            [].concat(services).map(service => {
                return Object.assign({}, service, { command: COMMANDS.UNSUBS })
            })
        )
    } // unsubscribe()

    /**
     * Set Quality of Service
     *
     * @param {'express'|'realtime'|'fast'|'moderate'|'slow'|'delayed'} level level
     * @returns {object[]} The request objects sent to the server
     */
    setQOS(level) {
        return this.sendRequest({
            service: SERVICES.ADMIN,
            command: COMMANDS.QOS,
            parameters: {
                qoslevel: FIELDS.QOS[level]
            },
        })
    } // setQOS

    /**
     * Subscribe to Account Activity updates
     *
     * @param {Array<'subscriptionKey'|'accountNumber'|'messageType'|'messageData'>} [fields] Fields to include (default all)
     * @returns {object[]} The request objects sent to the server
     */
    subsAccountActivity(fields) {
        return this.subscribe({
            service: SERVICES.ACCT_ACTIVITY,
            parameters: {
                keys: this.userPrincipals.streamerSubscriptionKeys.keys[0].key,
                fields: fields
                    ? fields.map(field => FIELDS.ACCT_ACTIVITY[field]).join(',')
                    : '0,1,2,3',
            },
        })
    } // subsAccountActivity()

    /**
     * Unsubscribe from Account Activity updates
     *
     * @returns {object[]} The request objects sent to the server
     */
    unsubsAccountActivity() {
        return this.unsubscribe({
            service: SERVICES.ACCT_ACTIVITY,
        })
    } // unsubsAccountActivity()

    /**
     * Susbscribe to Chart Equity updates
     *
     * @param {string|string[]} symbols Ticker symbols to subscribe to
     * @param {Array<'key'|'openPrice'|'highPrice'|'lowPrice'|'closePrice'|'volume'|'sequence'|'chartTime'|'chartDay'>} [fields] Fields to include (default all)
     * @returns {object[]} The request objects sent to the server
     */
    subsChartEquity(symbols, fields) {
        return this.subscribe({
            service: SERVICES.CHART_EQUITY,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
                fields: fields
                    ? fields.map(field => FIELDS.CHART_EQUITY[field]).join(',')
                    : '0,1,2,3,4,5,6,7', // exclude `chartDay` since it's labeled as "not useful"
            },
        })
    } // subsChartEquity()

    /**
     * Unsubscribe from Chart Equity updates
     *
     * @param {string|string[]} symbols Ticker symbols to unsubscribe from
     * @returns {object[]} The request objects sent to the server
     */
    unsubsChartEquity(symbols) {
        return this.unsubscribe({
            service: SERVICES.CHART_EQUITY,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
            },
        })
    } // unsubsChartEquity()

    /**
     * Susbscribe to Chart Futures updates
     *
     * @param {string|string[]} symbols Ticker symbols to subscribe to
     * @param {Array<'key'|'chartTime'|'openPrice'|'highPrice'|'lowPrice'|'closePrice'|'volume'>} [fields] Fields to include (default all)
     * @returns {object[]} The request objects sent to the server
     */
    subsChartFutures(symbols, fields) {
        return this.subscribe({
            service: SERVICES.CHART_FUTURES,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
                fields: fields
                    ? fields.map(field => FIELDS.CHART_FUTURES[field]).join(',')
                    : '0,1,2,3,4,5,6',
            },
        })
    } // subsChartFutures()

    /**
     * Unsubscribe from Chart Futures updates
     *
     * @param {string|string[]} symbols Ticker symbols to unsubscribe from
     * @returns {object[]} The request objects sent to the server
     */
    unsubsChartFutures(symbols) {
        return this.unsubscribe({
            service: SERVICES.CHART_FUTURES,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
            },
        })
    } // unsubsChartFutures()

    /**
     * Subscribe to Chart Options updates
     *
     * @param {string|string[]} symbols Ticker symbols to subscribe to
     * @param {Array<'key'|'chartTime'|'openPrice'|'highPrice'|'lowPrice'|'closePrice'|'volume'>} [fields] Fields to include (default all)
     * @returns {object[]} The request objects sent to the server
     */
    subsChartOptions(symbols, fields) {
        return this.subscribe({
            service: SERVICES.CHART_FUTURES,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
                fields: fields
                    ? fields.map(field => FIELDS.CHART_OPTIONS[field]).join(',')
                    : '0,1,2,3,4,5,6',
            },
        })
    } // subsChartOptions()

    /**
     * Unsbscribe from Chart Options updates
     *
     * @param {string|string[]} symbols Ticker symbols to unsubscribe from
     * @returns {object[]} The request objects sent to the server
     */
    unsubsChartOptions(symbols) {
        return this.unsubscribe({
            service: SERVICES.CHART_FUTURES,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
            },
        })
    } // unsubsChartOptions()

    /**
     * Subscribe to News Headline updates
     *
     * @param {string|string[]} symbols Ticker symbols to subscribe to
     * @param {Array<'symbol'|'errorCode'|'storyDatetime'|'headlineId'|'status'
     * |'headline'|'storyId'|'countForKeyword'|'keywordArray'|'isHot'|'storySource'>
     * } [fields] Fields to include (default all)
     * @returns {object[]} The request objects sent to the server
     */
    subsNewsHeadline(symbols, fields) {
        return this.subscribe({
            service: SERVICES.NEWS_HEADLINE,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
                fields: fields
                    ? fields.map(field => FIELDS.NEWS_HEADLINE[field]).join(',')
                    : '0,1,2,3,4,5,6,7,8,9,10',
            },
        })
    } // subsNewsHeadline()

    /**
     * Unsbscribe from News Headline updates
     *
     * @param {string|string[]} symbols Ticker symbols to unsubscribe from
     * @returns {object[]} The request objects sent to the server
     */
    unsubsNewsHeadline(symbols) {
        return this.unsubscribe({
            service: SERVICES.NEWS_HEADLINE,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
            },
        })
    } // unsubsNewsHeadline()

    /**
     * Subscribe to Timesale Equity updates
     *
     * @param {string|string[]} symbols Ticker symbols to subscribe to
     * @param {Array<'symbol'|'tradeTime'|'lastPrice'|'lastSize'|'lastSequence'>} [fields] Fields to include (default all)
     * @returns {object[]} The request objects sent to the server
     */
    subsTimesaleEquity(symbols, fields) {
        return this.subscribe({
            service: SERVICES.TIMESALE_EQUITY,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
                fields: fields
                    ? fields.map(field => FIELDS.TIMESALE[field]).join(',')
                    : '0,1,2,3,4',
            },
        })
    } // subsTimesaleEquity()

    /**
     * Unsbscribe from Timesale Equity updates
     *
     * @param {string|string[]} symbols Ticker symbols to unsubscribe from
     * @returns {object[]} The request objects sent to the server
     */
    unsubsTimesaleEquity(symbols) {
        return this.unsubscribe({
            service: SERVICES.TIMESALE_EQUITY,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
            },
        })
    } // unsubsTimesaleEquity()

    /**
     * Subscribe to Timesale Futures updates
     *
     * @param {string|string[]} symbols Ticker symbols to subscribe to
     * @param {Array<'symbol'|'tradeTime'|'lastPrice'|'lastSize'|'lastSequence'>} [fields] Fields to include (default all)
     * @returns {object[]} The request objects sent to the server
     */
    subsTimesaleFutures(symbols, fields) {
        return this.subscribe({
            service: SERVICES.TIMESALE_FUTURES,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
                fields: fields
                    ? fields.map(field => FIELDS.TIMESALE[field]).join(',')
                    : '0,1,2,3,4',
            },
        })
    } // subsTimesaleFutures()

    /**
     * Unsbscribe from Timesale Futures updates
     *
     * @param {string|string[]} symbols Ticker symbols to unsubscribe from
     * @returns {object[]} The request objects sent to the server
     */
    unsubsTimesaleFutures(symbols) {
        return this.unsubscribe({
            service: SERVICES.TIMESALE_FUTURES,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
            },
        })
    } // unsubsTimesaleFutures()

    /**
     * Subscribe to Timesale Options updates
     *
     * @param {string|string[]} symbols Ticker symbols to subscribe to
     * @param {Array<'symbol'|'tradeTime'|'lastPrice'|'lastSize'|'lastSequence'>} [fields] Fields to include (default all)
     * @returns {object[]} The request objects sent to the server
     */
    subsTimesaleOptions(symbols, fields) {
        return this.subscribe({
            service: SERVICES.TIMESALE_OPTIONS,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
                fields: fields
                    ? fields.map(field => FIELDS.TIMESALE[field]).join(',')
                    : '0,1,2,3,4',
            },
        })
    } // subsTimesaleOptions()

    /**
     * Unsbscribe from Timesale Options updates
     *
     * @param {string|string[]} symbols Ticker symbols to unsubscribe from
     * @returns {object[]} The request objects sent to the server
     */
    unsubsTimesaleOptions(symbols) {
        return this.unsubscribe({
            service: SERVICES.TIMESALE_OPTIONS,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
            },
        })
    } // unsubsTimesaleOptions()

    /**
     * Subscribe to Timesale Forex updates
     *
     * @param {string|string[]} symbols Ticker symbols to subscribe to
     * @param {Array<'symbol'|'tradeTime'|'lastPrice'|'lastSize'|'lastSequence'>} [fields] Fields to include (default all)
     * @returns {object[]} The request objects sent to the server
     */
    subsTimesaleForex(symbols, fields) {
        return this.subscribe({
            service: SERVICES.TIMESALE_FOREX,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
                fields: fields
                    ? fields.map(field => FIELDS.TIMESALE[field]).join(',')
                    : '0,1,2,3,4',
            },
        })
    } // subsTimesaleForex()

    /**
     * Unsbscribe from Timesale Forex updates
     *
     * @param {string|string[]} symbols Ticker symbols to unsubscribe from
     * @returns {object[]} The request objects sent to the server
     */
    unsubsTimesaleForex(symbols) {
        return this.unsubscribe({
            service: SERVICES.TIMESALE_FOREX,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
            },
        })
    } // unsubsTimesaleForex()

    /**
     * The Chart history futures options object
     *
     * @typedef {object} ChartHistoryFuturesOptions
     * @property {'m1'|'m5'|'m10'|'m30'|'h1'|'d1'|'w1'|'n1'} frequency Frequency
     * @property {string} period Time period. eg. d5, w4, n10, y1, y10 (d=day, w=week, n=month, y=year)
     * @property {string} START_TIME Start time of chart in milliseconds since Epoch
     * @property {string} END_TIME End time of chart in milliseconds since Epoch
     */
    /**
     * Get historical data for Futures
     *
     * @param {string|string[]} symbols Ticker symbols
     * @param {ChartHistoryFuturesOptions} options Chart history futures options
     * @returns {object[]} The request objects sent to the server
     */
    getChartHistoryFutures(symbols, options) {
        return this.sendRequest({
            requestid: Math.floor(Math.random() * 2000000000).toString(),
            service: SERVICES.CHART_HISTORY_FUTURES,
            command: COMMANDS.GET,
            parameters: Object.assign({}, options, {
                symbol: [].concat(symbols).join(',').toUpperCase()
            })
        })
    } // getChartHistoryFutures()

    /**
     * Subscribe to Level One Equity service
     *
     * @param {string|string[]} symbols Ticker symbols to subscribe to
     * @param {Array<'symbol'|'bidPrice'|'askPrice'|'lastPrice'|'bidSize'|'askSize'|'askID'|'bidID'|'totalVolume'|
     * 'lastSize'|'tradeTime'|'quoteTime'|'highPrice'|'lowPrice'|'bidTick'|'closePrice'|'exchangeID'|
     * 'marginable'|'shortable'|'quoteDay'|'tradeDay'|'volatility'|'description'|'lastID'|'digits'|
     * 'openPrice'|'netChange'|'52WeekHigh'|'52WeekLow'|'peRatio'|'dividendAmount'|'dividendYield'|'nav'|
     * 'fundPrice'|'exchangeName'|'dividendDate'|'regularMarketQuote'|'regularMarketTrade'|'regularMarketLastPrice'|
     * 'regularMarketLastSize'|'regularMarketTradeTime'|'regularMarketTradeDay'|'regularMarketNetChange'|
     * 'securityStatus'|'mark'|'quoteTimeInLong'|'tradeTimeInLong'|'regularMarketTradeTimeInLong'>
     * } [fields] Fields to include (default all)
     * @returns {object[]} object
     */
    subsLevelOneEquity(symbols, fields) {
        return this.subscribe({
            service: SERVICES.QUOTE,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
                fields: fields
                    ? fields.map(field => FIELDS.LEVEL_ONE_EQUITY[field]).join(',')
                    // : '0,1,2,3,4,5,6,7,8' // as seen in doc example
                    : Object.values(FIELDS.LEVEL_ONE_EQUITY).join(',')
            }
        })
    } // subsLevelOneEquity()

    /**
     * Unsbscribe from Level One Equity service
     *
     * @param {string|string[]} symbols Ticker symbols to unsubscribe from
     * @returns {object[]} The request objects sent to the server
     */
    unsubsLevelOneEquity(symbols) {
        return this.unsubscribe({
            service: SERVICES.QUOTE,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
            }
        })
    } // unsubsLevelOneEquity()

    /**
     * Subscribe to Level One Equity service
     *
     * @param {string|string[]} symbols Ticker symbols to subscribe to
     * @param {Array<'symbol'|'bidPrice'|'askPrice'|'lastPrice'|'bidSize'|'askSize'|'askID'|'bidID'|'totalVolume'|
     * 'lastSize'|'quoteTime'|'tradeTime'|'highPrice'|'lowPrice'|'closePrice'|'exchangeID'|'description'|'lastID'|
     * 'openPrice'|'netChange'|'futurePercentChange'|'exhangeName'|'securityStatus'|'openInterest'|'mark'|'tick'|
     * 'tickAmount'|'product'|'futurePriceFormat'|'futureTradingHours'|'futureIsTradable'|'futureMultiplier'|
     * 'futureIsActive'|'futureSettlementPrice'|'futureActiveSymbol'|'futureExpirationDate'>
     * } [fields] Fields to include (default all)
     * @returns {object[]} object
     */
    subsLevelOneFutures(symbols, fields) {
        return this.subscribe({
            service: SERVICES.LEVELONE_FUTURES,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
                fields: fields
                    ? fields.map(field => FIELDS.LEVEL_ONE_FUTURES[field]).join(',')
                    : Object.values(FIELDS.LEVEL_ONE_FUTURES).join(',')
            }
        })
    } // subsLevelOneFutures()

    /**
     * Unsbscribe from Level One Futures service
     *
     * @param {string|string[]} symbols Ticker symbols to unsubscribe from
     * @returns {object[]} The request objects sent to the server
     */
    unsubsLevelOneFutures(symbols) {
        return this.unsubscribe({
            service: SERVICES.LEVELONE_FUTURES,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
            }
        })
    } // unsubsLevelOneFutures()
    
    /**
     * Subscribe to Level One Option service
     *
     * @param {string|string[]} symbols Ticker symbols to subscribe to
     * @param {Array<'symbol'|'bidPrice'|'askPrice'|'lastPrice'|'bidSize'|'askSize'|'askID'|'bidID'|'totalVolume'|
     * 'lastSize'|'quoteTime'|'tradeTime'|'highPrice'|'lowPrice'|'closePrice'|'exchangeID'|'description'|'lastID'|
     * 'openPrice'|'netChange'|'futurePercentChange'|'exhangeName'|'securityStatus'|'openInterest'|'mark'|'tick'|
     * 'tickAmount'|'product'|'futurePriceFormat'|'futureTradingHours'|'futureIsTradable'|'futureMultiplier'|
     * 'futureIsActive'|'futureSettlementPrice'|'futureActiveSymbol'|'futureExpirationDate'>
     * } [fields] Fields to include (default all)
     * @returns {object[]} object
     */
    subsLevelOneOption(symbols, fields) {
        return this.subscribe({
            service: SERVICES.LEVEL_ONE_OPTION,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
                fields: fields
                    ? fields.map(field => FIELDS.LEVEL_ONE_OPTION[field]).join(',')
                    : Object.values(FIELDS.LEVEL_ONE_OPTION).join(',')
            }
        })
    } // subsLevelOneFutures()

    /**
     * Unsbscribe from Level One Option service
     *
     * @param {string|string[]} symbols Ticker symbols to unsubscribe from
     * @returns {object[]} The request objects sent to the server
     */
    unsubsLevelOneOption(symbols) {
        return this.unsubscribe({
            service: SERVICES.LEVEL_ONE_OPTION,
            parameters: {
                keys: [].concat(symbols).join(',').toUpperCase(),
            }
        })
    } // unsubsLevelOneFutures()
} // TDStreamer()

/**
 * Handle messages sent by the server
 *
 * @private
 * @param {EventEmitter} emitter Event emitter
 * @param {object} message Response sent by the server
 * @returns {void}
 */
function handleMessage(emitter, message) {
    let msg

    try {
        msg = JSON.parse(message)
        if (! msg || typeof msg !== 'object') {
            throw Error()
        }
    } catch (error) {
        emitter.emit(ERROR.INVALID_MESSAGE, message)
        return
    }

    debug('Received message %j', msg)

    if (Array.isArray(msg.response)) {
        return msg.response.forEach(response => handleResponse(emitter, response))
    }

    if (Array.isArray(msg.notify)) {
        return msg.notify.forEach(notification => handleNotification(emitter, notification))
    }

    if (Array.isArray(msg.data)) {
        return msg.data.forEach(data => handleData(emitter, data))
    }

    if (Array.isArray(msg.snapshot)) {
        return msg.snapshot.forEach(data => handleData(emitter, data))
    }

    emitter.emit(ERROR.UNKNOWN_MESSAGE, msg)
} // handleMessage()

/**
 * Handle response messages sent by the server
 *
 * @private
 * @param {EventEmitter} emitter Event emitter
 * @param {object} response Response sent by the server
 * @returns {void}
 */
function handleResponse(emitter, response) {
    switch (response.command) {
    case COMMANDS.QOS:
        break
    case COMMANDS.LOGIN:
        ! response.content.code
            ? emitter.emit(STATE.AUTHENTICATED)
            : emitter.emit(ERROR.AUTHENTICATION_FAILED, response.content)
        break
    case COMMANDS.LOGOUT:
        // emitter.emit(STATE.LOGGED_OUT)
        break
    case COMMANDS.SUBS:
        ! response.content.code
            ? emitter.emit(COMMANDS.SUBS, response)
            : emitter.emit(ERROR.UNKNOWN, response)
        break
    case COMMANDS.UNSUBS:
        ! response.content.code
            ? emitter.emit(COMMANDS.UNSUBS, response)
            : emitter.emit(ERROR.UNKNOWN, response)
        break
    default:
        emitter.emit(ERROR.UNKNOWN_RESPONSE, response)
    }
} // handleResponse()

/**
 * Handle notification messages sent by the server
 *
 * @private
 * @param {EventEmitter} emitter Event Emitter
 * @param {object} notification Notification object sent by the server
 * @returns {void}
 */
function handleNotification(emitter, notification) {
    if (notification.heartbeat) {
        emitter.emit('heartbeat', notification.heartbeat)
        return
    }

    emitter.emit(ERROR.UNKNOWN_NOTIFICATION, notification)
} // handleNotification()

/**
 * Handle data messages sent by the server
 *
 * @private
 * @param {EventEmitter} emitter Event Emitter
 * @param {object} data Data object sent by the server
 * @returns {void}
 */
function handleData(emitter, data) {
    switch (data.service) {
    case SERVICES.ACCT_ACTIVITY:
        emitter.emit(EVENT.ACCOUNT_ACTIVITY, transform.accountActivity(data))
        break
    case SERVICES.CHART_EQUITY:
        emitter.emit(EVENT.CHART, transform.chartEquityNormalized(data))
        break
    case SERVICES.CHART_FUTURES:
        emitter.emit(EVENT.CHART, transform.chartFuturesOptions(data))
        break
    case SERVICES.NEWS_HEADLINE:
        emitter.emit(EVENT.NEWS_HEADLINE, transform.newsHeadline(data))
        break
    case SERVICES.TIMESALE_EQUITY:
    case SERVICES.TIMESALE_FUTURES:
    case SERVICES.TIMESALE_OPTIONS:
    case SERVICES.TIMESALE_FOREX:
        emitter.emit(EVENT.TIMESALE, transform.timesale(data))
        break
    case SERVICES.LEVEL_ONE_OPTION:
        emitter.emit(EVENT.LEVEL_ONE_OPTION, transform.levelOneOption(data))
        break
    case SERVICES.QUOTE:
        emitter.emit(EVENT.LEVEL_ONE_EQUITY, transform.levelOneEquity(data))
        break
    case SERVICES.LEVELONE_FUTURES:
        emitter.emit(EVENT.LEVEL_ONE_FUTURES, transform.levelOneFutures(data))
        break
    case SERVICES.CHART_HISTORY_FUTURES:
        emitter.emit(EVENT.CHART_HISTORY_FUTURES, transform.chartHistoryFutures(data))
        break
    default:
        emitter.emit(ERROR.UNKNOWN_DATA, data)
    }
} // handleData()

/**
 * Compose a login request.
 *
 * @private
 * @param {object} userPrincipals User principals object
 * @returns {object} Login request
 */
function login(userPrincipals) {
    return {
        service: SERVICES.ADMIN,
        command: COMMANDS.LOGIN,
        parameters: {
            credential: credential(userPrincipals),
            token: userPrincipals.streamerInfo.token,
            version: '1.0',
        }
    }
} // login()

/**
 * Compose a logout request.
 *
 * @private
 * @returns {object} Logout request
 */
function logout() {
    return {
        service: SERVICES.ADMIN,
        command: COMMANDS.LOGOUT,
    }
} // logout()

/**
 * Compose the credential object.
 *
 * @private
 * @param {object} userPrincipals User principals object
 * @returns {object} Credential object
 */
function credential(userPrincipals) {
    //Converts ISO-8601 response in snapshot to ms since epoch accepted by Streamer
    const tokenTimeStampAsDateObj = new Date(userPrincipals.streamerInfo.tokenTimestamp)
    const tokenTimeStampAsMs = tokenTimeStampAsDateObj.getTime()

    const credentials = {
        userid: userPrincipals.accounts[0].accountId,
        token: userPrincipals.streamerInfo.token,
        company: userPrincipals.accounts[0].company,
        segment: userPrincipals.accounts[0].segment,
        cddomain: userPrincipals.accounts[0].accountCdDomainId,
        usergroup: userPrincipals.streamerInfo.userGroup,
        accesslevel: userPrincipals.streamerInfo.accessLevel,
        authorized: 'Y',
        timestamp: tokenTimeStampAsMs,
        appid: userPrincipals.streamerInfo.appId,
        acl: userPrincipals.streamerInfo.acl,
    }

    return jsonToQueryString(credentials)
} // credential()

/**
 * Compose a query string using the given json object.
 *
 * @private
 * @param {object} json Json object
 * @returns {string} Query string
 */
function jsonToQueryString(json) {
    return Object
        .keys(json)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(json[key]))
        .join('&')
} // jsonToQueryString()

module.exports = TDStreamer
