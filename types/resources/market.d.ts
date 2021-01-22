export type Market =
    |'EQUITY'
    |'OPTION'
    |'FUTURE'
    |'BOND'
    |'FOREX'

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
    /**
     * The type of period to show
     */
    periodType?: 'day'|'month'|'year'|'ytd',
    /**
     * The number of periods to show
     * - `day` : 1, 2, 3, 4, 5, 10*
     * - `month` : 1*, 2, 3, 6
     * - `year` : 1*, 2, 3, 5, 10, 15, 20
     * - `ytd` : 1*
     */
    period: 1|2|3|4|5|6|10|15|20,
    /**
     * The type of frequency with which a new candle is formed
     * - `day` : minute*
     * - `month` : daily, weekly*
     * - `year` : daily, weekly, monthly*
     * - `ytd` : daily, weekly*
     */
    frequencyType?: 'day'|'month'|'year'|'ytd',
    /**
     * Start date as milliseconds since epoch. If `startDate` and `endDate` are provided, period should not be provided
     */
    startDate?: string,
    /**
     * End date as milliseconds since epoch. If `startDate` and `endDate` are provided, period should not be provided. Default is previous trading day
     */
    endDate?: string,
    /**
     * Include extended hours data. Default is `true`
     */
    needExtendedHoursData?: boolean,
}

export interface OptionChainQuery {
    /**
     *  Type of contracts to return in the chain. Default is `ALL`
     */
    contractType: 'CALL'|'PUT'|'ALL',
    /**
     * The number of strikes to return above and below the at-the-money price
     */
    strikeCount: number,
    /**
     * Include quotes for options in the option chain. Default is `false`
     */
    includeQuotes: boolean,
    /**
     * Passing a value returns a Strategy Chain. Default is `SINGLE`
     */
    strategy: 'SINGLE'|'ANALYTICAL'|'COVERED'|'VERTICAL'|'CALENDAR'|'STRANGLE'|'STRADDLE'|'BUTTERFLY'|'CONDOR'|'DIAGONAL'|'COLLAR'|'ROLL',
    /**
     * Strike interval for spread strategy chains
     */
    interval: number,
    /**
     * Provide a strike price to return options only at that strike price
     */
    strike: number,
    /**
     * Returns options for the given range. Default is `ALL`
     * - `ITM` : In-the-money
     * - `NTM` : Near-the-money
     * - `OTM` : Out-of-the-money
     * - `SAK` : Strikes Above Market
     * - `SBK` : Strikes Below Market
     * - `SNK` : Strikes Near Market
     * - `ALL` : All Strikes
     */
    range: 'ALL'|'ITM'|'NTM'|'OTM'|'SAK'|'SBK'|'SNK',
    /**
     * Only return expirations after this date. For strategies, expiration refers
     * to the nearest term expiration in the strategy. Valid ISO-8601 formats are: `yyyy-MM-dd` and `yyyy-MM-dd'T'HH:mm:ssz`
     */
    fromDate: string,
    /**
     * Only return expirations before this date. For strategies, expiration refers
     * to the nearest term expiration in the strategy. Valid ISO-8601 formats are: `yyyy-MM-dd` and `yyyy-MM-dd'T'HH:mm:ssz`
     */
    toDate: string,
    /**
     * Volatility to use in calculations.Applies only to `ANALYTICAL` strategy chains
     */
    volatility: number,
    /**
     * Underlying price to use in calculations.Applies only to ANALYTICAL strategy chains
     */
    underlyingPrice: number,
    /**
     * Interest rate to use in calculations.Applies only to ANALYTICAL strategy chains
     */
    interestRate: number,
    /**
     * Days to expiration to use in calculations.Applies only to ANALYTICAL strategy chains
     */
    daysToExpiration: number,
    /**
     * Return only options expiring in the specified month. Month is given in the three
     * character format (eg. `JAN`). Default is ALL
     */
    expMonth: 'ALL'|'JAN'|'FEB'|'MAR'|'APR'|'MAY'|'JUN'|'JUL'|'AUG'|'SEP'|'OCT'|'NOV'|'DEC',
    /**
     * Type of contracts to return. Default is `ALL`
     */
    optionType: 'ALL'|'S'|'NS',
}
