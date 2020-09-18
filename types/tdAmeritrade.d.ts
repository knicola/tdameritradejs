import { AxiosPromise, AxiosInstance } from "axios"
import { OrdersQuery, Order } from "./resources/order"
import { SecuritiesAccount, Preferences } from "./resources/account"
import { UserPrincipal, SubscriptionKeys } from "./resources/userPrincipals"
import { Watchlist, WatchlistResult } from "./resources/watchlist"
import { Transaction } from "./resources/transaction"
import { MarketHours, Mover, CandleList, PriceHistoryQuery, OptionChainQuery } from "./resources/market"
import TDAccount from "./tdAccount"
import TDStreamer from "../src/tdStreamer"

export class TDAmeritrade {
    constructor(config: object)

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

    getAccessToken(authCode?): AxiosPromise
    refreshAccessToken(refreshToken?): AxiosPromise

    getMarketHours(markets: string|string[], date: string): AxiosPromise
    getMovers(index: string, direction?: 'up'|'down', change?: 'value'|'percent'): AxiosPromise<Mover[]>
    getQuotes(symbols: string|string[]): AxiosPromise
    getQuote(symbol: string): AxiosPromise
    getPriceHistory(symbol: string, params?: PriceHistoryQuery): AxiosPromise<CandleList>
    getOptionChain(symbol: string, params?: OptionChainQuery): AxiosPromise

    getAccounts(): AxiosPromise<SecuritiesAccount[]>
    getAccount(accountId: string): AxiosPromise<SecuritiesAccount>
    getPreferences(accountId: string): AxiosPromise<Preferences>
    updatePreferences(accountId: string, preferences: Preferences): AxiosPromise

    getStreamerSubscriptionKeys(accountIds: string|string[]): AxiosPromise<SubscriptionKeys>
    getUserPrincipals(fields: string|Array<'streamerSubscriptionKeys'|'streamerConnectionInfo'|'preferences'|'surrogateIds'>): AxiosPromise<UserPrincipal>

    getOrder(accountId: string, orderId: string): AxiosPromise<Order>
    getOrders(accountId: string, params?: OrdersQuery): AxiosPromise<Order[]>
    getAllOrders(params: OrdersQuery): AxiosPromise<Order[]>
    placeOrder(accountId: string, order: Order): AxiosPromise
    replaceOrder(accountId: string, orderId: string, order: Order): AxiosPromise
    cancelOrder(accountId: string, orderId: string): AxiosPromise

    createSavedOrder(accountId: string, savedOrder): AxiosPromise
    deleteSavedOrder(accountId: string, savedOrderId: string): AxiosPromise
    getSavedOrder(accountId: string, savedOrderId: string): AxiosPromise
    getSavedOrders(accountId: string): AxiosPromise
    replaceSavedOrder(accountId: string, savedOrderId: string, savedOrder): AxiosPromise

    createWatchlist(accountId: string, watchlist: Watchlist): AxiosPromise
    deleteWatchlist(accountId: string, watchlistId: string): AxiosPromise
    getWatchlist(accountId: string, watchlistId: string): AxiosPromise<WatchlistResult>
    getWatchlists(accountId: string): AxiosPromise<WatchlistResult[]>
    getAllWatchlists(): AxiosPromise<WatchlistResult[]>
    replaceWatchlist(accountId: string, watchlistId: string, watchlist: Watchlist): AxiosPromise
    updateWatchlist(accountId: string, watchlistId: string, watchlist: Watchlist): AxiosPromise

    getTransaction(accountId: string, transactionId: string): AxiosPromise<Transaction>
    getTransactions(accountId: string, params): AxiosPromise<Transaction[]>
} // TDAmeritrade()
