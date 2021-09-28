'use strict'

/**
 * Transform account activity data.
 *
 * @private
 * @param {object} data Data
 * @returns {object} Data
 */
function accountActivity(data) {
    return Object.assign({}, data, {
        content: data.content.map(entry => {
            return {
                subscriptionKey: entry[0],
                accountNumber: entry[1],
                messageType: entry[2],
                messageData: entry[3],
            }
        })
    })
} // accountActivity()

// function chartEquity(data) {
//     return Object.assign({}, data, {
//         content: data.content.map(entry => {
//             return {
//                 key: entry.key,
//                 openPrice: entry[1],
//                 highPrice: entry[2],
//                 lowPrice: entry[3],
//                 closePrice: entry[4],
//                 volume: entry[5],
//                 sequence: entry[6],
//                 chartTime: entry[7],
//                 chartDay: entry[8],
//             }
//         })
//     })
// } // chartEquity()

/**
 * Transform chart equity data.
 *
 * @private
 * @param {object} data Data
 * @returns {object} Data
 */
function chartEquityNormalized(data) {
    return Object.assign({}, data, {
        content: data.content.map(entry => {
            return {
                key: entry.key,
                seq: entry.seq,
                chartTime: entry[7],
                openPrice: entry[1],
                highPrice: entry[2],
                lowPrice: entry[3],
                closePrice: entry[4],
                volume: entry[5],
            }
        })
    })
} // chartEquityNormalized()

/**
 * Transform chart futures/options data.
 *
 * @private
 * @param {object} data Data
 * @returns {object} Data
 */
function chartFuturesOptions(data) {
    return Object.assign({}, data, {
        content: data.content.map(entry => {
            return {
                key: entry.key,
                seq: entry.seq,
                chartTime: entry[1],
                openPrice: entry[2],
                highPrice: entry[3],
                lowPrice: entry[4],
                closePrice: entry[5],
                volume: entry[6],
            }
        })
    })
} // chartFutures()

/**
 * Transform news headline data.
 *
 * @private
 * @param {object} data Data
 * @returns {object} Data
 */
function newsHeadline(data) {
    return Object.assign({}, data, {
        content: data.content.map(entry => {
            return {
                key: entry.key,
                seq: entry.seq,
                errorCode: entry[1],
                storyDatetime: entry[2],
                headlineID: entry[3],
                status: entry[4],
                headline: entry[5],
                storyID: entry[6],
                countForKeyword: entry[7],
                keywordArray: entry[8],
                isHot: entry[9],
                storySource: entry[10],
            }
        })
    })
} // newsHeadline()

/**
 * Transform timesale data.
 *
 * @private
 * @param {object} data Data
 * @returns {object} Data
 */
function timesale(data) {
    return Object.assign({}, data, {
        content: data.content.map(entry => {
            return {
                key: entry.key,
                seq: entry.seq,
                tradeTime: entry[1],
                lastPrice: entry[2],
                lastSize: entry[3],
                lastSequence: entry[4],
            }
        })
    })
} // timesale()

/**
 * Transform level one equity data.
 *
 * @private
 * @param {object} data Data
 * @returns {object} Data
 */
function levelOneEquity(data) {
    return Object.assign({}, data, {
        content: data.content.map(entry => {
            return {
                key: entry.key,
                assetMainType: entry.assetMainType,
                assetSubType: entry.assetSubType,
                cusip: entry.cusip,
                delayed: entry.delayed,
                bidPrice: entry[1],
                askPrice: entry[2],
                lastPrice: entry[3],
                bidSize: entry[4],
                askSize: entry[5],
                askID: entry[6],
                bidID: entry[7],
                totalVolume: entry[8],
                lastSize: entry[9],
                tradeTime: entry[10],
                quoteTime: entry[11],
                highPrice: entry[12],
                lowPrice: entry[13],
                bidTick: entry[14],
                closePrice: entry[15],
                exchangeID: entry[16],
                marginable: entry[17],
                shortable: entry[18],
                quoteDay: entry[22],
                tradeDay: entry[23],
                volatility: entry[24],
                description: entry[25],
                lastID: entry[26],
                digits: entry[27],
                openPrice: entry[28],
                netChange: entry[29],
                '52WeekHigh': entry[30],
                '52WeekLow': entry[31],
                peRatio: entry[32],
                dividendAmount: entry[33],
                dividendYield: entry[34],
                nav: entry[37],
                fundPrice: entry[38],
                exchangeName: entry[39],
                dividendDate: entry[40],
                regularMarketQuote: entry[41],
                regularMarketTrade: entry[42],
                regularMarketLastPrice: entry[43],
                regularMarketLastSize: entry[44],
                regularMarketTradeTime: entry[45],
                regularMarketTradeDay: entry[46],
                regularMarketNetChange: entry[47],
                securityStatus: entry[48],
                mark: entry[49],
                quoteTimeInLong: entry[50],
                tradeTimeInLong: entry[51],
                regularMarketTradeTimeInLong: entry[52],
            }
        })
    })
} // levelOneEquity()

/**
 * Transform leven one futures data.
 *
 * @private
 * @param {object} data Data
 * @returns {object} Data
 */
function levelOneFutures(data) {
    return Object.assign({}, data, {
        content: data.content.map(entry => {
            return {
                key: entry.key,
                bidPrice: entry[1],
                askPrice: entry[2],
                lastPrice: entry[3],
                bidSize: entry[4],
                askSize: entry[5],
                askID: entry[6],
                bidID: entry[7],
                totalVolume: entry[8],
                lastSize: entry[9],
                quoteTime: entry[10],
                tradeTime: entry[11],
                highPrice: entry[12],
                lowPrice: entry[13],
                closePrice: entry[14],
                exchangeID: entry[15],
                description: entry[16],
                lastID: entry[17],
                openPrice: entry[18],
                netChange: entry[19],
                futurePercentChange: entry[20],
                exhangeName: entry[21],
                securityStatus: entry[22],
                openInterest: entry[23],
                mark: entry[24],
                tick: entry[25],
                tickAmount: entry[26],
                product: entry[27],
                futurePriceFormat: entry[28],
                futureTradingHours: entry[29],
                futureIsTradable: entry[30],
                futureMultiplier: entry[31],
                futureIsActive: entry[32],
                futureSettlementPrice: entry[33],
                futureActiveSymbol: entry[34],
                futureExpirationDate: entry[35],
            }
        })
    })
} // levelOneFutures()

/**
 * Transform chart history futures data.
 *
 * @private
 * @param {object} data Data
 * @returns {object} Data
 */
function chartHistoryFutures(data) {
    return Object.assign({}, data, {
        key: data.content[0].key,
        content: data.content[0][3].map(entry => {
            return {
                chartTime: entry[0],
                openPrice: entry[1],
                highPrice: entry[2],
                lowPrice: entry[3],
                closePrice: entry[4],
                volume: entry[5],
            }
        })
    })
} // chartHistoryFutures()

/**
 * Transform option level one data.
 *
 * @private
 * @param {object} data Data
 * @returns {object} Data
 */
function levelOneOption(data) {
    return Object.assign({}, data, {
        key: data.content[0].key,
        content: data.content.map(entry => {
            return {
                symbol: entry.key,
                description: entry[1],
                bidPrice: entry[2],
                askPrice: entry[3],
                lastPrice: entry[4],
                highPrice: entry[5],
                lowPrice: entry[6],
                closePrice: entry[7],
                totalVolume: entry[8],
                openInterest: entry[9],
                volatility: entry[10],
                quoteTime: entry[11],
                tradeTime: entry[12],
                intrinsicValue: entry[13],
                quoteDay: entry[14],
                tradeDay: entry[15],
                expirationYear: entry[16],
                multiplier: entry[17],
                digits: entry[18],
                openPrice: entry[19],
                bidSize: entry[20],
                askSize: entry[21],
                lastSize: entry[22],
                netChange: entry[23],
                strikePrice: entry[24],
                contractType: entry[25],
                underlying: entry[26],
                expirationMonth: entry[27],
                deliverables: entry[28],
                timeValue: entry[29],
                expirationDay: entry[30],
                daysToExpiration: entry[31],
                delta: entry[32],
                gamma: entry[33],
                theta: entry[34],
                vega: entry[35],
                rho: entry[36],
                securityStatus: entry[37],
                theoreticalOptionValue: entry[38],
                underlyingPrice: entry[39],
                uvExpirationType: entry[40],
                mark: entry[41],
            }
        })
    })
} // chartHistoryFutures()

module.exports = {
    accountActivity,
    // chartEquity,
    chartEquityNormalized,
    chartFuturesOptions,
    newsHeadline,
    timesale,
    levelOneEquity,
    levelOneFutures,
    chartHistoryFutures,
    levelOneOption
}
