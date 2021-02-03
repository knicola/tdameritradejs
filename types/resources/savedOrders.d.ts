/**
 * Get saved order by its ID, for a specific account.
 *
 * @memberof TDAmeritrade
 * @param accountId The account id
 * @param savedOrderId The saved order id
 * @returns The saved order details
 */
export function getSavedOrder(accountId: string, savedOrderId: string): Promise<any>;
/**
 * Get saved orders for a specific account.
 *
 * @memberof TDAmeritrade
 * @param accountId The account id
 * @returns List of saved orders
 */
export function getSavedOrders(accountId: string): Promise<any>;
/**
 * Save an order for a specific account.
 *
 * @memberof TDAmeritrade
 * @param accountId The account id
 * @param savedOrder The saved order
 * @returns Success
 *
 * @example
 * await td.createSavedOrder('45678', {
 *     complexOrderStrategyType: 'NONE',
 *     orderType: 'LIMIT',
 *     session: 'NORMAL',
 *     price: '6.45',
 *     duration: 'DAY',
 *     orderStrategyType: 'SINGLE',
 *     orderLegCollection: [
 *         {
 *             instruction: 'BUY_TO_OPEN',
 *             quantity: 10,
 *             instrument: {
 *                 symbol: 'XYZ_032015C49',
 *                 assetType: 'OPTION'
 *             }
 *         }
 *     ]
 * })
 */
export function createSavedOrder(accountId: string, savedOrder: object): Promise<any>;
/**
 * Replace an existing saved order for an account. The existing saved order will be replaced by the new order.
 *
 * @memberof TDAmeritrade
 * @param accountId The account id
 * @param savedOrderId The saved order id
 * @param savedOrder The new saved order
 * @returns Success
 */
export function replaceSavedOrder(accountId: string, savedOrderId: string, savedOrder: object): Promise<any>;
/**
 * Delete a specific saved order for a specific account.
 *
 * @memberof TDAmeritrade
 * @param accountId The account id
 * @param savedOrderId The saved order id
 * @returns Success
 *
 * @example
 * await td.deleteSavedOrder('45678', '98754')
 */
export function deleteSavedOrder(accountId: string, savedOrderId: string): Promise<any>;
