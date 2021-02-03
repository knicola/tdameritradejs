export type Preferences = {
    /**
     * Express trading
     */
    expressTrading: boolean;
    /**
     * Default equity order leg instruction
     */
    defaultEquityOrderLegInstruction: 'BUY' | 'SELL' | 'BUY_TO_COVER' | 'SELL_SHORT' | 'NONE';
    /**
     * Default order type
     */
    defaultEquityOrderType: 'MARKET' | 'LIMIT' | 'STOP' | 'STOP_LIMIT' | 'TRAILING_STOP' | 'MARKET_ON_CLOSE' | 'NONE';
    /**
     * Default equity order price link type
     */
    defaultEquityOrderPriceLinkType: 'VALUE' | 'PERCENT' | 'NONE';
    /**
     * Default equity order duration
     */
    defaultEquityOrderDuration: 'DAY' | 'GOOD_TILL_CANCEL' | 'NONE';
    /**
     * Default equity order market session
     */
    defaultEquityOrderMarketSession: 'AM' | 'PM' | 'NORMAL' | 'SEAMLESS' | 'NONE';
    /**
     * Default equity quantity
     */
    defaultEquityQuantity: number;
    /**
     * Mutual fund taxlot method
     */
    mutualFundTaxLotMethod: 'FIFO' | 'LIFO' | 'HIGH_COST' | 'LOW_COST' | 'MINIMUM_TAX' | 'AVERAGE_COST' | 'NONE';
    /**
     * Option taxlot method
     */
    optionTaxLotMethod: 'FIFO' | 'LIFO' | 'HIGH_COST' | 'LOW_COST' | 'MINIMUM_TAX' | 'AVERAGE_COST' | 'NONE';
    /**
     * Equity taxlot method
     */
    equityTaxLotMethod: 'FIFO' | 'LIFO' | 'HIGH_COST' | 'LOW_COST' | 'MINIMUM_TAX' | 'AVERAGE_COST' | 'NONE';
    /**
     * Default advanced tool launch
     */
    defaultAdvancedToolLaunch: 'TA' | 'N' | 'Y' | 'TOS' | 'NONE' | 'CC2';
    /**
     * Auth token timeout
     */
    authTokenTimeout: 'FIFTY_FIVE_MINUTES' | 'TWO_HOURS' | 'FOUR_HOURS' | 'EIGHT_HOURS';
};
export type UserPrincipalFields = "streamerSubscriptionKeys" | "streamerConnectionInfo" | "preferences" | "surrogateIds";
/**
 * Get account balances, positions, and orders for all linked accounts.
 *
 * @memberof TDAmeritrade
 * @returns List of all accounts
 *
 * @example
 * const accounts = await td.getAccounts()
 */
export function getAccounts(): Promise<any>;
/**
 * Get account balances, positions, and orders for a specific account.
 *
 * @memberof TDAmeritrade
 * @param accountId The account id
 * @returns The requested account
 *
 * @example
 * const acctInfo = await td.getAccount('45678')
 */
export function getAccount(accountId: string): Promise<any>;
/**
 * Get preferences for a specific account.
 *
 * @memberof TDAmeritrade
 * @param accountId The account id
 * @returns The account preferences
 *
 * @example
 * const prefs = await td.getPreferences('45678')
 */
export function getPreferences(accountId: string): Promise<any>;
/**
 * Update preferences for a specific account. The `directOptionsRouting` and
 * `directEquityRouting` values cannot be modified via this operation.
 *
 * @memberof TDAmeritrade
 * @param accountId The account id
 * @param preferences The updated preferences
 * @returns Success
 */
export function updatePreferences(accountId: string, preferences: Preferences): Promise<any>;
/**
 * Get the SubscriptionKey for provided accounts or default accounts.
 *
 * @memberof TDAmeritrade
 * @param accountIds The account id(s)
 * @returns The susbscription keys
 *
 * @example
 * const subsKeys = await td.getStreamerSubscriptionKeys('45678')
 */
export function getStreamerSubscriptionKeys(accountIds?: string | string[]): Promise<any>;
/**
 * Get user principal details.
 *
 * @memberof TDAmeritrade
 * @param fields Fields to include
 * @returns User principal details
 *
 * @example
 * const usrPrinc = await td.getUserPrincipals()
 * // OR
 * const usrPrinc = await td.getUserPrincipals('streamerSubscriptionKeys')
 * // OR
 * const usrPrinc = await td.getUserPrincipals(['streamerSubscriptionKeys', 'streamerConnectionInfo'])
 */
export function getUserPrincipals(fields?: UserPrincipalFields | UserPrincipalFields[]): Promise<any>;
