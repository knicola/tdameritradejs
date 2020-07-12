/*
    {
        "forex": {
            "forex": {
                "date": "2020-06-08",
                "marketType": "FOREX",
                "exchange": null,
                "category": null,
                "product": "forex",
                "productName": null,
                "isOpen": false,
                "sessionHours": null
            }
        },
        "option": {
        "EQO": {
            "date": "2020-06-08",
            "marketType": "OPTION",
            "exchange": "NULL",
            "category": "NULL",
            "product": "EQO",
            "productName": "equity option",
            "isOpen": true,
            "sessionHours": {
            "regularMarket": [
                {
                "start": "2020-06-08T09:30:00-04:00",
                "end": "2020-06-08T16:00:00-04:00"
                }
            ]
            }
        },
        "IND": {
            "date": "2020-06-08",
            "marketType": "OPTION",
            "exchange": "NULL",
            "category": "NULL",
            "product": "IND",
            "productName": "index option",
            "isOpen": true,
            "sessionHours": {
            "regularMarket": [
                {
                "start": "2020-06-08T09:30:00-04:00",
                "end": "2020-06-08T16:15:00-04:00"
                }
            ]
            }
        }
    }
*/

//Hours:
export type MarketHours = {
    category?: string,
    date: string,
    exchange?: string,
    isOpen: false,
    marketType: 'BOND' | 'EQUITY' | 'ETF' | 'FOREX' | 'FUTURE' | 'FUTURE_OPTION' | 'INDEX' | 'INDICATOR' | 'MUTUAL_FUND' | 'OPTION' | 'UNKNOWN',
    product: string,
    productName?: string,
    sessionHours: SessionHours,
}
export interface SessionHours {
    preMarket?: Hours[],
    regularMarket: Hours[],
    postMarket?: Hours[],
}
export interface Hours {
    start: string,
    end: string,
}

//Mover:
export interface Mover {
    change: number,
    description: string,
    direction: 'up' | 'down',
    last: number,
    symbol: string,
    totalVolume: number,
}

export interface CandleList {
    candles: Candle[],
    empty: boolean,
    symbol: string
}
export interface Candle {
    close: number,
    datetime: number,
    high: number,
    low: number,
    open: number,
    volume: number
}

export interface PriceHistoryQuery {
    periodType: 'day'|'month'|'year'|'ytd',
    period: number,
    frequencyType: 'day'|'month'|'year'|'ytd',
    frequency: number,
    startDate: 'string',
    endDate: 'string',
    needExtendedHoursData: boolean,
}

export interface OptionChainQuery {
    symbol: 'string',
    contractType: 'CALL'|'PUT'|'ALL',
    strikeCount: number,
    includeQuotes: boolean,
    strategy: 'SINGLE'|'ANALYTICAL'|'COVERED'|'VERTICAL'|'CALENDAR'|'STRANGLE'|'STRADDLE'|'BUTTERFLY'|'CONDOR'|'DIAGONAL'|'COLLAR'|'ROLL',
    interval: number,
    strike: number,
    range: 'ALL'|'ITM'|'NTM'|'OTM'|'SAK'|'SBK'|'SNK',
    fromDate: string,
    toDate: string,
    volatility: number,
    underlyingPrice: number,
    interestRate: number,
    daysToExpiration: number,
    expMonth: 'ALL'|'JAN'|'FEB'|'MAR'|'APR'|'MAY'|'JUN'|'JUL'|'AUG'|'SEP'|'OCT'|'NOV'|'DEC',
    optionType: 'ALL'|'S'|'NS',
}
