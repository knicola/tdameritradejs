'use strict'

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

module.exports = {
    accountActivity,
    // chartEquity,
    chartEquityNormalized,
    chartFuturesOptions,
    newsHeadline,
    timesale,
    levelOneEquity,
}
