export type Watchlist = {
    name: string;
    watchlistItems: WatchlistItem[];
};
export type WatchlistItem = {
    instrument: WatchlistInstrument;
};
export type WatchlistInstrument = {
    symbol: string;
    description: string;
    assetType: 'EQUITY' | 'OPTION' | 'MUTUAL_FUND' | 'FIXED_INCOME' | 'INDEX';
};

/**
 * Create watchlist for specific account.
 *
 * @memberof TDAmeritrade
 * @param accountId The account id
 * @param watchlist The watchlist
 * @returns Success
 */
export function createWatchlist(accountId: string, watchlist: Watchlist): Promise<any>;
/**
 * Delete watchlist for a specific account.
 *
 * @memberof TDAmeritrade
 * @param accountId The account id
 * @param watchlistId The watchlist id
 * @returns Success
 *
 * @example
 * await td.deleteWatchlist('45678', '98754')
 */
export function deleteWatchlist(accountId: string, watchlistId: string): Promise<any>;
/**
 * Get watchlist for a specific account.
 *
 * @memberof TDAmeritrade
 * @param accountId The account id
 * @param watchlistId The watchlist id
 * @returns Success
 *
 * @example
 * const watchlist = await td.getWatchlist('45678', '98754')
 */
export function getWatchlist(accountId: string, watchlistId: string): Promise<any>;
/**
 * Get all watchlists of an account.
 *
 * @memberof TDAmeritrade
 * @param accountId The account id
 * @returns List of watchlists
 *
 * @example
 * const watchlists = await td.getWatchlists('45678')
 */
export function getWatchlists(accountId: string): Promise<any>;
/**
 * All watchlists for all of the user's linked accounts.
 *
 * @memberof TDAmeritrade
 * @returns List of watchlists
 *
 * @example
 * const watchlists = await td.getAllWatchlists()
 */
export function getAllWatchlists(): Promise<any>;
/**
 * Replace watchlist for a specific account. This method does not verify that the symbol or asset type are valid.
 *
 * @memberof TDAmeritrade
 * @param accountId The account id
 * @param watchlistId The watchlist id
 * @param watchlist The watchlist
 * @returns Success
 */
export function replaceWatchlist(accountId: string, watchlistId: string, watchlist: Watchlist): Promise<any>;
/**
 * Partially update watchlist for a specific account: change watchlist name, add
 * to the beginning/end of a watchlist, update or delete items in a watchlist.
 * This method does not verify that the symbol or asset type are valid.
 *
 * @memberof TDAmeritrade
 * @param accountId The account id
 * @param watchlistId The watchlist id
 * @param watchlist The new watchlist
 * @returns Success
 */
export function updateWatchlist(accountId: string, watchlistId: string, watchlist: Watchlist): Promise<any>;
