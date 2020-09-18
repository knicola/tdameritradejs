import { AxiosInstance, AxiosPromise } from "axios";
import { SecuritiesAccount, Preferences } from "./resources/account";
import { Order, OrdersQuery } from "./resources/order";
import { Watchlist, WatchlistResult } from "./resources/watchlist";
import { Transaction } from "./resources/transaction";
import { SubscriptionKeys, UserPrincipal } from "./resources/userPrincipals";

export class TDAccount {
    constructor(accountId: string, config: object)

    axios: AxiosInstance

    authenticate(authCode?:string): AxiosPromise
    refreshToken(refreshToken?: string): AxiosPromise

    getAccount(): AxiosPromise<SecuritiesAccount[]>
    getPreferences(): AxiosPromise<Preferences>
    updatePreferences(preferences: Preferences): AxiosPromise
    getStreamerSubscriptionKeys(): AxiosPromise<SubscriptionKeys>
    getUserPrincipals(fields: string|Array<'streamerSubscriptionKeys'|'streamerConnectionInfo'|'preferences'|'surrogateIds'>): AxiosPromise<UserPrincipal>

    getOrders(params?: OrdersQuery): AxiosPromise<Order[]>
    getOrder(orderId: string): AxiosPromise<Order>
    placeOrder(order: Order): AxiosPromise
    replaceOrder(orderId: string, order: Order): AxiosPromise
    cancelOrder(orderId: string): AxiosPromise

    createSavedOrder(savedOrder): AxiosPromise
    deleteSavedOrder(savedOrderId: string): AxiosPromise
    getSavedOrder(savedOrderId: string): AxiosPromise
    getSavedOrders(accountId: string): AxiosPromise
    replaceSavedOrder(savedOrderId: string, savedOrder): AxiosPromise

    createWatchlist(watchlist: Watchlist): AxiosPromise
    deleteWatchlist(watchlistId: string): AxiosPromise
    getWatchlist(watchlistId: string): AxiosPromise<WatchlistResult>
    getWatchlists(accountId: string): AxiosPromise<WatchlistResult[]>
    replaceWatchlist(watchlistId: string, watchlist: Watchlist): AxiosPromise
    updateWatchlist(watchlistId: string, watchlist: Watchlist): AxiosPromise

    getTransaction(transactionId: string): AxiosPromise<Transaction>
    getTransactions(params): AxiosPromise<Transaction[]>
} // TDAccount()
