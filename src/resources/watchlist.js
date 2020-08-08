'use strict'

function createWatchlist(accountId, watchlist) {
    return this.axios.post(`/accounts/${accountId}/watchlists`, watchlist)
} // createWatchlist()

function deleteWatchlist(accountId, watchlistId) {
    return this.axios.delete(`/accounts/${accountId}/watchlists/${watchlistId}`)
} // deleteWatchlist()

function getWatchlist(accountId, watchlistId) {
    return this.axios.get(`/accounts/${accountId}/watchlists/${watchlistId}`)
} // getWatchlist()

function getWatchlists(accountId) {
    return this.axios.get(`/accounts/${accountId}/watchlists`)
} // getWatchlists()

function getAllWatchlists() {
    return this.axios.get('/accounts/watchlists')
} // getAllWatchlists()

function replaceWatchlist(accountId, watchlistId, watchlist) {
    return this.axios.put(`/accounts/${accountId}/watchlists/${watchlistId}`, watchlist)
} // replaceWatchlist()

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
