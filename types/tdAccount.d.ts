import { AxiosInstance, Promise } from "axios";
import { SecuritiesAccount, Preferences } from "./resources/account";
import { Order, OrdersQuery } from "./resources/order";
import { Watchlist, WatchlistResult } from "./resources/watchlist";
import { Transaction } from "./resources/transaction";
import { SubscriptionKeys, UserPrincipal } from "./resources/userPrincipals";
import { Base } from "./base";

export class TDAccount extends Base {
    constructor(accountId: string, config: object)

    getAccount(): Promise<SecuritiesAccount[]>
    getPreferences(): Promise<Preferences>
    updatePreferences(preferences: Preferences): Promise
    getStreamerSubscriptionKeys(): Promise<SubscriptionKeys>
    getUserPrincipals(fields: string|Array<'streamerSubscriptionKeys'|'streamerConnectionInfo'|'preferences'|'surrogateIds'>): Promise<UserPrincipal>

    getOrders(params?: OrdersQuery): Promise<Order[]>
    getOrder(orderId: string): Promise<Order>
    placeOrder(order: Order): Promise
    replaceOrder(orderId: string, order: Order): Promise
    cancelOrder(orderId: string): Promise

    createSavedOrder(savedOrder): Promise
    deleteSavedOrder(savedOrderId: string): Promise
    getSavedOrder(savedOrderId: string): Promise
    getSavedOrders(accountId: string): Promise
    replaceSavedOrder(savedOrderId: string, savedOrder): Promise

    createWatchlist(watchlist: Watchlist): Promise
    deleteWatchlist(watchlistId: string): Promise
    getWatchlist(watchlistId: string): Promise<WatchlistResult>
    getWatchlists(accountId: string): Promise<WatchlistResult[]>
    replaceWatchlist(watchlistId: string, watchlist: Watchlist): Promise
    updateWatchlist(watchlistId: string, watchlist: Watchlist): Promise

    getTransaction(transactionId: string): Promise<Transaction>
    getTransactions(params): Promise<Transaction[]>
} // TDAccount()
