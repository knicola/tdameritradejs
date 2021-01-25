'use strict'

const debug = require('debug')('ameritrade:client') // eslint-disable-line no-unused-vars

const axios = require('axios').default
const defaults = require('./config')
const EventEmitter = require('eventemitter3')
const interceptors = require('./interceptors')
const apiKeySuffix = '@AMER.OAUTHAP'

const TDStreamer = require('./tdStreamer')
const get = require('lodash/get')
const partial = require('lodash/partial')

/**
 * @private
 */
class TDAmeritrade extends EventEmitter {
    /**
     * @typedef {Settings|Tokens} Config
     *
     * @typedef {object} Settings
     * @property {string} apiKey Api key / Client id
     * @property {string} redirectUri OAuth2 redirect uri
     * @property {string} sslKey Path to SSL key
     * @property {string} sslCert Path to SSL cert
     * @property {boolean} refreshAndRetry Refresh and retry on a 401 response
     * @property {boolean} returnFullResponse Return the axios response instead of just the data
     *
     * @typedef {object} Tokens
     * @property {string} accessToken Access token
     * @property {string} refreshToken Refresh token
     * @property {string} accessTokenExpiresAt Access token date and time of expiration
     * @property {string} refreshTokenExpiresAt Refresh token date and time of expiration
     */
    /**
     * @param {Config} config Config
     */
    constructor(config = {}) {
        super()

        this.config = Object.assign({}, defaults, config, {
            apiKey: (config.apiKey + '').endsWith(apiKeySuffix)
                ? config.apiKey
                : config.apiKey + apiKeySuffix
        }) // config
        this.axios = axios.create({ baseURL: this.config.baseURL })
        interceptors.setup(this)
    }

    /**
     * Create a new instance of TDAccount.
     *
     * @param {string} accountId The account id
     * @returns {TDAccount} A new TDAccount instance
     */
    account(accountId) {
        const instance = new TDAccount(accountId)
        instance.config = this.config
        return instance
    } // account()

    /**
     * @returns {TDStreamer} TDStreamer interface
     */
    get TDStreamer() {
        return TDStreamer
    }

    /**
     * Create a new instance of TDStreamer.
     * For the time being, this will select the first available account.
     *
     * @returns {Promise<TDStreamer>} A new TDStreamer instance
     */
    streamer() {
        return this.getUserPrincipals([
            'streamerSubscriptionKeys',
            'streamerConnectionInfo',
        ]).then(res => {
            const userPrincipals = this.config.fullResponse ? get(res, 'data') : res
            const instance = new TDStreamer(userPrincipals)
            instance.config = this.config
            return instance
        })
    } // streamer()

    /**
     * Get the access token along with an optional refresh token.
     *
     * @param {string} authCode The authorization code
     * @returns {Promise<any>} The token details
     */
    getAccessToken(authCode) {
        const params = new URLSearchParams()
        params.append('grant_type', 'authorization_code')
        params.append('access_type', this.config.accessType || 'offline')
        params.append('client_id', this.config.apiKey)
        params.append('redirect_uri', this.config.redirectUri)
        params.append('code', authCode || this.config.authCode)

        delete this.config.accessToken

        return this.axios.post('/oauth2/token', params)
    } // getAccessToken()

    /**
     * Refresh the access token.
     *
     * @param {string} refreshToken The refresh token
     * @returns {Promise<any>} The token details
     */
    refreshAccessToken(refreshToken) {
        const params = new URLSearchParams()
        params.append('grant_type', 'refresh_token')
        params.append('access_type', this.config.accessType || 'offline')
        params.append('client_id', this.config.apiKey)
        params.append('refresh_token', refreshToken || this.config.refreshToken)

        delete this.config.accessToken

        return this.axios.post('/oauth2/token', params)
    } // refreshAccessToken()

    /**
     * Determine if access token is expired.
     *
     * @returns {boolean} True if expired, otherwise false
     */
    isAccessTokenExpired() {
        return this.config.accessTokenExpiresAt
            ? new Date(this.config.accessTokenExpiresAt).getTime() <= Date.now()
            : true
    } // isAccessTokenExpired()

    /**
     * Determine if refresh token is expired.
     *
     * @returns {boolean} True if expired, otherwise false
     */
    isRefreshTokenExpired() {
        return this.config.refreshTokenExpiresAt
            ? new Date(this.config.refreshTokenExpiresAt).getTime() <= Date.now()
            : true
    } // isRefreshTokenExpired()

    /**
     * @typedef {'EQUITY'|'OPTION'|'FUTURE'|'BOND'|'FOREX'} Market
     */
    /**
     * Get the market hours for the specified market(s).
     *
     * @param {Market|Market[]} markets The market(s) for which you're requesting market hours
     * @param {string} date The date for which market hours information is requested. Valid ISO-8601 formats are `yyyy-MM-dd` and `yyyy-MM-dd'T'HH:mm:ssz`
     * @returns {Promise<any>} The market hours
     */
    getMarketHours(markets, date) {
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
     *
     * @param {'$COMPX'|'$DJI'|'$SPX.X'} index The index symbol
     * @param {'up'|'down'} direction The direction
     * @param {'value'|'percent'} change The change type
     * @returns {Promise<any>} The mover information
     */
    getMovers(index, direction, change) {
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
     *
     * @param {string|string[]} symbols The ticker symbol(s)
     * @returns {Promise<any>} The quote data
     */
    getQuotes(symbols) {
        return this.axios.get('/marketdata/quotes', {
            params: {
                symbol: [].concat(symbols).join(','),
                apikey: this.config.apiKey,
            },
        })
    } // getQuotes()

    /**
     * Get quote data for a specified symbol.
     *
     * @param {string} symbol The ticker symbol
     * @returns {Promise<any>} The quote data
     */
    getQuote(symbol) {
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
     *
     * @param {string} symbol The ticker symbol
     * @param {PriceHistoryParams} params The query parameters
     * @returns {Promise<any>} The price history
     */
    getPriceHistory(symbol, params) {
        return this.axios.get(`/marketdata/${symbol}/pricehistory`, {
            params: Object.assign({}, params, { apikey: this.config.apiKey }),
        })
    } // getPriceHistory()

    /**
     * @typedef {'SINGLE'|'ANALYTICAL'|'COVERED'|'VERTICAL'
     *  |'CALENDAR'|'STRANGLE'|'STRADDLE'|'BUTTERFLY'
     *  |'CONDOR'|'DIAGONAL'|'COLLAR'|'ROLL'
     * } OptionStrategy
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
     *
     * @param {string} symbol The ticker symbol
     * @param {OptionChainParams} params The query parameters
     * @returns {Promise<any>} The option chain
     */
    getOptionChain(symbol, params) {
        return this.axios.get('/marketdata/chains', {
            params: Object.assign({}, params, { symbol, apikey: this.config.apiKey }),
        })
    } // getOptionChain()

    /**
     * @typedef {'symbol-search'|'symbol-regex'|'desc-search'|'desc-regex'|'fundamental'} Projection
     */
    /**
     * Search or retrieve instrument data, including fundamental data.
     *
     * @param {string} symbol The ticker symbol
     * @param {Projection} projection The type of request
     * - `symbol-search`: Retrieve instrument data of a specific symbol or cusip
     * - `symbol-regex`: Retrieve instrument data for all symbols matching regex. Example: `symbol=XYZ.*` will return all symbols beginning with XYZ
     * - `desc-search`: Retrieve instrument data for instruments whose description contains the word supplied. Example: `symbol=FakeCompany` will return all instruments with FakeCompany in the description.
     * - `desc-regex`: Search description with full regex support. Example: `symbol=XYZ.[A-C]` returns all instruments whose descriptions contain a word beginning with XYZ followed by a character A through C.
     * - `fundamental`: Returns fundamental data for a single instrument specified by exact symbol.
     * @returns {Promise<any>} The instrument data
     */
    searchInstruments(symbol, projection) {
        return this.axios.get('/instruments', {
            params: {
                symbol,
                projection,
                apikey: this.config.apiKey,
            }
        })
    } // searchInstruments()

    /**
     * Get an instrument by its CUSIP.
     *
     * @param {string} cusip The CUSIP identifier
     * @returns {Promise<any>} The instrument details
     */
    getInstrument(cusip) {
        return this.axios.get(`/instruments/${cusip}`, {
            params: {
                apikey: this.config.apiKey,
            }
        })
    } // getInstrument()

    /**
     * Get account balances, positions, and orders for all linked accounts.
     *
     * @returns {Promise<any>} List of all accounts
     */
    getAccounts() {
        return this.axios.get('/accounts')
    } // getAccounts()
    /**
     * Get account balances, positions, and orders for a specific account.
     *
     * @param {string} accountId The account id
     * @returns {Promise<any>} The requested account
     */
    getAccount(accountId) {
        return this.axios.get(`/accounts/${accountId}`)
    } // getAccount()

    /**
     * Get preferences for a specific account.
     *
     * @param {string} accountId The account id
     * @returns {Promise<any>} The account preferences
     */
    getPreferences(accountId) {
        return this.axios.get(`/accounts/${accountId}/preferences`)
    } // getPreferences()

    /**
     * @typedef {object} Preferences
     * @property {boolean} expressTrading Express trading
     * @property {'BUY'|'SELL'|'BUY_TO_COVER'|'SELL_SHORT'|'NONE'} defaultEquityOrderLegInstruction Default equity order leg instruction
     * @property {'MARKET'|'LIMIT'|'STOP'|'STOP_LIMIT'|'TRAILING_STOP'|'MARKET_ON_CLOSE'|'NONE'} defaultEquityOrderType Default order type
     * @property {'VALUE'|'PERCENT'|'NONE'} defaultEquityOrderPriceLinkType Default equity order price link type
     * @property {'DAY'|'GOOD_TILL_CANCEL'|'NONE'} defaultEquityOrderDuration Default equity order duration
     * @property {'AM'|'PM'|'NORMAL'|'SEAMLESS'|'NONE'} defaultEquityOrderMarketSession Default equity order market session
     * @property {number} defaultEquityQuantity Default equity quantity
     * @property {'FIFO'|'LIFO'|'HIGH_COST'|'LOW_COST'|'MINIMUM_TAX'|'AVERAGE_COST'|'NONE'} mutualFundTaxLotMethod Mutual fund taxlot method
     * @property {'FIFO'|'LIFO'|'HIGH_COST'|'LOW_COST'|'MINIMUM_TAX'|'AVERAGE_COST'|'NONE'} optionTaxLotMethod Option taxlot method
     * @property {'FIFO'|'LIFO'|'HIGH_COST'|'LOW_COST'|'MINIMUM_TAX'|'AVERAGE_COST'|'NONE'} equityTaxLotMethod Equity taxlot method
     * @property {'TA'|'N'|'Y'|'TOS'|'NONE'|'CC2'} defaultAdvancedToolLaunch Default advanced tool launch
     * @property {'FIFTY_FIVE_MINUTES'|'TWO_HOURS'|'FOUR_HOURS'|'EIGHT_HOURS'} authTokenTimeout Auth token timeout
     */
    /**
     * Update preferences for a specific account. The directOptionsRouting and
     * directEquityRouting values cannot be modified via this operation.
     *
     * @param {string} accountId The account id
     * @param {Preferences} preferences The updated preferences
     * @returns {Promise<any>} Success
     */
    updatePreferences(accountId, preferences) {
        return this.axios.put(`/accounts/${accountId}/preferences`, preferences)
    } // updatePreferences()

    /**
     * Get the SubscriptionKey for provided accounts or default accounts.
     *
     * @param {string|string[]} [accountIds] The account id(s)
     * @returns {Promise<any>} The susbscription keys
     */
    getStreamerSubscriptionKeys(accountIds) {
        return this.axios.get('/userprincipals/streamersubscriptionkeys', {
            params: {
                accountIds: [].concat(accountIds).join(',')
            }
        })
    } // getStreamerSubscriptionKeys()

    /**
     * @typedef {'streamerSubscriptionKeys'|'streamerConnectionInfo'|'preferences'|'surrogateIds'} UserPrincipalFields
     */
    /**
     * Get user principal details.
     *
     * @param {UserPrincipalFields|UserPrincipalFields[]} [fields] Fields to include
     * @returns {Promise<any>} User principal details
     */
    getUserPrincipals(fields) {
        return this.axios.get('/userprincipals', {
            params: {
                fields: [].concat(fields).join(',')
            }
        })
    } // getUserPrincipals()

    /**
     * Get a specific order for a specific account.
     *
     * @param {string} accountId The account id
     * @param {string} orderId The order id
     * @returns {Promise<any>} The order details
     */
    getOrder(accountId, orderId) {
        return this.axios.get(`/accounts/${accountId}/orders/${orderId}`)
    } // getOrder()

    /**
     * @typedef {'AWAITING_PARENT_ORDER'|'AWAITING_CONDITION'|'AWAITING_MANUAL_REVIEW'
     *   |'ACCEPTED'|'AWAITING_UR_OUT'|'PENDING_ACTIVATION'|'QUEUED'|'WORKING'
     *   |'REJECTED'|'PENDING_CANCEL'|'CANCELED'|'PENDING_REPLACE'|'REPLACED'
     *   |'FILLED'|'EXPIRED'
     * } OrderStatus
     */
    /**
     * @typedef OrderQuery
     * @property {number} [maxResults] The max number of orders to retrieve.
     * @property {string} [fromEnteredTime] Specifies that no orders entered before this time should be returned. Valid
     * ISO-8601 formats are: `yyyy-MM-dd`. Date must be within 60 days from today's date. `toEnteredTime` must also be set.
     * @property {string} [toEnteredTime] Specifies that no orders entered after this time should be returned. Valid
     * ISO-8601 formats are: `yyyy-MM-dd`. `fromEnteredTime` must also be set.
     * @property {OrderStatus} [status] Specifies that only orders of this status should be returned.
     */
    /**
     * Get a list of orders for a specific account.
     *
     * @param {string} accountId The account id
     * @param {OrderQuery} params The query parameters
     * @returns {Promise<any>} List of orders
     */
    getOrders(accountId, params) {
        return this.axios.get(`/accounts/${accountId}/orders`, { params })
    } // getOrders()

    /**
     * Get a list of orders from all accounts.
     *
     * @param {OrderQuery} params The query parameters
     * @returns {Promise<any>} List of orders
     */
    getAllOrders(params) {
        return this.axios.get('/orders', { params })
    } // getAllOrders()

    /**
     * Place an order for a specific account.
     *
     * @param {string} accountId The account id
     * @param {object} order The order
     * @returns {Promise<any>} Success
     */
    placeOrder(accountId, order) {
        return this.axios.post(`/accounts/${accountId}/orders`, order)
    } // placeOrder()

    /**
     * Replace an existing order for an account. The existing order will be replaced by the new order.
     * Once replaced, the old order will be canceled and a new order will be created.
     *
     * @param {string} accountId The account id
     * @param {string} orderId The order id
     * @param {object} order The new order
     * @returns {Promise<any>} Success
     */
    replaceOrder(accountId, orderId, order) {
        return this.axios.put(`/accounts/${accountId}/orders/${orderId}`, order)
    } // replaceOrder()

    /**
     * Cancel a specific order for a specific account.
     *
     * @param {string} accountId The account id
     * @param {string} orderId The order id
     * @returns {Promise<any>} Success
     */
    cancelOrder(accountId, orderId) {
        return this.axios.delete(`/accounts/${accountId}/orders/${orderId}`)
    } // cancelOrder()

    /**
     * Get saved order by its ID, for a specific account.
     *
     * @param {string} accountId The account id
     * @param {string} savedOrderId The saved order id
     * @returns {Promise<any>} The saved order details
     */
    getSavedOrder(accountId, savedOrderId) {
        return this.axios.get(`/accounts/${accountId}/savedorders/${savedOrderId}`)
    } // getSavedOrder()

    /**
     * Get saved orders for a specific account.
     *
     * @param {string} accountId The account id
     * @returns {Promise<any>} List of saved orders
     */
    getSavedOrders(accountId) {
        return this.axios.get(`/accounts/${accountId}/savedorders`)
    } // getSavedOrdersByPath()

    /**
     * Save an order for a specific account.
     *
     * @param {string} accountId The account id
     * @param {object} savedOrder The saved order
     * @returns {Promise<any>} Success
     */
    createSavedOrder(accountId, savedOrder) {
        return this.axios.post(`/accounts/${accountId}/savedorders`, savedOrder)
    } // createSavedOrder()

    /**
     * Replace an existing saved order for an account. The existing saved order will be replaced by the new order.
     *
     * @param {string} accountId The account id
     * @param {string} savedOrderId The saved order id
     * @param {object} savedOrder The new saved order
     * @returns {Promise<any>} Success
     */
    replaceSavedOrder(accountId, savedOrderId, savedOrder) {
        return this.axios.put(`/accounts/${accountId}/savedorders/${savedOrderId}`, savedOrder)
    } // replaceSavedOrder()

    /**
     * Delete a specific saved order for a specific account.
     *
     * @param {string} accountId The account id
     * @param {string} savedOrderId The saved order id
     * @returns {Promise<any>} Success
     */
    deleteSavedOrder(accountId, savedOrderId) {
        return this.axios.delete(`/accounts/${accountId}/savedorders/${savedOrderId}`)
    } // deleteSavedOrder()

    /**
     * @typedef {object} Watchlist
     * @property {string} name Name
     * @property {WatchlistItem[]} watchlistItems Items
     *
     * @typedef {object} WatchlistItem
     * @property {WatchlistInstrument} instrument Instrument
     *
     * @typedef {object} WatchlistInstrument
     * @property {string} symbol Symbol
     * @property {'EQUITY'|'OPTION'|'MUTUAL_FUND'|'FIXED_INCOME'|'INDEX'} assetType Asset type
     */
    /**
     * Create watchlist for specific account.
     *
     * @param {string} accountId The account id
     * @param {Watchlist} watchlist The watchlist
     * @returns {Promise<any>} Success
     */
    createWatchlist(accountId, watchlist) {
        return this.axios.post(`/accounts/${accountId}/watchlists`, watchlist)
    } // createWatchlist()

    /**
     * Delete watchlist for a specific account.
     *
     * @param {string} accountId The account id
     * @param {string} watchlistId The watchlist id
     * @returns {Promise<any>} Success
     */
    deleteWatchlist(accountId, watchlistId) {
        return this.axios.delete(`/accounts/${accountId}/watchlists/${watchlistId}`)
    } // deleteWatchlist()

    /**
     * Get watchlist for a specific account.
     *
     * @param {string} accountId The account id
     * @param {string} watchlistId The watchlist id
     * @returns {Promise<any>} Success
     */
    getWatchlist(accountId, watchlistId) {
        return this.axios.get(`/accounts/${accountId}/watchlists/${watchlistId}`)
    } // getWatchlist()

    /**
     * Get all watchlists of an account.
     *
     * @param {string} accountId The account id
     * @returns {Promise<any>} List of watchlists
     */
    getWatchlists(accountId) {
        return this.axios.get(`/accounts/${accountId}/watchlists`)
    } // getWatchlists()

    /**
     * All watchlists for all of the user's linked accounts.
     *
     * @returns {Promise<any>} List of watchlists
     */
    getAllWatchlists() {
        return this.axios.get('/accounts/watchlists')
    } // getAllWatchlists()

    /**
     * Replace watchlist for a specific account. This method does not verify that the symbol or asset type are valid.
     *
     * @param {string} accountId The account id
     * @param {string} watchlistId The watchlist id
     * @param {Watchlist} watchlist The watchlist
     * @returns {Promise<any>} Success
     */
    replaceWatchlist(accountId, watchlistId, watchlist) {
        return this.axios.put(`/accounts/${accountId}/watchlists/${watchlistId}`, watchlist)
    } // replaceWatchlist()

    /**
     * Partially update watchlist for a specific account: change watchlist name, add
     * to the beginning/end of a watchlist, update or delete items in a watchlist.
     * This method does not verify that the symbol or asset type are valid.
     *
     * @param {string} accountId The account id
     * @param {string} watchlistId The watchlist id
     * @param {Watchlist} watchlist The new watchlist
     * @returns {Promise<any>} Success
     */
    updateWatchlist(accountId, watchlistId, watchlist) {
        return this.axios.patch(`/accounts/${accountId}/watchlists/${watchlistId}`, watchlist)
    } // updateWatchlist()

    /**
     * Get a transaction for a specific account.
     *
     * @param {string} accountId The account id
     * @param {string} transactionId The transaction id
     * @returns {Promise} The transaction details
     */
    getTransaction(accountId, transactionId) {
        return this.axios.get(`/accounts/${accountId}/transactions/${transactionId}`)
    } // getTransaction()

    /**
     * @typedef {'ALL'|'TRADE'|'BUY_ONLY'|'SELL_ONLY'|'CASH_IN_OR_CASH_OUT'
     *   |'CHECKING'|'DIVIDEND'|'INTEREST'|'OTHER'|'ADVISOR_FEES'
     * } TransactionType
     */
    /**
     * @typedef TransactionQuery
     * @property {TransactionType} type Only transactions with the specified type will be returned.
     * @property {string} symbol Only transactions with the specified symbol will be returned.
     * @property {string} startDate Only transactions after the Start Date will be returned.
     * Note: The maximum date range is one year. Valid ISO-8601 formats are: `yyyy-MM-dd`.
     * @property {string} endDate Only transactions before the End Date will be returned.
     * Note: The maximum date range is one year. Valid ISO-8601 formats are: `yyyy-MM-dd`.
     */
    /**
     * Get all transactions for a specific account.
     *
     * @param {string} accountId The account id
     * @param {TransactionQuery} params The query parameters
     * @returns {Promise} The transaction history
     */
    getTransactions(accountId, params) {
        return this.axios.get(`/accounts/${accountId}/transactions`, { params })
    } // getTransactions()
} // TDAmeritrade

/**
 * @class
 * @augments TDAmeritrade
 */
class TDAccount extends TDAmeritrade {
    constructor(accountId) {
        super()

        /** @ignore */ this.authorize = undefined
        /** @ignore */ this.login = undefined
        /** @ignore */ this.account = undefined
        /** @ignore */ this.streamer = undefined

        // ACCOUNT INFO
        this.getAccount = partial(super.getAccount, accountId)

        // PREFERENCES
        this.getPreferences = partial(super.getPreferences, accountId)
        this.updatePreferences = partial(super.updatePreferences, accountId)

        // USER PRINCIPAL
        this.getStreamerSubscriptionKeys = partial(super.getStreamerSubscriptionKeys, accountId)
        this.getUserPrincipals = super.getUserPrincipals

        // ORDERS
        this.getOrders = partial(super.getOrders, accountId)
        this.getOrder = partial(super.getOrder, accountId)
        this.placeOrder = partial(super.placeOrder, accountId)
        this.replaceOrder = partial(super.replaceOrder, accountId)
        this.cancelOrder = partial(super.cancelOrder, accountId)

        // SAVED ORDERS
        this.createSavedOrder = partial(super.createSavedOrder, accountId)
        this.deleteSavedOrder = partial(super.deleteSavedOrder, accountId)
        this.getSavedOrder = partial(super.getSavedOrder, accountId)
        this.getSavedOrders = partial(super.getSavedOrders, accountId)
        this.replaceSavedOrder = partial(super.replaceSavedOrder, accountId)

        // WATCHLISTS
        this.createWatchlist = partial(super.createWatchlist, accountId)
        this.deleteWatchlist = partial(super.deleteWatchlist, accountId)
        this.getWatchlist = partial(super.getWatchlist, accountId)
        this.getWatchlists = partial(super.getWatchlists, accountId)
        this.replaceWatchlist = partial(super.replaceWatchlist, accountId)
        this.updateWatchlist = partial(super.updateWatchlist, accountId)

        // TRANSACTIONS
        this.getTransaction = partial(super.getTransaction, accountId)
        this.getTransactions = partial(super.getTransactions, accountId)
    }
}

module.exports = TDAmeritrade

module.exports.default = TDAmeritrade
