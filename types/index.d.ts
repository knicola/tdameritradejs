import EventEmitter from 'eventemitter3'
import { AxiosInstance } from 'axios'

export class TDAccount {
    /**
     * @param accountId The account id
     * @param config Config
     */
    constructor(accountId: string, config?: Config)
    /**
     * Get account balances, positions, and orders.
     * @param fields Fields to include
     * @returns The requested account
     */
    getAccount(fields?: AccountFields|Array<AccountFields>): Promise<any>;
    /**
     * Get account positions.
     * @returns The requested account's positions
     */
    getPositions(): Promise<any>;
    /**
     * Get account preferences.
     * @returns The account preferences
     */
    getPreferences(): Promise<any>;
    /**
     * Update account preferences. The `directOptionsRouting` and
     * `directEquityRouting` values cannot be modified via this operation.
     * @param preferences The updated preferences
     * @returns Success
     */
    updatePreferences(preferences: Preferences): Promise<any>;
    /**
     * Get the SubscriptionKey.
     * @returns The susbscription keys
     */
    getStreamerSubscriptionKeys(): Promise<any>;
    /**
     * Get a list of orders.
     * @param params The query parameters
     * @returns List of orders
     */
    getOrders(params: OrdersQuery): Promise<any>;
    /**
     * Get a specific order.
     * @param orderId The order id
     * @returns The order details
     */
    getOrder(orderId: string): Promise<any>;
    /**
     * Place an order.
     * Read {@link https://developer.tdameritrade.com/content/place-order-samples Place Order Samples} for more info.
     * @param order The order
     * @returns Success
     */
    placeOrder(order: object): Promise<any>;
    /**
     * Replace an existing order. The existing order will be replaced by the new order.
     * Once replaced, the old order will be canceled and a new order will be created.
     * @param orderId The order id
     * @param order The new order
     * @returns Success
     */
    replaceOrder(orderId: string, order: object): Promise<any>;
    /**
     * Cancel a specific order.
     * @param orderId The order id
     * @returns Success
     */
    cancelOrder(orderId: string): Promise<any>;
    /**
     * Save an order.
     * @param savedOrder The saved order
     * @returns Success
     */
    createSavedOrder(savedOrder: object): Promise<any>;
    /**
     * Delete a specific saved order.
     * @param savedOrderId The saved order id
     * @returns Success
     */
    deleteSavedOrder(savedOrderId: string): Promise<any>;
    /**
     * Get saved order by its ID.
     * @param savedOrderId The saved order id
     * @returns The saved order details
     */
    getSavedOrder(savedOrderId: string): Promise<any>;
    /**
     * Get saved orders.
     * @returns List of saved orders
     */
    getSavedOrders(): Promise<any>;
    /**
     * Replace an existing saved order for an account. The existing saved order will be replaced by the new order.
     * @param savedOrderId The saved order id
     * @param savedOrder The new saved order
     * @returns Success
     */
    replaceSavedOrder(savedOrderId: string, savedOrder: object): Promise<any>;
    /**
     * Create watchlist.
     * @param watchlist The watchlist
     * @returns Success
     */
    createWatchlist(watchlist: Watchlist): Promise<any>;
    /**
     * Delete watchlist.
     * @param watchlistId The watchlist id
     * @returns Success
     */
    deleteWatchlist(watchlistId: string): Promise<any>;
    /**
     * Get watchlist.
     * @param watchlistId The watchlist id
     * @returns Success
     */
    getWatchlist(watchlistId: string): Promise<any>;
    /**
     * Get all watchlists.
     * @returns List of watchlists
     */
    getWatchlists(): Promise<any>;
    /**
     * Replace watchlist. This method does not verify that the symbol or asset type are valid.
     * @param watchlistId The watchlist id
     * @param watchlist The watchlist
     * @returns Success
     */
    replaceWatchlist(watchlistId: string, watchlist: Watchlist): Promise<any>;
    /**
     * Partially update watchlist: change watchlist name, add to the
     * beginning/end of a watchlist, update or delete items in a watchlist.
     * This method does not verify that the symbol or asset type are valid.
     * @param watchlistId The watchlist id
     * @param watchlist The new watchlist
     * @returns Success
     */
    updateWatchlist(watchlistId: string, watchlist: Watchlist): Promise<any>;
    /**
     * Get a transaction.
     * @param transactionId The transaction id
     * @returns The transaction details
     */
    getTransaction(transactionId: string): Promise<any>;
    /**
     * Get all transactions.
     * @param params The query parameters
     * @returns The transaction history
     */
    getTransactions(params: TransactionQuery): Promise<any>;
}
export class TDAmeritrade {
    /**
     * @param config Config
     * @example
     * const td = new TDAmeritrade({
     *     apiKey: process.env.API_KEY,
     *     redirectUri: 'https://localhost:8443',
     *     sslKey: './selfsigned.key',
     *     sslCert: './selfsigned.crt',
     * })
     */
    constructor(config?: Config)
    /**
     * The axios instance used by the client.
     */
    axios: AxiosInstance;
    /**
     * Add a listener for a given event.
     * @param event The event name
     * @param fn Callback function
     * @returns Event emitter
     */
    on(event: 'login'|'token', fn: EventEmitter.EventListener<any, any>): EventEmitter<(string|symbol), any>;
    /**
     * Get account balances, positions, and orders for all linked accounts.
     * @param fields Fields to include
     * @returns List of all accounts
     * @example
     * const accounts = await td.getAccounts()
     */
    getAccounts(fields?: AccountFields|Array<AccountFields>): Promise<any>;
    /**
     * Get account balances, positions, and orders for a specific account.
     * @param accountId The account id
     * @param fields Fields to include
     * @returns The requested account
     * @example
     * const acctInfo = await td.getAccount('45678')
     */
    getAccount(accountId: string, fields?: AccountFields|Array<AccountFields>): Promise<any>;
    /**
     * Get account positions for a specific account.
     * @param accountId The account id
     * @returns The requested account's positions
     * @example
     * const acctInfo = await td.getPositions('45678')
     */
    getPositions(accountId: string): Promise<any>;
    /**
     * Get preferences for a specific account.
     * @param accountId The account id
     * @returns The account preferences
     * @example
     * const prefs = await td.getPreferences('45678')
     */
    getPreferences(accountId: string): Promise<any>;
    /**
     * Update preferences for a specific account. The `directOptionsRouting` and
     * `directEquityRouting` values cannot be modified via this operation.
     * @param accountId The account id
     * @param preferences The updated preferences
     * @returns Success
     */
    updatePreferences(accountId: string, preferences: Preferences): Promise<any>;
    /**
     * Get the SubscriptionKey for provided accounts or default accounts.
     * @param accountIds The account id(s)
     * @returns The susbscription keys
     * @example
     * const subsKeys = await td.getStreamerSubscriptionKeys('45678')
     */
    getStreamerSubscriptionKeys(accountIds?: string|Array<string>): Promise<any>;
    /**
     * Get user principal details.
     * @param fields Fields to include
     * @returns User principal details
     * @example
     * const usrPrinc = await td.getUserPrincipals()
     * // OR
     * const usrPrinc = await td.getUserPrincipals('streamerSubscriptionKeys')
     * // OR
     * const usrPrinc = await td.getUserPrincipals(['streamerSubscriptionKeys', 'streamerConnectionInfo'])
     */
    getUserPrincipals(fields?: UserPrincipalFields|Array<UserPrincipalFields>): Promise<any>;
    /**
     * Get the market hours for the specified market(s).
     * @param markets The market(s) for which you're requesting market hours
     * @param date The date for which market hours information is requested. Valid ISO-8601 formats are `yyyy-MM-dd` and `yyyy-MM-dd'T'HH:mm:ssz`
     * @returns The market hours
     * @example
     * td.getMarketHours('EQUITY', '2021-01-21')
     * // OR
     * td.getMarketHours(['EQUITY', 'FUTURE'], '2021-01-21')
     */
    getMarketHours(markets: Market|Array<Market>, date: string): Promise<any>;
    /**
     * Get mover information by index symbol, direction type and change.
     * @param index The index symbol
     * @param direction The direction
     * @param change The change type
     * @returns The mover information
     * @example
     * const movers = await td.getMovers('$DJI', 'up', 'percent')
     */
    getMovers(index: '$COMPX'|'$DJI'|'$SPX.X', direction: 'up'|'down', change: 'value'|'percent'): Promise<any>;
    /**
     * Get quote data for one or more symbols.
     * @param symbols The ticker symbol(s)
     * @returns The quote data
     * @example
     * const data = await td.getQuotes(['ABC', 'XYZ'])
     */
    getQuotes(symbols: string|Array<string>): Promise<any>;
    /**
     * Get quote data for a specified symbol.
     * @param symbol The ticker symbol
     * @returns The quote data
     * @example
     * const data = await td.getQuote('XYZ')
     */
    getQuote(symbol: string): Promise<any>;
    /**
     * Get price history for a specified symbol.
     * @param symbol The ticker symbol
     * @param params The query parameters
     * @returns The price history
     * @example
     * const prices = await td.getPriceHistory('XYZ', {
     *     periodType: 'day',
     *     period: 5,
     *     frequencyType: 'minute',
     *     needExtendedHoursData: false
     * })
     */
    getPriceHistory(symbol: string, params: PriceHistoryQuery): Promise<any>;
    /**
     * Get Option Chains for optionable symbols.
     * @param symbol The ticker symbol
     * @param params The query parameters
     * @returns The option chain
     */
    getOptionChain(symbol: string, params: OptionChainQuery): Promise<any>;
    /**
     * Search or retrieve instrument data, including fundamental data.
     * @param symbol The ticker symbol
     * @param projection The type of request
     *      - `symbol-search`: Retrieve instrument data of a specific symbol or cusip
     *      - `symbol-regex`: Retrieve instrument data for all symbols matching regex. Example: `symbol=XYZ.*`
     *         will return all symbols beginning with XYZ
     *      - `desc-search`: Retrieve instrument data for instruments whose description contains the word supplied.
     *         Example: `symbol=FakeCompany` will return all instruments with FakeCompany in the description.
     *      - `desc-regex`: Search description with full regex support. Example: `symbol=XYZ.[A-C]` returns all instruments
     *         whose descriptions contain a word beginning with XYZ followed by a character A through C.
     *      - `fundamental`: Returns fundamental data for a single instrument specified by exact symbol.
     * @returns The instrument data
     * @example
     * const res = await td.searchInstruments('XYZ', 'symbol-search')
     */
    searchInstruments(symbol: string, projection: 'symbol-search'|'symbol-regex'|'desc-search'|'desc-regex'|'fundamental'): Promise<any>;
    /**
     * Get an instrument by its CUSIP.
     * @param cusip The CUSIP identifier
     * @returns The instrument details
     * @example
     * const instr = await td.getInstrument('03074K100')
     */
    getInstrument(cusip: string): Promise<any>;
    /**
     * Bootstrap a local web server for oauth2 authorization. Will request
     * access token and update config if authorization is successful.
     * 
     * **(Available for Nodejs only)**
     * @returns Success
     * @example
     * td.authorize().then(token => {
     *     console.log(token)
     * }).catch(err => {
     *     console.log(err)
     * })
     */
    authorize(): Promise<any>;
    /**
     * Authorize or refresh the access token depending on whether
     * the access and/or refresh token exist and are not expired.
     * 
     * **(Available for Nodejs only)**
     * @returns Success
     * @example
     * td.login().then(token => {
     *     console.log(token)
     * }).catch(err => {
     *     console.log(err)
     * })
     */
    login(): Promise<any>;
    /**
     * Get a specific order for a specific account.
     * @param accountId The account id
     * @param orderId The order id
     * @returns The order details
     * @example
     * const order = await td.getOrder('45678', '98745')
     */
    getOrder(accountId: string, orderId: string): Promise<any>;
    /**
     * Get a list of orders for a specific account.
     * @param accountId The account id
     * @param params The query parameters
     * @returns List of orders
     * @example
     * const orders = await td.getOrders('45678', {
     *     fromEnteredTime: '2021-01-01',
     *     toEnteredTime: '2021-01-15',
     *     maxResults: 25,
     *     status: 'FILLED'
     * })
     */
    getOrders(accountId: string, params: OrdersQuery): Promise<any>;
    /**
     * Get a list of orders from all accounts.
     * @param params The query parameters
     * @returns List of orders
     * @example
     * const orders = await td.getAllOrders({
     *     fromEnteredTime: '2021-01-01',
     *     toEnteredTime: '2021-01-15',
     *     maxResults: 25,
     *     status: 'FILLED'
     * })
     */
    getAllOrders(params: OrdersQuery): Promise<any>;
    /**
     * Place an order for a specific account.
     * Read {@link https://developer.tdameritrade.com/content/place-order-samples Place Order Samples} for more info.
     * @param accountId The account id
     * @param order The order
     * @returns Success
     * @example
     * await td.placeOrder('45678', {
     *     orderType: 'MARKET',
     *     session: 'NORMAL',
     *     duration: 'DAY',
     *     orderStrategyType: 'SINGLE',
     *     orderLegCollection: [
     *         {
     *             instruction: 'Buy',
     *             quantity: 15,
     *             instrument: {
     *                 symbol: 'XYZ',
     *                 assetType: 'EQUITY'
     *             }
     *         }
     *     ]
     * })
     */
    placeOrder(accountId: string, order: object): Promise<any>;
    /**
     * Replace an existing order for an account. The existing order will be replaced by the new order.
     * Once replaced, the old order will be canceled and a new order will be created.
     * @param accountId The account id
     * @param orderId The order id
     * @param order The new order
     * @returns Success
     */
    replaceOrder(accountId: string, orderId: string, order: object): Promise<any>;
    /**
     * Cancel a specific order for a specific account.
     * @param accountId The account id
     * @param orderId The order id
     * @returns Success
     * @example
     * await td.cancelOrder('45678', '98745')
     */
    cancelOrder(accountId: string, orderId: string): Promise<any>;
    /**
     * Get saved order by its ID, for a specific account.
     * @param accountId The account id
     * @param savedOrderId The saved order id
     * @returns The saved order details
     */
    getSavedOrder(accountId: string, savedOrderId: string): Promise<any>;
    /**
     * Get saved orders for a specific account.
     * @param accountId The account id
     * @returns List of saved orders
     */
    getSavedOrders(accountId: string): Promise<any>;
    /**
     * Save an order for a specific account.
     * @param accountId The account id
     * @param savedOrder The saved order
     * @returns Success
     * @example
     * await td.createSavedOrder('45678', {
     *     complexOrderStrategyType: 'NONE',
     *     orderType: 'LIMIT',
     *     session: 'NORMAL',
     *     price: '6.45',
     *     duration: 'DAY',
     *     orderStrategyType: 'SINGLE',
     *     orderLegCollection: [
     *         {
     *             instruction: 'BUY_TO_OPEN',
     *             quantity: 10,
     *             instrument: {
     *                 symbol: 'XYZ_032015C49',
     *                 assetType: 'OPTION'
     *             }
     *         }
     *     ]
     * })
     */
    createSavedOrder(accountId: string, savedOrder: object): Promise<any>;
    /**
     * Replace an existing saved order for an account. The existing saved order will be replaced by the new order.
     * @param accountId The account id
     * @param savedOrderId The saved order id
     * @param savedOrder The new saved order
     * @returns Success
     */
    replaceSavedOrder(accountId: string, savedOrderId: string, savedOrder: object): Promise<any>;
    /**
     * Delete a specific saved order for a specific account.
     * @param accountId The account id
     * @param savedOrderId The saved order id
     * @returns Success
     * @example
     * await td.deleteSavedOrder('45678', '98754')
     */
    deleteSavedOrder(accountId: string, savedOrderId: string): Promise<any>;
    /**
     * Get the access token along with an optional refresh token.
     * @param authCode The authorization code
     * @returns The token details
     * @example
     * const token = await td.getAccessToken('authorization-code-goes-here')
     */
    getAccessToken(authCode: string): Promise<any>;
    /**
     * Refresh the access token.
     * @param refreshToken The refresh token
     * @returns The token details
     * @example
     * const token = await td.refreshAccessToken('refresh-token-goes-here')
     */
    refreshAccessToken(refreshToken?: string): Promise<any>;
    /**
     * Determine if access token is expired.
     * @returns True if expired, otherwise false
     */
    isAccessTokenExpired(): boolean;
    /**
     * Determine if refresh token is expired.
     * @returns True if expired, otherwise false
     */
    isRefreshTokenExpired(): boolean;
    /**
     * Get a transaction for a specific account.
     * @param accountId The account id
     * @param transactionId The transaction id
     * @returns The transaction details
     * @example
     * const transaction = await td.getTransaction('45678', '98754')
     */
    getTransaction(accountId: string, transactionId: string): Promise<any>;
    /**
     * Get all transactions for a specific account.
     * @param accountId The account id
     * @param params The query parameters
     * @returns The transaction history
     * @example
     * const transactions = await td.getTransactions('45678', {
     *     symbol: 'SPY',
     *     startDate: '2021-01-01',
     *     endDate: '2021-01-31',
     * })
     */
    getTransactions(accountId: string, params: TransactionQuery): Promise<any>;
    /**
     * Create watchlist for specific account.
     * @param accountId The account id
     * @param watchlist The watchlist
     * @returns Success
     */
    createWatchlist(accountId: string, watchlist: Watchlist): Promise<any>;
    /**
     * Delete watchlist for a specific account.
     * @param accountId The account id
     * @param watchlistId The watchlist id
     * @returns Success
     * @example
     * await td.deleteWatchlist('45678', '98754')
     */
    deleteWatchlist(accountId: string, watchlistId: string): Promise<any>;
    /**
     * Get watchlist for a specific account.
     * @param accountId The account id
     * @param watchlistId The watchlist id
     * @returns Success
     * @example
     * const watchlist = await td.getWatchlist('45678', '98754')
     */
    getWatchlist(accountId: string, watchlistId: string): Promise<any>;
    /**
     * Get all watchlists of an account.
     * @param accountId The account id
     * @returns List of watchlists
     * @example
     * const watchlists = await td.getWatchlists('45678')
     */
    getWatchlists(accountId: string): Promise<any>;
    /**
     * All watchlists for all of the user's linked accounts.
     * @returns List of watchlists
     * @example
     * const watchlists = await td.getAllWatchlists()
     */
    getAllWatchlists(): Promise<any>;
    /**
     * Replace watchlist for a specific account. This method does not verify that the symbol or asset type are valid.
     * @param accountId The account id
     * @param watchlistId The watchlist id
     * @param watchlist The watchlist
     * @returns Success
     */
    replaceWatchlist(accountId: string, watchlistId: string, watchlist: Watchlist): Promise<any>;
    /**
     * Partially update watchlist for a specific account: change watchlist name, add
     * to the beginning/end of a watchlist, update or delete items in a watchlist.
     * This method does not verify that the symbol or asset type are valid.
     * @param accountId The account id
     * @param watchlistId The watchlist id
     * @param watchlist The new watchlist
     * @returns Success
     */
    updateWatchlist(accountId: string, watchlistId: string, watchlist: Watchlist): Promise<any>;
    /**
     * Create a new instance of Account.
     * @param accountId The account id
     * @returns A new Account instance
     * @example
     * const ira_account = td.account('45678')
     */
    account(accountId: string): TDAccount;
    /**
     * Create a new instance of TDStreamer.
     * For the time being, this will select the first available account.
     * @returns A new TDStreamer instance
     * @example
     * const streamer = await td.streamer()
     */
    streamer(): Promise<TDStreamer>;
}
export class TDStreamer {
    /**
     * @param userPrincipals User principals object
     */
    constructor(userPrincipals: object)
    /**
     * @returns state
     */
    state: any;
    /**
     * Add a listener for a given event.
     * @param event The event name
     * @param fn Callback function
     * @returns Event emitter
     */
    on(event: State|Event|Error, fn: EventEmitter.EventListener<any, any>): EventEmitter<(string|symbol), any>;
    /**
     * Add a one-time listener for a given event.
     * @param event The event name
     * @param fn Callback function
     * @returns Event emitter
     */
    once(event: State|Event|Error, fn: EventEmitter.EventListener<any, any>): EventEmitter<(string|symbol), any>;
    /**
     * Remove the listeners of a given event.
     * @param event The event name
     * @param fn Callback function
     * @returns 
     */
    removeListener(event: State|Event, fn: EventEmitter.EventListener<any, any>): void;
    /**
     * Remove all listeners, or those of the specified event.
     * @param event The event name
     * @returns 
     */
    removeAllListeners(event?: State|Event|Error): void;
    /**
     * Return an array listing the events for which
     * the streamer has registered listeners.
     * @returns event names
     */
    eventNames(): Array<(string|symbol)>;
    /**
     * Return the listeners registered for a given event.
     * @param event The event name
     * @returns List of listeners
     */
    listeners(event: State|Event|Error): Array<EventEmitter.EventListener<any, any>>;
    /**
     * Return the number of listeners listening to a given event.
     * @param event The event name
     * @returns Number of listeners
     */
    listenerCount(event: State|Event|Error): number;
    /**
     * Connect to the server
     * @returns 
     */
    connect(): void;
    /**
     * Disconnect from the server
     * @param options Options
     * @returns 
     */
    disconnect(options: DisconnectOptions): void;
    /**
     * Create a request object
     * @param requests The requests to send to the server
     * @returns The requests object
     */
    createRequest(requests: Request|Array<Request>): object;
    /**
     * Send a request to the server
     * @param requests The requests to send to the server
     * @returns The requests sent to the server
     */
    sendRequest(requests: Request|Array<Request>): Array<object>;
    /**
     * Send a message to the server
     * @param message The JSON message to send to server
     * @returns 
     */
    send(message: object): void;
    /**
     * Subscribe for service updates
     * @param services The services to subscribe to
     * @returns The request objects sent to the server
     */
    subscribe(services: Service|Array<Service>): Array<object>;
    /**
     * Unsubscribe from services updates
     * @param services The services to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubscribe(services: Service|Array<Service>): Array<object>;
    /**
     * Set Quality of Service
     * @param level level
     * @returns The request objects sent to the server
     */
    setQOS(level: 'express'|'realtime'|'fast'|'moderate'|'slow'|'delayed'): Array<object>;
    /**
     * Subscribe to Account Activity updates
     * @param fields Fields to include (default all)
     * @returns The request objects sent to the server
     */
    subsAccountActivity(fields?: Array<('subscriptionKey'|'accountNumber'|'messageType'|'messageData')>): Array<object>;
    /**
     * Unsubscribe from Account Activity updates
     * @returns The request objects sent to the server
     */
    unsubsAccountActivity(): Array<object>;
    /**
     * Susbscribe to Chart Equity updates
     * @param symbols Ticker symbols to subscribe to
     * @param fields Fields to include (default all)
     * @returns The request objects sent to the server
     */
    subsChartEquity(symbols: string|Array<string>, fields?: Array<('key'|'openPrice'|'highPrice'|'lowPrice'|'closePrice'|'volume'|'sequence'|'chartTime'|'chartDay')>): Array<object>;
    /**
     * Unsubscribe from Chart Equity updates
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsChartEquity(symbols: string|Array<string>): Array<object>;
    /**
     * Susbscribe to Chart Futures updates
     * @param symbols Ticker symbols to subscribe to
     * @param fields Fields to include (default all)
     * @returns The request objects sent to the server
     */
    subsChartFutures(symbols: string|Array<string>, fields?: Array<('key'|'chartTime'|'openPrice'|'highPrice'|'lowPrice'|'closePrice'|'volume')>): Array<object>;
    /**
     * Unsubscribe from Chart Futures updates
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsChartFutures(symbols: string|Array<string>): Array<object>;
    /**
     * Subscribe to Chart Options updates
     * @param symbols Ticker symbols to subscribe to
     * @param fields Fields to include (default all)
     * @returns The request objects sent to the server
     */
    subsChartOptions(symbols: string|Array<string>, fields?: Array<('key'|'chartTime'|'openPrice'|'highPrice'|'lowPrice'|'closePrice'|'volume')>): Array<object>;
    /**
     * Unsbscribe from Chart Options updates
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsChartOptions(symbols: string|Array<string>): Array<object>;
    /**
     * Subscribe to News Headline updates
     * @param symbols Ticker symbols to subscribe to
     * @param fields Fields to include (default all)
     * @returns The request objects sent to the server
     */
    subsNewsHeadline(symbols: string|Array<string>, fields?: Array<('symbol'|'errorCode'|'storyDatetime'|'headlineId'|'status'|'headline'|'storyId'|'countForKeyword'|'keywordArray'|'isHot'|'storySource')>): Array<object>;
    /**
     * Unsbscribe from News Headline updates
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsNewsHeadline(symbols: string|Array<string>): Array<object>;
    /**
     * Subscribe to Timesale Equity updates
     * @param symbols Ticker symbols to subscribe to
     * @param fields Fields to include (default all)
     * @returns The request objects sent to the server
     */
    subsTimesaleEquity(symbols: string|Array<string>, fields?: Array<('symbol'|'tradeTime'|'lastPrice'|'lastSize'|'lastSequence')>): Array<object>;
    /**
     * Unsbscribe from Timesale Equity updates
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsTimesaleEquity(symbols: string|Array<string>): Array<object>;
    /**
     * Subscribe to Timesale Futures updates
     * @param symbols Ticker symbols to subscribe to
     * @param fields Fields to include (default all)
     * @returns The request objects sent to the server
     */
    subsTimesaleFutures(symbols: string|Array<string>, fields?: Array<('symbol'|'tradeTime'|'lastPrice'|'lastSize'|'lastSequence')>): Array<object>;
    /**
     * Unsbscribe from Timesale Futures updates
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsTimesaleFutures(symbols: string|Array<string>): Array<object>;
    /**
     * Subscribe to Timesale Options updates
     * @param symbols Ticker symbols to subscribe to
     * @param fields Fields to include (default all)
     * @returns The request objects sent to the server
     */
    subsTimesaleOptions(symbols: string|Array<string>, fields?: Array<('symbol'|'tradeTime'|'lastPrice'|'lastSize'|'lastSequence')>): Array<object>;
    /**
     * Unsbscribe from Timesale Options updates
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsTimesaleOptions(symbols: string|Array<string>): Array<object>;
    /**
     * Subscribe to Timesale Forex updates
     * @param symbols Ticker symbols to subscribe to
     * @param fields Fields to include (default all)
     * @returns The request objects sent to the server
     */
    subsTimesaleForex(symbols: string|Array<string>, fields?: Array<('symbol'|'tradeTime'|'lastPrice'|'lastSize'|'lastSequence')>): Array<object>;
    /**
     * Unsbscribe from Timesale Forex updates
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsTimesaleForex(symbols: string|Array<string>): Array<object>;
    /**
     * Get historical data for Futures
     * @param symbols Ticker symbols
     * @param options Chart history futures options
     * @returns The request objects sent to the server
     */
    getChartHistoryFutures(symbols: string|Array<string>, options: ChartHistoryFuturesOptions): Array<object>;
    /**
     * Subscribe to Level One Equity service
     * @param symbols Ticker symbols to subscribe to
     * @param fields Fields to include (default all)
     * @returns object
     */
    subsLevelOneEquity(symbols: string|Array<string>, fields?: Array<('symbol'|'bidPrice'|'askPrice'|'lastPrice'|'bidSize'|'askSize'|'askID'|'bidID'|'totalVolume'|'lastSize'|'tradeTime'|'quoteTime'|'highPrice'|'lowPrice'|'bidTick'|'closePrice'|'exchangeID'|'marginable'|'shortable'|'quoteDay'|'tradeDay'|'volatility'|'description'|'lastID'|'digits'|'openPrice'|'netChange'|'52WeekHigh'|'52WeekLow'|'peRatio'|'dividendAmount'|'dividendYield'|'nav'|'fundPrice'|'exchangeName'|'dividendDate'|'regularMarketQuote'|'regularMarketTrade'|'regularMarketLastPrice'|'regularMarketLastSize'|'regularMarketTradeTime'|'regularMarketTradeDay'|'regularMarketNetChange'|'securityStatus'|'mark'|'quoteTimeInLong'|'tradeTimeInLong'|'regularMarketTradeTimeInLong')>): Array<object>;
    /**
     * Unsbscribe from Level One Equity service
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsLevelOneEquity(symbols: string|Array<string>): Array<object>;
    /**
     * Subscribe to Level One Equity service
     * @param symbols Ticker symbols to subscribe to
     * @param fields Fields to include (default all)
     * @returns object
     */
    subsLevelOneFutures(symbols: string|Array<string>, fields?: Array<('symbol'|'bidPrice'|'askPrice'|'lastPrice'|'bidSize'|'askSize'|'askID'|'bidID'|'totalVolume'|'lastSize'|'quoteTime'|'tradeTime'|'highPrice'|'lowPrice'|'closePrice'|'exchangeID'|'description'|'lastID'|'openPrice'|'netChange'|'futurePercentChange'|'exhangeName'|'securityStatus'|'openInterest'|'mark'|'tick'|'tickAmount'|'product'|'futurePriceFormat'|'futureTradingHours'|'futureIsTradable'|'futureMultiplier'|'futureIsActive'|'futureSettlementPrice'|'futureActiveSymbol'|'futureExpirationDate')>): Array<object>;
    /**
     * Unsbscribe from Level One Futures service
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsLevelOneFutures(symbols: string|Array<string>): Array<object>;
    /**
     * Subscribe to Level One Option service
     * @param symbols Ticker symbols to subscribe to
     * @param fields Fields to include (default all)
     * @returns object
     */
    subsLevelOneOption(symbols: string|Array<string>, fields?: Array<('symbol'|'bidPrice'|'askPrice'|'lastPrice'|'bidSize'|'askSize'|'askID'|'bidID'|'totalVolume'|'lastSize'|'quoteTime'|'tradeTime'|'highPrice'|'lowPrice'|'closePrice'|'exchangeID'|'description'|'lastID'|'openPrice'|'netChange'|'futurePercentChange'|'exhangeName'|'securityStatus'|'openInterest'|'mark'|'tick'|'tickAmount'|'product'|'futurePriceFormat'|'futureTradingHours'|'futureIsTradable'|'futureMultiplier'|'futureIsActive'|'futureSettlementPrice'|'futureActiveSymbol'|'futureExpirationDate')>): Array<object>;
    /**
     * Unsbscribe from Level One Option service
     * @param symbols Ticker symbols to unsubscribe from
     * @returns The request objects sent to the server
     */
    unsubsLevelOneOption(symbols: string|Array<string>): Array<object>;
}
export type Config = {
    /**
     * TD Ameritrade's API URL
     */
    baseURL?: string;
    /**
     * The API key (Client ID) provided by TD Ameritrade
     */
    apiKey?: string;
    /**
     * Refresh token and retry request if a 401 response is received
     */
    refreshAndRetry?: boolean;
    /**
     * Return the full axios response instead of only the data
     */
    returnFullResponse?: boolean;
    /**
     * The OAuth2 access token
     */
    accessToken?: string;
    /**
     * The OAuth2 refresh token
     */
    refreshToken?: string;
    /**
     * The access token's date and time of expiration
     */
    accessTokenExpiresAt?: string;
    /**
     * The refresh token's date and time of expiration
     */
    refreshTokenExpiresAt?: string;
    /**
     * The local uri to receive the access code from TD Ameritrade's OAuth2
     */
    redirectUri?: string;
    /**
     * The path to your private SSL key
     */
    sslKey?: string;
    /**
     * The path to your public SSL key
     */
    sslCert?: string;
};
export type AccountFields = 'positions'|'orders'
export type Preferences = {
    /**
     * Express trading
     */
    expressTrading: boolean;
    /**
     * Default equity order leg instruction
     */
    defaultEquityOrderLegInstruction: 'BUY'|'SELL'|'BUY_TO_COVER'|'SELL_SHORT'|'NONE';
    /**
     * Default order type
     */
    defaultEquityOrderType: 'MARKET'|'LIMIT'|'STOP'|'STOP_LIMIT'|'TRAILING_STOP'|'MARKET_ON_CLOSE'|'NONE';
    /**
     * Default equity order price link type
     */
    defaultEquityOrderPriceLinkType: 'VALUE'|'PERCENT'|'NONE';
    /**
     * Default equity order duration
     */
    defaultEquityOrderDuration: 'DAY'|'GOOD_TILL_CANCEL'|'NONE';
    /**
     * Default equity order market session
     */
    defaultEquityOrderMarketSession: 'AM'|'PM'|'NORMAL'|'SEAMLESS'|'NONE';
    /**
     * Default equity quantity
     */
    defaultEquityQuantity: number;
    /**
     * Mutual fund taxlot method
     */
    mutualFundTaxLotMethod: 'FIFO'|'LIFO'|'HIGH_COST'|'LOW_COST'|'MINIMUM_TAX'|'AVERAGE_COST'|'NONE';
    /**
     * Option taxlot method
     */
    optionTaxLotMethod: 'FIFO'|'LIFO'|'HIGH_COST'|'LOW_COST'|'MINIMUM_TAX'|'AVERAGE_COST'|'NONE';
    /**
     * Equity taxlot method
     */
    equityTaxLotMethod: 'FIFO'|'LIFO'|'HIGH_COST'|'LOW_COST'|'MINIMUM_TAX'|'AVERAGE_COST'|'NONE';
    /**
     * Default advanced tool launch
     */
    defaultAdvancedToolLaunch: 'TA'|'N'|'Y'|'TOS'|'NONE'|'CC2';
    /**
     * Auth token timeout
     */
    authTokenTimeout: 'FIFTY_FIVE_MINUTES'|'TWO_HOURS'|'FOUR_HOURS'|'EIGHT_HOURS';
};
export type UserPrincipalFields = 'streamerSubscriptionKeys'|'streamerConnectionInfo'|'preferences'|'surrogateIds'
export type Market = 'EQUITY'|'OPTION'|'FUTURE'|'BOND'|'FOREX'
export type PriceHistoryQuery = {
    /**
     * The type of period to show
     */
    periodType: 'day'|'month'|'year'|'ytd';
    /**
     * The number of periods to show
     *      - `day` : 1, 2, 3, 4, 5, 10*
     *      - `month` : 1*, 2, 3, 6
     *      - `year` : 1*, 2, 3, 5, 10, 15, 20
     *      - `ytd` : 1*
     */
    period: 1|2|3|4|5|6|10|15|20;
    /**
     * The type of frequency with which a new candle is formed
     *      - `day` : minute*
     *      - `month` : daily, weekly*
     *      - `year` : daily, weekly, monthly*
     *      - `ytd` : daily, weekly*
     */
    frequencyType: 'minute'|'daily'|'weekly'|'monthly';
    /**
     * The number of the `frequencyType` to be included in each candle.
     * Valid frequencies by `frequencyType` (defaults marked with an asterisk):
     *      - minute: 1*, 5, 10, 15, 30
     *      - daily: 1*
     *      - weekly: 1*
     *      - monthly: 1*
     */
    frequency: 1|5|10|15|30;
    /**
     * Start date as milliseconds since epoch. If `startDate` and `endDate` are provided, period should not be provided
     */
    startDate?: string;
    /**
     * End date as milliseconds since epoch. If `startDate` and `endDate` are provided, period should not be provided. Default is previous trading day
     */
    endDate?: string;
    /**
     * Include extended hours data. Default is `true`
     */
    needExtendedHoursData?: boolean;
};
export type OptionStrategy = 'SINGLE'|'ANALYTICAL'|'COVERED'|'VERTICAL'|'CALENDAR'|'STRANGLE'|'STRADDLE'|'BUTTERFLY'|'CONDOR'|'DIAGONAL'|'COLLAR'|'ROLL'
export type OptionChainQuery = {
    /**
     * Type of contracts to return in the chain. Default is `ALL`
     */
    contractType?: 'CALL'|'PUT'|'ALL';
    /**
     * The number of strikes to return above and below the at-the-money price
     */
    strikeCount: number;
    /**
     * Include quotes for options in the option chain. Default is `false`
     */
    includeQuotes?: boolean;
    /**
     * Passing a value returns a Strategy Chain. Default is `SINGLE`
     */
    strategy: OptionStrategy;
    /**
     * Strike interval for spread strategy chains
     */
    interval: OptionStrategy;
    /**
     * Provide a strike price to return options only at that strike price
     */
    strike: number;
    /**
     * Returns options for the given range. Default is `ALL`
     *     - `ITM` : In-the-money
     *     - `NTM` : Near-the-money
     *     - `OTM` : Out-of-the-money
     *     - `SAK` : Strikes Above Market
     *     - `SBK` : Strikes Below Market
     *     - `SNK` : Strikes Near Market
     *     - `ALL` : All Strikes
     */
    range: 'ITM'|'NTM'|'OTM'|'SAK'|'SBK'|'SNK'|'ALL';
    /**
     * Only return expirations after this date. For strategies, expiration refers
     * to the nearest term expiration in the strategy. Valid ISO-8601 formats are: `yyyy-MM-dd` and `yyyy-MM-dd'T'HH:mm:ssz`
     */
    fromDate: string;
    /**
     * Only return expirations before this date. For strategies, expiration refers
     * to the nearest term expiration in the strategy. Valid ISO-8601 formats are: `yyyy-MM-dd` and `yyyy-MM-dd'T'HH:mm:ssz`
     */
    toDate: string;
    /**
     * Volatility to use in calculations.Applies only to `ANALYTICAL` strategy chains
     */
    volatility: OptionStrategy;
    /**
     * Underlying price to use in calculations.Applies only to ANALYTICAL strategy chains
     */
    underlyingPrice: OptionStrategy;
    /**
     * Interest rate to use in calculations.Applies only to ANALYTICAL strategy chains
     */
    interestRate: OptionStrategy;
    /**
     * Days to expiration to use in calculations.Applies only to ANALYTICAL strategy chains
     */
    daysToExpiration: OptionStrategy;
    /**
     * Return only options expiring in the specified month. Month is given in the three
     * character format (eg. `JAN`). Default is ALL
     */
    expMonth: string;
    /**
     * Type of contracts to return. Default is `ALL`
     */
    optionType: 'S'|'NS'|'ALL';
};
export type OrderStatus = 'AWAITING_PARENT_ORDER'|'AWAITING_CONDITION'|'AWAITING_MANUAL_REVIEW'|'ACCEPTED'|'AWAITING_UR_OUT'|'PENDING_ACTIVATION'|'QUEUED'|'WORKING'|'REJECTED'|'PENDING_CANCEL'|'CANCELED'|'PENDING_REPLACE'|'REPLACED'|'FILLED'|'EXPIRED'
export type OrdersQuery = {
    /**
     * The max number of orders to retrieve.
     */
    maxResults?: number;
    /**
     * Specifies that no orders entered before this time should be returned. Valid
     * ISO-8601 formats are: `yyyy-MM-dd`. Date must be within 60 days from today's date. `toEnteredTime` must also be set.
     */
    fromEnteredTime?: string;
    /**
     * Specifies that no orders entered after this time should be returned. Valid
     * ISO-8601 formats are: `yyyy-MM-dd`. `fromEnteredTime` must also be set.
     */
    toEnteredTime?: string;
    /**
     * Specifies that only orders of this status should be returned.
     */
    status?: OrderStatus;
};
export type TransactionQuery = {
    /**
     * Only transactions with the specified type will be returned.
     */
    type: 'ALL'|'TRADE'|'BUY_ONLY'|'SELL_ONLY'|'CASH_IN_OR_CASH_OUT'|'CHECKING'|'DIVIDEND'|'INTEREST'|'OTHER'|'ADVISOR_FEES';
    /**
     * Only transactions with the specified symbol will be returned.
     */
    symbol: string;
    /**
     * Only transactions after the Start Date will be returned.
     * Note: The maximum date range is one year. Valid ISO-8601 formats are: `yyyy-MM-dd`.
     */
    startDate: string;
    /**
     * Only transactions before the End Date will be returned.
     * Note: The maximum date range is one year. Valid ISO-8601 formats are: `yyyy-MM-dd`.
     */
    endDate: string;
};
export type WatchlistInstrument = {
    /**
     * Symbol
     */
    symbol: string;
    /**
     * Description
     */
    description: string;
    /**
     * Asset type
     */
    assetType: 'EQUITY'|'OPTION'|'MUTUAL_FUND'|'FIXED_INCOME'|'INDEX';
};
export type WatchlistItem = {
    /**
     * Instrument
     */
    instrument: WatchlistInstrument;
};
export type Watchlist = {
    /**
     * Name
     */
    name: string;
    /**
     * Items
     */
    watchlistItems: Array<WatchlistItem>;
};
export type State = 'connecting'|'connected'|'authenticated'|'disconnecting'|'disconnected'
export type Event = 'state_change'|'message'|'account_activity'|'chart'|'news_headline'|'timesale'|'level_one_equity'|'level_one_futures'|'level_one_option'|'chart_history_futures'|'error'
export type Error = 'unknown_error'|'unknown_message'|'unknown_response'|'unknown_notification'|'unknown_data'|'invalid_message'|'connection_refused'|'authentication_failed'
export type DisconnectOptions = {
    /**
     * Disconnect immediately
     */
    force: boolean;
};
export type Request = {
    /**
     * A unique request identifier
     */
    requestid?: string;
    /**
     * The service name
     */
    service: string;
    /**
     * The service parameters
     */
    parameters: object;
    /**
     * The command
     */
    command: string;
};
export type Service = {
    /**
     * A unique request identifier
     */
    requestid?: string;
    /**
     * The service name
     */
    service: string;
    /**
     * The service parameters
     */
    parameters?: object;
};
export type ChartHistoryFuturesOptions = {
    /**
     * Frequency
     */
    frequency: 'm1'|'m5'|'m10'|'m30'|'h1'|'d1'|'w1'|'n1';
    /**
     * Time period. eg. d5, w4, n10, y1, y10 (d=day, w=week, n=month, y=year)
     */
    period: string;
    /**
     * Start time of chart in milliseconds since Epoch
     */
    START_TIME: string;
    /**
     * End time of chart in milliseconds since Epoch
     */
    END_TIME: string;
};
