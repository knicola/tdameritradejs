'use strict'

function createWatchlist(accountId, watchlist) {
    return this.http({
        method: 'POST',
        url: `/accounts/${accountId}/watchlists`,
        data: watchlist,
    })
} // createWatchlist()

function deleteWatchlist(accountId, watchlistId) {
    return this.http({
        method: 'DELETE',
        url: `/accounts/${accountId}/watchlists/${watchlistId}`,
    })
} // deleteWatchlist()

function getWatchlist(accountId, watchlistId) {
    return this.http({ url: `/accounts/${accountId}/watchlists/${watchlistId}` })
} // getWatchlist()

function getWatchlists(accountId) {
    return this.http({ url: `/accounts/${accountId}/watchlists` })
} // getWatchlists()

function getAllWatchlists() {
    return this.http({ url: '/accounts/watchlists' })
} // getAllWatchlists()

function replaceWatchlist(accountId, watchlistId, watchlist) {
    return this.http({
        method: 'PUT',
        url: `/accounts/${accountId}/watchlists/${watchlistId}`,
        data: watchlist,
    })
} // replaceWatchlist()

function updateWatchlist(accountId, watchlistId, watchlist) {
    return this.http({
        method: 'PATCH',
        url: `/accounts/${accountId}/watchlists/${watchlistId}`,
        data: watchlist,
    })
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
