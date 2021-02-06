
export import { TDStreamer } from './streamer';
import tokens = require("./resources/tokens");
import market = require("./resources/market");
import accounts = require("./resources/accounts");
import orders = require("./resources/orders");
import savedOrders = require("./resources/savedOrders");
import watchlists = require("./resources/watchlists");
import transactions = require("./resources/transactions");
import EventEmitter from 'eventemitter3'
import { AxiosInstance } from 'axios'

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

export class TDAmeritrade extends Base {
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
    constructor(config?: Config);
    /**
     * Bootstrap a local web server for oauth2 authorization. Will request
     * access token and update config if authorization is successful.
     *
     * **(Available for Nodejs only)**
     *
     * @returns Success
     *
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
     *
     * @returns Success
     *
     * @example
     * td.login().then(token => {
     *     console.log(token)
     * }).catch(err => {
     *     console.log(err)
     * })
     */
    login(): Promise<any>;
    /**
     * Create a new instance of Account.
     *
     * @memberof TDAmeritrade
     * @param accountId The account id
     * @returns A new Account instance
     *
     * @example
     * const ira_account = td.account('45678')
     */
    account(accountId: string): TDAccount;
    /**
     * Create a new instance of TDStreamer.
     * For the time being, this will select the first available account.
     *
     * @memberof TDAmeritrade
     * @returns A new TDStreamer instance
     *
     * @example
     * const streamer = await td.streamer()
     */
    streamer(): Promise<TDStreamer>;

    getMarketHours: typeof market.getMarketHours;
    getMovers: typeof market.getMovers;
    getQuotes: typeof market.getQuotes;
    getQuote: typeof market.getQuote;
    getPriceHistory: typeof market.getPriceHistory;
    getOptionChain: typeof market.getOptionChain;
    searchInstruments: typeof market.searchInstruments;
    getInstrument: typeof market.getInstrument;
    getAccounts: typeof accounts.getAccounts;
    getAccount: typeof accounts.getAccount;
    getPreferences: typeof accounts.getPreferences;
    updatePreferences: typeof accounts.updatePreferences;
    getStreamerSubscriptionKeys: typeof accounts.getStreamerSubscriptionKeys;
    getUserPrincipals: typeof accounts.getUserPrincipals;
    getOrder: typeof orders.getOrder;
    getOrders: typeof orders.getOrders;
    getAllOrders: typeof orders.getAllOrders;
    placeOrder: typeof orders.placeOrder;
    replaceOrder: typeof orders.replaceOrder;
    cancelOrder: typeof orders.cancelOrder;
    getSavedOrder: typeof savedOrders.getSavedOrder;
    getSavedOrders: typeof savedOrders.getSavedOrders;
    createSavedOrder: typeof savedOrders.createSavedOrder;
    replaceSavedOrder: typeof savedOrders.replaceSavedOrder;
    deleteSavedOrder: typeof savedOrders.deleteSavedOrder;
    createWatchlist: typeof watchlists.createWatchlist;
    deleteWatchlist: typeof watchlists.deleteWatchlist;
    getWatchlist: typeof watchlists.getWatchlist;
    getWatchlists: typeof watchlists.getWatchlists;
    getAllWatchlists: typeof watchlists.getAllWatchlists;
    replaceWatchlist: typeof watchlists.replaceWatchlist;
    updateWatchlist: typeof watchlists.updateWatchlist;
    getTransaction: typeof transactions.getTransaction;
    getTransactions: typeof transactions.getTransactions;
}

declare class Base {
    constructor(config: Config);
    config: Config;
    axios: AxiosInstance;
    on(event: string | symbol, fn: (...args: any[]) => void): EventEmitter<string | symbol, any>;
    getAccessToken: typeof tokens.getAccessToken;
    refreshAccessToken: typeof tokens.refreshAccessToken;
    isAccessTokenExpired: typeof tokens.isAccessTokenExpired;
    isRefreshTokenExpired: typeof tokens.isRefreshTokenExpired;
}

export class TDAccount extends Base {
    constructor(accountId: string, config?: Config);
    accountId: string;
    getAccount(): Promise<any>;
    getPreferences(): Promise<any>;
    updatePreferences(preferences: accounts.Preferences): Promise<any>;
    getStreamerSubscriptionKeys(): Promise<any>;
    getOrders(params: orders.OrdersQuery): Promise<any>;
    getOrder(orderId: string): Promise<any>;
    placeOrder(order: object): Promise<any>;
    replaceOrder(orderId: string, order: object): Promise<any>;
    cancelOrder(orderId: string): Promise<any>;
    createSavedOrder(savedOrder: object): Promise<any>;
    deleteSavedOrder(savedOrderId: string): Promise<any>;
    getSavedOrder(savedOrderId: string): Promise<any>;
    getSavedOrders(): Promise<any>;
    replaceSavedOrder(savedOrderId: string, savedOrder: object): Promise<any>;
    createWatchlist(watchlist: watchlists.Watchlist): Promise<any>;
    deleteWatchlist(watchlistId: string): Promise<any>;
    getWatchlist(watchlistId: string): Promise<any>;
    getWatchlists(): Promise<any>;
    replaceWatchlist(watchlistId: string, watchlist: watchlists.Watchlist): Promise<any>;
    updateWatchlist(watchlistId: string, watchlist: watchlists.Watchlist): Promise<any>;
    getTransaction(transactionId: string): Promise<any>;
    getTransactions(params: transactions.TransactionQuery): Promise<any>;
}
