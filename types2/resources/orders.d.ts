export type OrderStatus = "AWAITING_PARENT_ORDER" | "AWAITING_CONDITION" | "AWAITING_MANUAL_REVIEW" | "ACCEPTED" | "AWAITING_UR_OUT" | "PENDING_ACTIVATION" | "QUEUED" | "WORKING" | "REJECTED" | "PENDING_CANCEL" | "CANCELED" | "PENDING_REPLACE" | "REPLACED" | "FILLED" | "EXPIRED";
export type OrdersQuery = {
    /**
     * The max number of orders to retrieve.
     */
    maxResults?: number;
    /**
     * Specifies that no orders entered before this time should be returned. Valid
     * ISO-8601 formats are: `yyyy-MM-dd`. Date must be within 60 days from today's date. `toEnteredTime` must also be set.
     */
    fromEnteredTime?: string;
    /**
     * Specifies that no orders entered after this time should be returned. Valid
     * ISO-8601 formats are: `yyyy-MM-dd`. `fromEnteredTime` must also be set.
     */
    toEnteredTime?: string;
    /**
     * Specifies that only orders of this status should be returned.
     */
    status?: OrderStatus;
};
/**
 * Get a specific order for a specific account.
 *
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} orderId The order id
 * @returns {Promise<any>} The order details
 *
 * @example
 * const order = await td.getOrder('45678', '98745')
 */
export function getOrder(accountId: string, orderId: string): Promise<any>;
/**
 * @typedef {'AWAITING_PARENT_ORDER'|'AWAITING_CONDITION'|'AWAITING_MANUAL_REVIEW'
 *   |'ACCEPTED'|'AWAITING_UR_OUT'|'PENDING_ACTIVATION'|'QUEUED'|'WORKING'
 *   |'REJECTED'|'PENDING_CANCEL'|'CANCELED'|'PENDING_REPLACE'|'REPLACED'
 *   |'FILLED'|'EXPIRED'
 * } OrderStatus
 */
/**
 * @typedef OrdersQuery
 * @property {number} [maxResults] The max number of orders to retrieve.
 * @property {string} [fromEnteredTime] Specifies that no orders entered before this time should be returned. Valid
 * ISO-8601 formats are: `yyyy-MM-dd`. Date must be within 60 days from today's date. `toEnteredTime` must also be set.
 * @property {string} [toEnteredTime] Specifies that no orders entered after this time should be returned. Valid
 * ISO-8601 formats are: `yyyy-MM-dd`. `fromEnteredTime` must also be set.
 * @property {OrderStatus} [status] Specifies that only orders of this status should be returned.
 */
/**
 * Get a list of orders for a specific account.
 *
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {OrdersQuery} params The query parameters
 * @returns {Promise<any>} List of orders
 *
 * @example
 *  const orders = await td.getOrders('45678', {
 *     fromEnteredTime: '2021-01-01',
 *     toEnteredTime: '2021-01-15',
 *     maxResults: 25,
 *     status: 'FILLED'
 * })
 */
export function getOrders(accountId: string, params: OrdersQuery): Promise<any>;
/**
 * Get a list of orders from all accounts.
 *
 * @memberof TDAmeritrade
 * @param {OrdersQuery} params The query parameters
 * @returns {Promise<any>} List of orders
 *
 * @example
 *  const orders = await td.getAllOrders({
 *     fromEnteredTime: '2021-01-01',
 *     toEnteredTime: '2021-01-15',
 *     maxResults: 25,
 *     status: 'FILLED'
 * })
 */
export function getAllOrders(params: OrdersQuery): Promise<any>;
/**
 * Place an order for a specific account.
 * Read {@link https://developer.tdameritrade.com/content/place-order-samples Place Order Samples} for more info.
 *
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {object} order The order
 * @returns {Promise<any>} Success
 *
 * @example
 * await td.placeOrder('45678', {
 *     orderType: 'MARKET',
 *     session: 'NORMAL',
 *     duration: 'DAY',
 *     orderStrategyType: 'SINGLE',
 *     orderLegCollection: [
 *         {
 *             instruction: 'Buy',
 *             quantity: 15,
 *             instrument: {
 *                 symbol: 'XYZ',
 *                 assetType: 'EQUITY'
 *             }
 *         }
 *     ]
 * })
 */
export function placeOrder(accountId: string, order: object): Promise<any>;
/**
 * Replace an existing order for an account. The existing order will be replaced by the new order.
 * Once replaced, the old order will be canceled and a new order will be created.
 *
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} orderId The order id
 * @param {object} order The new order
 * @returns {Promise<any>} Success
 */
export function replaceOrder(accountId: string, orderId: string, order: object): Promise<any>;
/**
 * Cancel a specific order for a specific account.
 *
 * @memberof TDAmeritrade
 * @param {string} accountId The account id
 * @param {string} orderId The order id
 * @returns {Promise<any>} Success
 *
 * @example
 * await td.cancelOrder('45678', '98745')
 */
export function cancelOrder(accountId: string, orderId: string): Promise<any>;
