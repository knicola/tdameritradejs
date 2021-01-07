'use strict'

/**
 * @typedef {'symbol-search'|'symbol-regex'|'desc-search'|'desc-regex'|'fundamental'} Projection
 */
/**
 * Search or retrieve instrument data, including fundamental data.
 * @param {string} symbol The ticker symbol
 * @param {Projection} projection The type of request
 * - `symbol-search`: Retrieve instrument data of a specific symbol or cusip
 * - `symbol-regex`: Retrieve instrument data for all symbols matching regex. Example: `symbol=XYZ.*` will return all symbols beginning with XYZ
 * - `desc-search`: Retrieve instrument data for instruments whose description contains the word supplied. Example: `symbol=FakeCompany` will return all instruments with FakeCompany in the description.
 * - `desc-regex`: Search description with full regex support. Example: `symbol=XYZ.[A-C]` returns all instruments whose descriptions contain a word beginning with XYZ followed by a character A through C.
 * - `fundamental`: Returns fundamental data for a single instrument specified by exact symbol.
 * @returns {Promise} The instrument data
 */
function searchInstruments(symbol, projection) {
    return this.axios.get('/instruments', {
        params: {
            symbol,
            projection,
            apikey: this.config.apiKey,
        }
    })
} // searchInstruments()

/**
 * Get an instrument by its CUSIP.
 * @param {string} cusip The CUSIP identifier
 * @returns {Promise} The instrument details
 */
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
