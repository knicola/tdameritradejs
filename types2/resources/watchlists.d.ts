export type Watchlist = {
    /**
     * Name
     */
    name: string;
    /**
     * Items
     */
    watchlistItems: WatchlistItem[];
};
export type WatchlistItem = {
    /**
     * Instrument
     */
    instrument: WatchlistInstrument;
};
export type WatchlistInstrument = {
    /**
     * Symbol
     */
    symbol: string;
    /**
     * Asset type
     */
    assetType: 'EQUITY' | 'OPTION' | 'MUTUAL_FUND' | 'FIXED_INCOME' | 'INDEX';
};
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
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {Watchlist} watchlist The watchlist
 * @returns {Promise<any>} Success
 */
export function createWatchlist(accountId: string, watchlist: Watchlist): Promise<any>;
/**
 * Delete watchlist for a specific account.
 *
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} watchlistId The watchlist id
 * @returns {Promise<any>} Success
 *
 * @example
 * await td.deleteWatchlist('45678', '98754')
 */
export function deleteWatchlist(accountId: string, watchlistId: string): Promise<any>;
/**
 * Get watchlist for a specific account.
 *
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} watchlistId The watchlist id
 * @returns {Promise<any>} Success
 *
 * @example
 * const watchlist = await td.getWatchlist('45678', '98754')
 */
export function getWatchlist(accountId: string, watchlistId: string): Promise<any>;
/**
 * Get all watchlists of an account.
 *
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @returns {Promise<any>} List of watchlists
 *
 * @example
 * const watchlists = await td.getWatchlists('45678')
 */
export function getWatchlists(accountId: string): Promise<any>;
/**
 * All watchlists for all of the user's linked accounts.
 *
 * @memberof TDAmeritrade
 * @returns {Promise<any>} List of watchlists
 *
 * @example
 * const watchlists = await td.getAllWatchlists()
 */
export function getAllWatchlists(): Promise<any>;
/**
 * Replace watchlist for a specific account. This method does not verify that the symbol or asset type are valid.
 *
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} watchlistId The watchlist id
 * @param {Watchlist} watchlist The watchlist
 * @returns {Promise<any>} Success
 */
export function replaceWatchlist(accountId: string, watchlistId: string, watchlist: Watchlist): Promise<any>;
/**
 * Partially update watchlist for a specific account: change watchlist name, add
 * to the beginning/end of a watchlist, update or delete items in a watchlist.
 * This method does not verify that the symbol or asset type are valid.
 *
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} watchlistId The watchlist id
 * @param {Watchlist} watchlist The new watchlist
 * @returns {Promise<any>} Success
 */
export function updateWatchlist(accountId: string, watchlistId: string, watchlist: Watchlist): Promise<any>;
