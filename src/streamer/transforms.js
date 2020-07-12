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

module.exports = {
    accountActivity,
    // chartEquity,
    chartEquityNormalized,
    chartFuturesOptions,
    newsHeadline,
    timesale,
}
