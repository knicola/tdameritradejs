export interface OrdersQuery {
    /**
     * The max number of orders to retrieve.
     */
    maxResults?: number,
    /**
     * Specifies that no orders entered before this time should be returned. Valid ISO-8601 formats are:
     *  yyyy-MM-dd. Date must be within 60 days from today's date. 'toEnteredTime' must also be set.
     */
    fromEnteredTime?: string,
    /**
     * Specifies that no orders entered after this time should be returned.Valid ISO-8601 formats are:
     *  yyyy-MM-dd. 'fromEnteredTime' must also be set.
     */
    toEnteredTime?: string,
    /**
     * Specifies that only orders of this status should be returned.
     */
    status?: 'AWAITING_PARENT_ORDER' | 'AWAITING_CONDITION' | 'AWAITING_MANUAL_REVIEW' | 'ACCEPTED' | 'AWAITING_UR_OUT' | 'PENDING_ACTIVATION' | 'QUEUED' | 'WORKING' | 'REJECTED' | 'PENDING_CANCEL' | 'CANCELED' | 'PENDING_REPLACE' | 'REPLACED' | 'FILLED' | 'EXPIRED',
}
export interface Equity {
    assetType: 'EQUITY' | 'OPTION' | 'INDEX' | 'MUTUAL_FUND' | 'CASH_EQUIVALENT' | 'FIXED_INCOME' | 'CURRENCY',
    cusip: string,
    symbol: string,
    description: string,
}
export interface FixedIncome extends Equity {
    maturityDate: string,
    variableRate: number,
    factor: number,
}
export interface MutualFund extends Equity {
    type: 'NOT_APPLICABLE' | 'OPEN_END_NON_TAXABLE' | 'OPEN_END_TAXABLE' | 'NO_LOAD_NON_TAXABLE' | 'NO_LOAD_TAXABLE',
}
export interface CashEquivalent extends Equity {
    type: 'SAVINGS' | 'MONEY_MARKET_FUND',
}
export interface Option extends Equity {
    type: 'VANILLA' | 'BINARY' | 'BARRIER',
    putCall: 'PUT' | 'CALL',
    underlyingSymbol: string,
    optionMultiplier: number,
    optionDeliverables: Array<OptionDeliverable>,
}
export interface OptionDeliverable {
    symbol: string,
    deliverableUnits: number,
    currencyType: 'USD' | 'CAD' | 'EUR' | 'JPY',
    assetType: 'EQUITY' | 'OPTION' | 'INDEX' | 'MUTUAL_FUND' | 'CASH_EQUIVALENT' | 'FIXED_INCOME' | 'CURRENCY'
}
export interface OrderLeg {
    orderLegType: 'EQUITY' | 'OPTION' | 'INDEX' | 'MUTUAL_FUND' | 'CASH_EQUIVALENT' | 'FIXED_INCOME' | 'CURRENCY',
    legId: number,
    instrument: Equity | FixedIncome | MutualFund | CashEquivalent | Option,
    instruction: 'BUY' | 'SELL' | 'BUY_TO_COVER' | 'SELL_SHORT' | 'BUY_TO_OPEN' | 'BUY_TO_CLOSE' | 'SELL_TO_OPEN' | 'SELL_TO_CLOSE' | 'EXCHANGE',
    positionEffect: 'OPENING' | 'CLOSING' | 'AUTOMATIC',
    quantity: number,
    quantityType: 'ALL_SHARES' | 'DOLLARS' | 'SHARES',
}
export interface OrderActivity {
    activityType: 'EXECUTION' | 'ORDER_ACTION',
    executionType: 'FILL',
    quantity: number,
    orderRemainingQuantity: number,
    executionLegs: Array<OrderExecutionLeg>,
}
export interface OrderExecutionLeg {
    legId: number,
    quantity: number,
    mismarkedQuantity: number,
    price: number,
    time: string,
}
export interface Order {
    session: 'NORMAL' | 'AM' | 'PM' | 'SEAMLESS',
    duration: 'DAY' | 'GOOD_TILL_CANCEL' | 'FILL_OR_KILL',
    orderType: 'MARKET' | 'LIMIT' | 'STOP' | 'STOP_LIMIT' | 'TRAILING_STOP' | 'MARKET_ON_CLOSE' | 'EXERCISE' | 'TRAILING_STOP_LIMIT' | 'NET_DEBIT' | 'NET_CREDIT' | 'NET_ZERO',
    cancelTime: {
        date: string,
        shortFormat: boolean,
    },
    complexOrderStrategyType: 'NONE' | 'COVERED' | 'VERTICAL' | 'BACK_RATIO' | 'CALENDAR' | 'DIAGONAL' | 'STRADDLE' | 'STRANGLE' | 'COLLAR_SYNTHETIC' | 'BUTTERFLY' | 'CONDOR' | 'IRON_CONDOR' | 'VERTICAL_ROLL' | 'COLLAR_WITH_STOCK' | 'DOUBLE_DIAGONAL' | 'UNBALANCED_BUTTERFLY' | 'UNBALANCED_CONDOR' | 'UNBALANCED_IRON_CONDOR' | 'UNBALANCED_VERTICAL_ROLL' | 'CUSTOM',
    quantity: number,
    filledQuantity: number,
    remainingQuantity: number,
    requestedDestination: 'INET' | 'ECN_ARCA' | 'CBOE' | 'AMEX' | 'PHLX' | 'ISE' | 'BOX' | 'NYSE' | 'NASDAQ' | 'BATS' | 'C2' | 'AUTO',
    destinationLinkName: string,
    releaseTime: string,
    stopPrice: number,
    stopPriceLinkBasis: 'MANUAL' | 'BASE' | 'TRIGGER' | 'LAST' | 'BID' | 'ASK' | 'ASK_BID' | 'MARK' | 'AVERAGE',
    stopPriceLinkType: 'VALUE' | 'PERCENT' | 'TICK',
    stopPriceOffset: number,
    stopType: 'STANDARD' | 'BID' | 'ASK' | 'LAST' | 'MARK',
    priceLinkBasis: 'MANUAL' | 'BASE' | 'TRIGGER' | 'LAST' | 'BID' | 'ASK' | 'ASK_BID' | 'MARK' | 'AVERAGE',
    priceLinkType: 'VALUE' | 'PERCENT' | 'TICK',
    price: number,
    taxLotMethod: 'FIFO' | 'LIFO' | 'HIGH_COST' | 'LOW_COST' | 'AVERAGE_COST' | 'SPECIFIC_LOT',
    orderLegCollection: Array<OrderLeg>,
    activationPrice: number,
    specialInstruction: 'ALL_OR_NONE' | 'DO_NOT_REDUCE' | 'ALL_OR_NONE_DO_NOT_REDUCE',
    orderStrategyType: 'SINGLE' | 'OCO' | 'TRIGGER',
    orderId: number,
    cancelable: boolean,
    editable: boolean,
    status: 'AWAITING_PARENT_ORDER' | 'AWAITING_CONDITION' | 'AWAITING_MANUAL_REVIEW' | 'ACCEPTED' | 'AWAITING_UR_OUT' | 'PENDING_ACTIVATION' | 'QUEUED' | 'WORKING' | 'REJECTED' | 'PENDING_CANCEL' | 'CANCELED' | 'PENDING_REPLACE' | 'REPLACED' | 'FILLED' | 'EXPIRED',
    enteredTime: string,
    closeTime: string,
    tag: string,
    orderActivityCollection: Array<OrderActivity>,
    replacingOrderCollection: Array<Order>,
    childOrderStrategies: Array<Order>,
    statusDescription: string,
} // Order
