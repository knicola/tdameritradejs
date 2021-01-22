import { AxiosInstance } from "axios"
import { OrdersQuery, Order } from "./resources/order"
import { SecuritiesAccount, Preferences } from "./resources/account"
import { UserPrincipal, SubscriptionKeys, UserPrincipalFields } from "./resources/userPrincipals"
import { Watchlist, WatchlistResult } from "./resources/watchlist"
import { Transaction, TransactionQuery } from "./resources/transaction"
import { MarketHours, Market, Mover, CandleList, PriceHistoryQuery, OptionChainQuery } from "./resources/market"
import { TDAccount } from "./tdAccount"
import TDStreamer from "../src/tdStreamer"
import { SavedOrder } from "./resources/savedOrder"

export interface Config extends Auth {
    baseUrl?: string,
    apiKey: string,
    redirectUri?: string,
    sslKey?: string,
    sslCert?: string,
    refreshAndRetry?: boolean,
    returnFullResponse?: boolean,
}

export interface Auth {
    accessToken?: string,
    refreshToken?: string,
    accessTokenExpiresAt?: string,
    refreshTokenExpiresAt?: string,
}

export type Projection =
    |'symbol-search'
    |'symbol-regex'
    |'desc-search'
    |'desc-regex'
    |'fundamental'

export class TDAmeritrade {
    constructor(config: Config)

    axios: AxiosInstance

    /**
     * TDAccount interface
     */
    TDAccount: TDAccount
    /**
     * Create a new instance of TDAccount.
     * @param accountId The account id
     */
    account(accountId: string): TDAccount
    /**
     * TDStreamer interface
     */
    TDStreamer: TDStreamer
    /**
     * Create a new instance of TDStreamer.
     */
    streamer(): Promise<TDStreamer>
    /**
     * Get the access token along with an optional refresh token.
     * @param authCode The authorization code
     * @returns The token details
     */
    getAccessToken(authCode?: string): Promise<any>
    /**
     * Refresh the access token.
     * @param refreshToken The refresh token
     * @returns The token details
     */
    refreshAccessToken(refreshToken?: string): Promise<any>
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
    searchInstruments(symbol: string, projection: Projection): Promise<any>
    /**
     * Get an instrument by its CUSIP.
     * @param cusip The CUSIP identifier
     * @returns The instrument details
     */
    getInstrument(cusip: string): Promise<any>
    /**
     * Get the market hours for the specified market(s).
     * @param markets The market(s) for which you're requesting market hours
     * @param date The date for which market hours information is requested. Valid ISO-8601 formats are `yyyy-MM-dd` and `yyyy-MM-dd'T'HH:mm:ssz`
     * @returns The market hours
     */
    getMarketHours(markets: Market|Market[], date: string): Promise<any>
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
    getQuotes(symbols: string|string[]): Promise<any>
    /**
     * Get quote data for a specified symbol.
     * @param symbol The ticker symbol
     * @returns The quote data
     */
    getQuote(symbol: string): Promise<any>
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
    getOptionChain(symbol: string, params?: OptionChainQuery): Promise<any>
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
    updatePreferences(accountId: string, preferences: Preferences): Promise<any>
    /**
     * Get the SubscriptionKey for provided accounts or default accounts.
     * @param accountIds The account id(s)
     * @returns The susbscription keys
    */
    getStreamerSubscriptionKeys(accountIds: string|string[]): Promise<SubscriptionKeys>
    /**
     * Get user principal details.
     * @param fields Fields to include
     * @returns User principal details
     */
    getUserPrincipals(fields?: UserPrincipalFields|UserPrincipalFields[]): Promise<UserPrincipal>
    /**
     * Get a specific order for a specific account.
     * @param accountId The account id
     * @param orderId The order id
     * @returns The order details
     */
    getOrder(accountId: string, orderId: string): Promise<Order>
    /**
     * Get a list of orders for a specific account.
     * @param accountId The account id
     * @param params The query parameters
     * @returns List of orders
     */
    getOrders(accountId: string, params?: OrdersQuery): Promise<Order[]>
    /**
     * Get a list of orders from all accounts.
     * @param params The query parameters
     * @returns List of orders
     */
    getAllOrders(params: OrdersQuery): Promise<Order[]>
    /**
     * Place an order for a specific account.
     * @param accountId The account id
     * @param order The order
     */
    placeOrder(accountId: string, order: Order): Promise<any>
    /**
     * Replace an existing order for an account. The existing order will be replaced by the new order.
     * Once replaced, the old order will be canceled and a new order will be created.
     * @param accountId The account id
     * @param orderId The order id
     * @param order The new order
     */
    replaceOrder(accountId: string, orderId: string, order: Order): Promise<any>
    /**
     * Cancel a specific order for a specific account.
     * @param accountId The account id
     * @param orderId The order id
     */
    cancelOrder(accountId: string, orderId: string): Promise<any>
    /**
     * Save an order for a specific account.
     * @param accountId The account id
     * @param savedOrder The saved order
     */
    createSavedOrder(accountId: string, savedOrder: SavedOrder): Promise<any>
    /**
     * Delete a specific saved order for a specific account.
     * @param accountId The account id
     * @param savedOrderId The saved order id
     */
    deleteSavedOrder(accountId: string, savedOrderId: string): Promise<any>
    /**
     * Get saved order by its ID, for a specific account.
     * @param accountId The account id
     * @param savedOrderId The saved order id
     */
    getSavedOrder(accountId: string, savedOrderId: string): Promise<SavedOrder>
    /**
     * Get saved orders for a specific account.
     * @param accountId The account id
     * @returns List of saved orders
     */
    getSavedOrders(accountId: string): Promise<SavedOrder[]>
    /**
     * Replace an existing saved order for an account. The existing saved order will be replaced by the new order.
     * @param accountId The account id
     * @param savedOrderId The saved order id
     * @param savedOrder The new saved order
     */
    replaceSavedOrder(accountId: string, savedOrderId: string, savedOrder: SavedOrder): Promise<any>
    /**
     * Create watchlist for specific account.
     * @param accountId The account id
     * @param watchlist The watchlist
     */
    createWatchlist(accountId: string, watchlist: Watchlist): Promise<any>
    /**
     * Delete watchlist for a specific account.
     * @param accountId The account id
     * @param watchlistId The watchlist id
     */
    deleteWatchlist(accountId: string, watchlistId: string): Promise<any>
    /**
     * Get watchlist for a specific account.
     * @param accountId The account id
     * @param watchlistId The watchlist id
     */
    getWatchlist(accountId: string, watchlistId: string): Promise<WatchlistResult>
    /**
     * Get all watchlists of an account.
     * @param accountId The account id
     * @returns List of watchlists
     */
    getWatchlists(accountId: string): Promise<WatchlistResult[]>
    /**
     * All watchlists for all of the user's linked accounts.
     * @returns List of watchlists
     */
    getAllWatchlists(): Promise<WatchlistResult[]>
    /**
     * Replace watchlist for a specific account. This method does not verify that the symbol or asset type are valid.
     * @param accountId The account id
     * @param watchlistId The watchlist id
     * @param watchlist The watchlist
     */
    replaceWatchlist(accountId: string, watchlistId: string, watchlist: Watchlist): Promise<any>
    /**
     * Partially update watchlist for a specific account: change watchlist name, add
     * to the beginning/end of a watchlist, update or delete items in a watchlist.
     * This method does not verify that the symbol or asset type are valid.
     * @param accountId The account id
     * @param watchlistId The watchlist id
     * @param watchlist The new watchlist
     */
    updateWatchlist(accountId: string, watchlistId: string, watchlist: Watchlist): Promise<any>
    /**
     * Get a transaction for a specific account.
     * @param accountId The account id
     * @param transactionId The transaction id
     * @returns The transaction details
     */
    getTransaction(accountId: string, transactionId: string): Promise<Transaction>
    /**
     * Get all transactions for a specific account.
     * @param accountId The account id
     * @param params The query parameters
     * @returns The transaction history
     */
    getTransactions(accountId: string, params: TransactionQuery): Promise<Transaction[]>
} // TDAmeritrade()
