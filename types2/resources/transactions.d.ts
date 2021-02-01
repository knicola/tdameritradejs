export type TransactionQuery = {
    /**
     * Only transactions with the specified type will be returned.
     */
    type: 'ALL' | 'TRADE' | 'BUY_ONLY' | 'SELL_ONLY' | 'CASH_IN_OR_CASH_OUT' | 'CHECKING' | 'DIVIDEND' | 'INTEREST' | 'OTHER' | 'ADVISOR_FEES';
    /**
     * Only transactions with the specified symbol will be returned.
     */
    symbol: string;
    /**
     * Only transactions after the Start Date will be returned.
     * Note: The maximum date range is one year. Valid ISO-8601 formats are: `yyyy-MM-dd`.
     */
    startDate: string;
    /**
     * Only transactions before the End Date will be returned.
     * Note: The maximum date range is one year. Valid ISO-8601 formats are: `yyyy-MM-dd`.
     */
    endDate: string;
};
/**
 * Get a transaction for a specific account.
 *
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} transactionId The transaction id
 * @returns {Promise<any>} The transaction details
 *
 * @example
 * const transaction = await td.getTransaction('45678', '98754')
 */
export function getTransaction(accountId: string, transactionId: string): Promise<any>;
/**
 * @typedef TransactionQuery
 * @property {'ALL'|'TRADE'|'BUY_ONLY'|'SELL_ONLY'|'CASH_IN_OR_CASH_OUT'
 *   |'CHECKING'|'DIVIDEND'|'INTEREST'|'OTHER'|'ADVISOR_FEES'
 * } type Only transactions with the specified type will be returned.
 * @property {string} symbol Only transactions with the specified symbol will be returned.
 * @property {string} startDate Only transactions after the Start Date will be returned.
 * Note: The maximum date range is one year. Valid ISO-8601 formats are: `yyyy-MM-dd`.
 * @property {string} endDate Only transactions before the End Date will be returned.
 * Note: The maximum date range is one year. Valid ISO-8601 formats are: `yyyy-MM-dd`.
 */
/**
 * Get all transactions for a specific account.
 *
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {TransactionQuery} params The query parameters
 * @returns {Promise<any>} The transaction history
 *
 * @example
 * const transactions = await td.getTransactions('45678', {
 *     symbol: 'SPY',
 *     startDate: '2021-01-01',
 *     endDate: '2021-01-31',
 * })
 */
export function getTransactions(accountId: string, params: TransactionQuery): Promise<any>;
