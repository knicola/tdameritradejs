'use strict'

/**
 * @typedef {object} WatchlistInstrument
 * @property {string} symbol Symbol
 * @property {string} description Description
 * @property {'EQUITY'|'OPTION'|'MUTUAL_FUND'|'FIXED_INCOME'|'INDEX'} assetType Asset type
 */
/**
 * @typedef {object} WatchlistItem
 * @property {WatchlistInstrument} instrument Instrument
 */
/**
 * @typedef {object} Watchlist
 * @property {string} name Name
 * @property {WatchlistItem[]} watchlistItems Items
 */
/**
 * Create watchlist for specific account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {Watchlist} watchlist The watchlist
 * @returns {Promise<any>} Success
 */
function createWatchlist(accountId, watchlist) {
    return this.axios.post(`/accounts/${accountId}/watchlists`, watchlist)
} // createWatchlist()

/**
 * Delete watchlist for a specific account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} watchlistId The watchlist id
 * @returns {Promise<any>} Success
 *
 * @example
 * await td.deleteWatchlist('45678', '98754')
 */
function deleteWatchlist(accountId, watchlistId) {
    return this.axios.delete(`/accounts/${accountId}/watchlists/${watchlistId}`)
} // deleteWatchlist()

/**
 * Get watchlist for a specific account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} watchlistId The watchlist id
 * @returns {Promise<any>} Success
 *
 * @example
 * const watchlist = await td.getWatchlist('45678', '98754')
 */
function getWatchlist(accountId, watchlistId) {
    return this.axios.get(`/accounts/${accountId}/watchlists/${watchlistId}`)
} // getWatchlist()

/**
 * Get all watchlists of an account.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @returns {Promise<any>} List of watchlists
 *
 * @example
 * const watchlists = await td.getWatchlists('45678')
 */
function getWatchlists(accountId) {
    return this.axios.get(`/accounts/${accountId}/watchlists`)
} // getWatchlists()

/**
 * All watchlists for all of the user's linked accounts.
 *
 * @instance
 * @memberof TDAmeritrade
 * @returns {Promise<any>} List of watchlists
 *
 * @example
 * const watchlists = await td.getAllWatchlists()
 */
function getAllWatchlists() {
    return this.axios.get('/accounts/watchlists')
} // getAllWatchlists()

/**
 * Replace watchlist for a specific account. This method does not verify that the symbol or asset type are valid.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} watchlistId The watchlist id
 * @param {Watchlist} watchlist The watchlist
 * @returns {Promise<any>} Success
 */
function replaceWatchlist(accountId, watchlistId, watchlist) {
    return this.axios.put(`/accounts/${accountId}/watchlists/${watchlistId}`, watchlist)
} // replaceWatchlist()

/**
 * Partially update watchlist for a specific account: change watchlist name, add
 * to the beginning/end of a watchlist, update or delete items in a watchlist.
 * This method does not verify that the symbol or asset type are valid.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} watchlistId The watchlist id
 * @param {Watchlist} watchlist The new watchlist
 * @returns {Promise<any>} Success
 */
function updateWatchlist(accountId, watchlistId, watchlist) {
    return this.axios.patch(`/accounts/${accountId}/watchlists/${watchlistId}`, watchlist)
} // updateWatchlist()

module.exports = {
    createWatchlist,
    deleteWatchlist,
    getWatchlist,
    getWatchlists,
    getAllWatchlists,
    replaceWatchlist,
    updateWatchlist,
}
