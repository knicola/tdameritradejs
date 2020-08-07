'use strict'

function searchInstruments(symbol, projection) {
    return this.axios.get('/instruments', {
        params: {
            symbol,
            projection,
            apikey: this.config.apiKey,
        }
    })
} // searchInstruments()

function getInstrument(cusip) {
    return this.axios.get(`/instruments/${cusip}`, {
        params: {
            apikey: this.config.apiKey,
        }
    })
} // getInstrument()

module.exports = {
    searchInstruments,
    getInstrument,
}
