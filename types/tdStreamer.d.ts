export interface Request {
    /**
     *  A unique request identifier
     */
    requestid?: string
    /**
     * The service name
     */
    service: string
    /**
     * The service parameters
     */
    parameters: object
    /**
     * The command
     */
    command: string
}

export interface Service {
    /**
     * A unique request identifier
     */
    requestid: string
    /**
     * The service name
     */
    service: string
    /**
     * The service parameters
     */
    parameters: object
}

export interface ChartHistoryFuturesOptions {
    /**
     * Frequency
     */
    frequency: 'm1'|'m5'|'m10'|'m30'|'h1'|'d1'|'w1'|'n1'
    /**
     * Time period. eg. d5, w4, n10, y1, y10 (d=day, w=week, n=month, y=year)
     */
    period: string
    /**
     * Start time of chart in milliseconds since Epoch
     */
    START_TIME: string
    /**
     * End time of chart in milliseconds since Epoch
     */
    END_TIME: string
}

export type QOS =
    | 'express'
    | 'realtime'
    | 'fast'
    | 'moderate'
    | 'slow'
    | 'delayed'

export type AccountActivityFields =
    | 'subscriptionKey'
    | 'accountNumber'
    | 'messageType'
    | 'messageData'

export type EquityFields =
    | 'key'
    | 'openPrice'
    | 'highPrice'
    | 'lowPrice'
    | 'closePrice'
    | 'volume'
    | 'sequence'
    | 'chartTime'
    | 'chartDay'

export type FuturesFields =
    | 'key'
    | 'chartTime'
    | 'openPrice'
    | 'highPrice'
    | 'lowPrice'
    | 'closePrice'
    | 'volume'

export type OptionsFields =
    | 'key'
    | 'chartTime'
    | 'openPrice'
    | 'highPrice'
    | 'lowPrice'
    | 'closePrice'
    | 'volume'

export type NewsHeadlineFields =
    | 'symbol'
    | 'errorCode'
    | 'storyDatetime'
    | 'headlineId'
    | 'status'
    | 'headline'
    | 'storyId'
    | 'countForKeyword'
    | 'keywordArray'
    | 'isHot'
    | 'storySource'

export type TimesaleEquityFields =
    | 'symbol'
    | 'tradeTime'
    | 'lastPrice'
    | 'lastSize'
    | 'lastSequence'

export type TimesaleFuturesFields =
    | 'symbol'
    | 'tradeTime'
    | 'lastPrice'
    | 'lastSize'
    | 'lastSequence'

export type TimesaleOptionsFields =
    | 'symbol'
    | 'tradeTime'
    | 'lastPrice'
    | 'lastSize'
    | 'lastSequence'

export type TimesaleForexFields =
    | 'symbol'
    | 'tradeTime'
    | 'lastPrice'
    | 'lastSize'
    | 'lastSequence'

export type LevelOneEquityFields =
    | 'symbol' | 'bidPrice' | 'askPrice' | 'lastPrice' | 'bidSize' | 'askSize' | 'askID' | 'bidID' | 'totalVolume'
    | 'lastSize' | 'tradeTime' | 'quoteTime' | 'highPrice' | 'lowPrice' | 'bidTick' | 'closePrice' | 'exchangeID'
    | 'marginable' | 'shortable' | 'quoteDay' | 'tradeDay' | 'volatility' | 'description' | 'lastID' | 'digits'
    | 'openPrice' | 'netChange' | '52WeekHigh' | '52WeekLow' | 'peRatio' | 'dividendAmount' | 'dividendYield' | 'nav'
    | 'fundPrice' | 'exchangeName' | 'dividendDate' | 'regularMarketQuote' | 'regularMarketTrade' | 'regularMarketLastPrice'
    | 'regularMarketLastSize' | 'regularMarketTradeTime' | 'regularMarketTradeDay' | 'regularMarketNetChange'
    | 'securityStatus' | 'mark' | 'quoteTimeInLong' | 'tradeTimeInLong' | 'regularMarketTradeTimeInLong'

export type LevelOneFuturesFields =
    | 'symbol' | 'bidPrice' | 'askPrice' | 'lastPrice' | 'bidSize' | 'askSize' | 'askID' | 'bidID' | 'totalVolume'
    | 'lastSize' | 'quoteTime' | 'tradeTime' | 'highPrice' | 'lowPrice' | 'closePrice' | 'exchangeID' | 'description'
    | 'lastID' | 'openPrice' | 'netChange' | 'futurePercentChange' | 'exhangeName' | 'securityStatus' | 'openInterest'
    | 'mark' | 'tick' | 'tickAmount' | 'product' | 'futurePriceFormat' | 'futureTradingHours' | 'futureIsTradable'
    | 'futureMultiplier' | 'futureIsActive' | 'futureSettlementPrice' | 'futureActiveSymbol' | 'futureExpirationDate'

export type Event =
    | 'state_change'
    | 'message'
    | 'account_activity'
    | 'chart'
    | 'news_headline'
    | 'timesale'
    | 'level_one_equity'
    | 'level_one_futures'
    | 'chart_history_futures'
    | 'error'

export type State =
    | 'connecting'
    | 'connected'
    | 'authenticated'
    | 'disconnecting'
    | 'disconnected'

export type Error =
    | 'unknown_error'
    | 'unknown_message'
    | 'unknown_response'
    | 'unknown_notification'
    | 'unknown_data'
    | 'invalid_message'
    | 'connection_refused'
    | 'authentication_failed'

export class TDStreamer {
    /**
     * Add a listener for a given event.
     *
     * @param event The event name
     * @param fn Callback function
     */
    on(event: State|Event|Error, fn: Function): void
    /**
     * Add a one-time listener for a given event.
     *
     * @param event The event name
     * @param fn Callback function
     */
    once(event: State|Event|Error, fn: Function): void
    /**
     * Remove the listeners of a given event.
     *
     * @param event The event name
     * @param fn Callback function
     */
    removeListener(event: State|Event, fn: Function): void
    /**
     * Remove all listeners, or those of the specified event.
     *
     * @param event The event name
     */
    removeAllListeners(event?: State|Event|Error): void
    /**
     * Return an array listing the events for which
     * the streamer has registered listeners.
     *
     * @returns event names
     */
    eventNames(): (string|symbol)[]
    /**
     * Return the listeners registered for a given event.
     * @param event The event name
     * @returns List of listeners
     */
    listeners(event: State|Event|Error)
    /**
     * Return the number of listeners listening to a given event.
     *
     * @param event The event name
     * @returns Number of listeners
     */
    listenerCount(event: State|Event|Error): Number
    /**
     * Connect to the server.
     */
    connect(): void
    /**
     * Disconnect from the server.
     */
    disconnect(): void
    /**
     * Create a request object.
     *
     * @param requests The requests to send to the server
     * @returns The requests object
     */
    createRequest(requests: Request|Request[]): object
    /**
     * Send a request to the server.
     *
     * @param requests The requests to send to the server
     * @returns The requests sent to the server
     */
    sendRequest(requests: Request|Request[]): object
    /**
     * Send a message to the server.
     *
     * @param message The JSON message to send to server
     */
    send(message: object): void
    /**
     * Subscribe for service updates
     *
     * @param services The services to subscribe to
     * @returns The request objects sent to the server
     */
    subscribe(services: Service|Service[]): object[]
    /**
     * Unsubscribe from services updates
     *
     * @param services The services to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubscribe(services: Service|Service[]): object[]
    /**
     * Set Quality of Service
     *
     * @param level level
     * @returns The request objects sent to the server
     */
    setQOS(level: QOS): object[]
    /**
     * Subscribe to Account Activity updates
     *
     * @param fields Fields to include (default all)
     * @returns The request objects sent to the server
     */
    subsAccountActivity(fields?: AccountActivityFields[]): object[]
    /**
     * Unsubscribe from Account Activity updates
     *
     * @returns The request objects sent to the server
     */
    unsubsAccountActivity(): object[]
    /**
     * Susbscribe to Chart Equity updates
     *
     * @param symbols Ticker symbols to subscribe to
     * @param fields fields
     * @returns The request objects sent to the server
     */
    subsChartEquity(symbols: string|string[], fields?: EquityFields[]): object[]
    /**
     * Unsubscribe from Chart Equity updates
     *
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsChartEquity(symbols: string|string[]): object[]
    /**
     * Susbscribe to Chart Futures updates
     *
     * @param symbols Ticker symbols to subscribe to
     * @param fields fields
     * @returns The request objects sent to the server
     */
    subsChartFutures(symbols: string|string[], fields?: FuturesFields[]): object[]
    /**
     * Unsubscribe from Chart Futures updates
     *
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsChartFutures(symbols: string|string[]): object[]
    /**
     * Subscribe to Chart Options updates
     *
     * @param symbols Ticker symbols to subscribe to
     * @param fields fields
     * @returns The request objects sent to the server
     */
    subsChartOptions(symbols: string|string[], fields?: OptionsFields[]): object[]
    /**
     * Unsbscribe from Chart Options updates
     *
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsChartOptions(symbols: string|string[]): object[]
    /**
     * Subscribe to News Headline updates
     *
     * @param symbols Ticker symbols to subscribe to
     * @param fields fields
     * @returns The request objects sent to the server
     */
    subsNewsHeadline(symbols: string|string[], fields?: NewsHeadlineFields[]): object[]
    /**
     * Unsbscribe from News Headline updates
     *
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsNewsHeadline(symbols: string|string[]): object[]
    /**
     * Subscribe to Timesale Equity updates
     *
     * @param symbols Ticker symbols to subscribe to
     * @param fields fields
     * @returns The request objects sent to the server
     */
    subsTimesaleEquity(symbols: string|string[], fields?: TimesaleEquityFields): object[]
    /**
     * Unsbscribe from Timesale Equity updates
     *
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsTimesaleEquity(symbols: string|string[]): object[]
    /**
     * Subscribe to Timesale Futures updates
     *
     * @param symbols Ticker symbols to subscribe to
     * @param fields fields
     * @returns The request objects sent to the server
     */
    subsTimesaleFutures(symbols: string|string[], fields?: TimesaleFuturesFields[]): object[]
    /**
     * Unsbscribe from Timesale Futures updates
     *
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsTimesaleFutures(symbols: string|string[]): object[]
    /**
     * Subscribe to Timesale Options updates
     *
     * @param symbols Ticker symbols to subscribe to
     * @param fields fields
     * @returns The request objects sent to the server
     */
    subsTimesaleOptions(symbols: string|string[], fields?: TimesaleOptionsFields[]): object[]
    /**
     * Unsbscribe from Timesale Options updates
     *
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsTimesaleOptions(symbols: string|string[]): object[]
    /**
     * Subscribe to Timesale Forex updates
     *
     * @param symbols Ticker symbols to subscribe to
     * @param fields fields
     * @returns The request objects sent to the server
     */
    subsTimesaleForex(symbols: string|string[], fields?: TimesaleForexFields): object[]
    /**
     * Unsbscribe from Timesale Forex updates
     *
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsTimesaleForex(symbols: string|string[]): object[]
    /**
     * Get historical data for Futures
     *
     * @param symbols Ticker symbols
     * @param options Chart history futures options
     * @returns The request objects sent to the server
     */
    getChartHistoryFutures(symbols: string|string[], options: ChartHistoryFuturesOptions): object[]
    /**
     * Subscribe to Level One Equity service
     *
     * @param symbols Ticker symbols to subscribe to
     * @param fields fields
     * @returns The request objects sent to the server
     */
    subsLevelOneEquity(symbols: string|string[], fields?: LevelOneEquityFields): object[]
    /**
     * Unsbscribe from Level One Equity service
     *
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsLevelOneEquity(symbols: string|string[]): object[]
    /**
     * Subscribe to Level One Equity service
     *
     * @param symbols Ticker symbols to subscribe to
     * @param fields fields
     * @returns The request objects sent to the server
     */
    subsLevelOneFutures(symbols: string|string[], fields?: LevelOneFuturesFields): object[]
    /**
     * Unsbscribe from Level One Futures service
     *
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsLevelOneFutures(symbols: string|string[]): object[]
}
