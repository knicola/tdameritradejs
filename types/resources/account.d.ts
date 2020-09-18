import { Equity, FixedIncome, MutualFund, Order, CashEquivalent, Option } from "./order";

export interface SecuritiesAccount {
    securitiesAccount: Account
}

export interface Account {
    type: 'CASH' | 'MARGIN',
    accountId: string,
    roundTrips: number,
    isDayTrader: boolean,
    isClosingOnlyRestricted: boolean,
    positions: Positions,
    orderStrategies: Order[],
    initialBalances: BalanceSheet,
    currentBalances: BalanceSheet,
    projectedBalances: BalanceSheet,
}

export interface Positions {
    shortQuantity: number,
    averagePrice: number,
    currentDayProfitLoss: number,
    currentDayProfitLossPercentage: number,
    longQuantity: number,
    settledLongQuantity: number,
    settledShortQuantity: number,
    agedQuantity: number,
    instrument: Equity | FixedIncome | MutualFund | CashEquivalent | Option,
    marketValue: number
}

export interface BalanceSheet {
    accruedInterest: number,
    availableFundsNonMarginableTrade: number,
    bondValue: number,
    buyingPower: number,
    cashBalance: number,
    cashAvailableForTrading: number,
    cashReceipts: number,
    dayTradingBuyingPower: number,
    dayTradingBuyingPowerCall: number,
    dayTradingEquityCall: number,
    equity: number,
    equityPercentage: number,
    liquidationValue: number,
    longMarginValue: number,
    longOptionMarketValue: number,
    longStockValue: number,
    maintenanceCall: number,
    maintenanceRequirement: number,
    margin: number,
    marginEquity: number,
    moneyMarketFund: number,
    mutualFundValue: number,
    regTCall: number,
    shortMarginValue: number,
    shortOptionMarketValue: number,
    shortStockValue: number,
    totalCash: number,
    isInCall: boolean,
    unsettledCash: number,
    pendingDeposits: number,
    marginBalance: number,
    shortBalance: number,
    accountValue: number,
}

export interface Preferences {
    expressTrading: boolean,
    directOptionsRouting: boolean,
    directEquityRouting: boolean,
    defaultEquityOrderLegInstruction: 'BUY' | 'SELL' | 'BUY_TO_COVER' | 'SELL_SHORT' | 'NONE',
    defaultEquityOrderType: 'MARKET' | 'LIMIT' | 'STOP' | 'STOP_LIMIT' | 'TRAILING_STOP' | 'MARKET_ON_CLOSE' | 'NONE',
    defaultEquityOrderPriceLinkType: 'VALUE' | 'PERCENT' | 'NONE',
    defaultEquityOrderDuration: 'DAY' | 'GOOD_TILL_CANCEL' | 'NONE',
    defaultEquityOrderMarketSession: 'AM' | 'PM' | 'NORMAL' | 'SEAMLESS' | 'NONE',
    defaultEquityQuantity: number,
    mutualFundTaxLotMethod: 'FIFO' | 'LIFO' | 'HIGH_COST' | 'LOW_COST' | 'MINIMUM_TAX' | 'AVERAGE_COST' | 'NONE',
    optionTaxLotMethod: 'FIFO' | 'LIFO' | 'HIGH_COST' | 'LOW_COST' | 'MINIMUM_TAX' | 'AVERAGE_COST' | 'NONE',
    equityTaxLotMethod: 'FIFO' | 'LIFO' | 'HIGH_COST' | 'LOW_COST' | 'MINIMUM_TAX' | 'AVERAGE_COST' | 'NONE',
    defaultAdvancedToolLaunch: 'TA' | 'N' | 'Y' | 'TOS' | 'NONE' | 'CC2',
    authTokenTimeout: 'FIFTY_FIVE_MINUTES' | 'TWO_HOURS' | 'FOUR_HOURS' | 'EIGHT_HOURS'
}
