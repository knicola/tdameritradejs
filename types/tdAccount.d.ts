import { SecuritiesAccount, Preferences } from "./resources/account";
import { Order, OrdersQuery } from "./resources/order";
import { Watchlist, WatchlistResult } from "./resources/watchlist";
import { Transaction } from "./resources/transaction";
import { SubscriptionKeys, UserPrincipal, UserPrincipalFields } from "./resources/userPrincipals";
import { SavedOrder } from "./resources/savedOrder"
import { Base } from "./base";

export class TDAccount extends Base {
    constructor(accountId: string, config: object)

    getAccount(): Promise<SecuritiesAccount[]>
    getPreferences(): Promise<Preferences>
    updatePreferences(preferences: Preferences): Promise<any>
    getStreamerSubscriptionKeys(): Promise<SubscriptionKeys>
    getUserPrincipals(fields?: UserPrincipalFields|UserPrincipalFields[]): Promise<UserPrincipal>

    getOrders(params?: OrdersQuery): Promise<Order[]>
    getOrder(orderId: string): Promise<Order>
    placeOrder(order: Order): Promise<any>
    replaceOrder(orderId: string, order: Order): Promise<any>
    cancelOrder(orderId: string): Promise<any>

    createSavedOrder(savedOrder): Promise<any>
    deleteSavedOrder(savedOrderId: string): Promise<any>
    getSavedOrder(savedOrderId: string): Promise<SavedOrder>
    getSavedOrders(): Promise<SavedOrder[]>
    replaceSavedOrder(savedOrderId: string, savedOrder): Promise<any>

    createWatchlist(watchlist: Watchlist): Promise<any>
    deleteWatchlist(watchlistId: string): Promise<any>
    getWatchlist(watchlistId: string): Promise<WatchlistResult>
    getWatchlists(): Promise<WatchlistResult[]>
    replaceWatchlist(watchlistId: string, watchlist: Watchlist): Promise<any>
    updateWatchlist(watchlistId: string, watchlist: Watchlist): Promise<any>

    getTransaction(transactionId: string): Promise<Transaction>
    getTransactions(params): Promise<Transaction[]>
} // TDAccount()
