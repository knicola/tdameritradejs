import { Promise, AxiosInstance } from "axios"
import { OrdersQuery, Order } from "./resources/order"
import { SecuritiesAccount, Preferences } from "./resources/account"
import { UserPrincipal, SubscriptionKeys } from "./resources/userPrincipals"
import { Watchlist, WatchlistResult } from "./resources/watchlist"
import { Transaction } from "./resources/transaction"
import { MarketHours, Mover, CandleList, PriceHistoryQuery, OptionChainQuery } from "./resources/market"
import { TDAccount } from "./tdAccount"
import TDStreamer from "../src/tdStreamer"

export interface Config extends Auth {
    baseUrl?: string,
    apiKey: string,
    redirectUri?: string,
    sslKey?: string,
    sslCert?: string,
    refreshAndRetry?: boolean = true,
    returnFullResponse?: boolean = false,
}

export interface Auth {
    accessToken?: string,
    refreshToken?: string,
    accessTokenExpiresAt?: string,
    refreshTokenExpiresAt?: string,
}

export type UserPrincipalFields =
    | 'streamerSubscriptionKeys'
    | 'streamerConnectionInfo'
    | 'preferences'
    | 'surrogateIds'

export type Market =
    |'EQUITY'
    |'OPTION'
    |'FUTURE'
    |'BOND'
    |'FOREX'

export class TDAmeritrade {
    constructor(config: Config)

    axios: AxiosInstance

    on(eventName:'login'|'token', fn): void
    authorize(): Promise<any>
    login(): Promise<any>

    isAccessTokenExpired(): boolean
    isRefreshTokenExpired(): boolean

    TDAccount: TDAccount
    account(accountId: string): TDAccount

    TDStreamer: TDStreamer
    streamer(): Promise<TDStreamer>

    getAccessToken(authCode?): Promise
    refreshAccessToken(refreshToken?): Promise

    /**
     * Search or retrieve instrument data, including fundamental data.
     * @param symbol The ticker symbol
     * @param projection The type of request
     * - `symbol-search`: Retrieve instrument data of a specific symbol or cusip
     * - `symbol-regex`: Retrieve instrument data for all symbols matching regex. Example: `symbol=XYZ.*` will return all symbols beginning with XYZ
     * - `desc-search`: Retrieve instrument data for instruments whose description contains the word supplied. Example: `symbol=FakeCompany` will return all instruments with FakeCompany in the description.
     * - `desc-regex`: Search description with full regex support. Example: `symbol=XYZ.[A-C]` returns all instruments whose descriptions contain a word beginning with XYZ followed by a character A through C.
     * - `fundamental`: Returns fundamental data for a single instrument specified by exact symbol.
     * @returns The instrument data
     */
    searchInstruments(symbol: string, projection: 'symbol-search'|'symbol-regex'|'desc-search'|'desc-regex'|'fundamental'): Promise
    /**
     * Get an instrument by its CUSIP.
     * @param cusip The CUSIP identifier
     * @returns The instrument details
     */
    getInstrument(cusip: string): Promise

    /**
     * Get the market hours for the specified market(s).
     * @param markets The market(s) for which you're requesting market hours
     * @param date The date for which market hours information is requested. Valid ISO-8601 formats are `yyyy-MM-dd` and `yyyy-MM-dd'T'HH:mm:ssz`
     * @returns The market hours
     */
    getMarketHours(markets: Market|Market[], date: string): Promise
    /**
     * Get mover information by index symbol, direction type and change.
     * @param index The index symbol
     * @param direction The direction
     * @param change The change type
     * @returns The mover information
     */
    getMovers(index: '$COMPX'|'$DJI'|'$SPX.X', direction?: 'up'|'down', change?: 'value'|'percent'): Promise<Mover[]>
    /**
     * Get quote data for one or more symbols.
     * @param symbols The ticker symbol(s)
     * @returns The quote data
     */
    getQuotes(symbols: string|string[]): Promise
    /**
     * Get quote data for a specified symbol.
     * @param symbol The ticker symbol
     * @returns The quote data
     */
    getQuote(symbol: string): Promise
    /**
     * Get price history for a specified symbol.
     * @param symbol The ticker symbol
     * @param params The query parameters
     * @returns The price history
     */
    getPriceHistory(symbol: string, params?: PriceHistoryQuery): Promise<CandleList>
    /**
     * Get Option Chains for optionable symbols.
     * @param symbol The ticker symbol
     * @param params The query parameters
     * @returns The option chain
     */
    getOptionChain(symbol: string, params?: OptionChainQuery): Promise

    /**
     * Get account balances, positions, and orders for all linked accounts.
     * @returns List of all accounts
     */
    getAccounts(): Promise<SecuritiesAccount[]>
    /**
     * Get account balances, positions, and orders for a specific account.
     * @param accountId The account id
     * @returns The requested account
     */
    getAccount(accountId: string): Promise<SecuritiesAccount>
    /**
     * Get preferences for a specific account.
     * @param accountId The account id
     * @returns The account preferences
     */
    getPreferences(accountId: string): Promise<Preferences>
    /**
     * Update preferences for a specific account.
     * @note The directOptionsRouting and directEquityRouting values cannot be modified via this operation.
     * @param accountId The account id
     * @param preferences The updated preferences
     * @returns Success
     */
    updatePreferences(accountId: string, preferences: Preferences): Promise

    getStreamerSubscriptionKeys(accountIds: string|string[]): Promise<SubscriptionKeys>
    getUserPrincipals(fields: UserPrincipalFields|Array<UserPrincipalFields>): Promise<UserPrincipal>

    getOrder(accountId: string, orderId: string): Promise<Order>
    getOrders(accountId: string, params?: OrdersQuery): Promise<Order[]>
    getAllOrders(params: OrdersQuery): Promise<Order[]>
    placeOrder(accountId: string, order: Order): Promise
    replaceOrder(accountId: string, orderId: string, order: Order): Promise
    cancelOrder(accountId: string, orderId: string): Promise

    createSavedOrder(accountId: string, savedOrder): Promise
    deleteSavedOrder(accountId: string, savedOrderId: string): Promise
    getSavedOrder(accountId: string, savedOrderId: string): Promise
    getSavedOrders(accountId: string): Promise
    replaceSavedOrder(accountId: string, savedOrderId: string, savedOrder): Promise

    createWatchlist(accountId: string, watchlist: Watchlist): Promise
    deleteWatchlist(accountId: string, watchlistId: string): Promise
    getWatchlist(accountId: string, watchlistId: string): Promise<WatchlistResult>
    getWatchlists(accountId: string): Promise<WatchlistResult[]>
    getAllWatchlists(): Promise<WatchlistResult[]>
    replaceWatchlist(accountId: string, watchlistId: string, watchlist: Watchlist): Promise
    updateWatchlist(accountId: string, watchlistId: string, watchlist: Watchlist): Promise

    getTransaction(accountId: string, transactionId: string): Promise<Transaction>
    getTransactions(accountId: string, params): Promise<Transaction[]>
} // TDAmeritrade()
