export interface Transaction {
    type: 'TRADE' | 'RECEIVE_AND_DELIVER' | 'DIVIDEND_OR_INTEREST' | 'ACH_RECEIPT' | 'ACH_DISBURSEMENT' | 'CASH_RECEIPT' | 'CASH_DISBURSEMENT' | 'ELECTRONIC_FUND' | 'WIRE_OUT' | 'WIRE_IN' | 'JOURNAL' | 'MEMORANDUM' | 'MARGIN_CALL' | 'MONEY_MARKET' | 'SMA_ADJUSTMENT',
    clearingReferenceNumber: string,
    subAccount: string,
    settlementDate: string,
    orderId: string,
    sma: number,
    requirementReallocationAmount: number,
    dayTradeBuyingPowerEffect: number,
    netAmount: number,
    transactionDate: string,
    orderDate: string,
    transactionSubType: string,
    transactionId: number,
    cashBalanceEffectFlag: boolean,
    description: string,
    achStatus: 'Approved' | 'Rejected' | 'Cancel' | 'Error',
    accruedInterest: number,
    fees: object,
    transactionItem: {
        accountId: number,
        amount: number,
        price: number,
        cost: number,
        parentOrderKey: number,
        parentChildIndicator: string,
        instruction: string,
        positionEffect: string,
        instrument: {
            symbol: string,
            underlyingSymbol: string,
            optionExpirationDate: string,
            optionStrikePrice: number,
            putCall: string,
            cusip: string,
            description: string,
            assetType: string,
            bondMaturityDate: string,
            bondInterestRate: number
        }
    }
}

export type TransactionType =
    |'ALL'
    |'TRADE'
    |'BUY_ONLY'
    |'SELL_ONLY'
    |'CASH_IN_OR_CASH_OUT'
    |'CHECKING'
    |'DIVIDEND'
    |'INTEREST'
    |'OTHER'
    |'ADVISOR_FEES'

export interface TransactionQuery {
    /**
     * Only transactions with the specified type will be returned.
     */
    type: TransactionType,
    /**
     * Only transactions with the specified symbol will be returned.
     */
    symbol: string,
    /**
     * Only transactions after the Start Date will be returned.
     * Note: The maximum date range is one year. Valid ISO-8601 formats are: `yyyy-MM-dd`.
     */
    startDate: string,
    /**
     * Only transactions before the End Date will be returned.
     * Note: The maximum date range is one year. Valid ISO-8601 formats are: `yyyy-MM-dd`.
     */
    endDate: string,
}
