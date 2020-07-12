'use strict'

function searchInstruments(symbol, projection) {
    return this.http({
        url: '/instruments',
        params: {
            symbol,
            projection,
            apikey: this.config.apiKey,
        }
    })
} // searchInstruments()

function getInstrument(cusip) {
    return this.http({
        url: `/instruments/${cusip}`,
        params: {
            apikey: this.config.apiKey,
        }
    })
} // getInstrument()

module.exports = {
    searchInstruments,
    getInstrument,
}
