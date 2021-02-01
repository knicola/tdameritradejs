/**
 * Get the access token along with an optional refresh token.
 *
 * @memberof TDAmeritrade
 * @memberof TDAccount
 * @param {string} authCode The authorization code
 * @returns {Promise<any>} The token details
 *
 * @example
 * const token = await td.getAccessToken('authorization-code-goes-here')
 */
export function getAccessToken(authCode: string): Promise<any>;
/**
 * Refresh the access token.
 *
 * @memberof TDAmeritrade
 * @memberof TDAccount
 * @param {string} [refreshToken] The refresh token
 * @returns {Promise<any>} The token details
 *
 * @example
 * const token = await td.refreshAccessToken('refresh-token-goes-here')
 */
export function refreshAccessToken(refreshToken?: string): Promise<any>;
/**
 * Determine if access token is expired.
 *
 * @memberof TDAmeritrade
 * @memberof TDAccount
 * @returns {boolean} True if expired, otherwise false
 */
export function isAccessTokenExpired(): boolean;
/**
 * Determine if refresh token is expired.
 *
 * @memberof TDAmeritrade
 * @memberof TDAccount
 * @returns {boolean} True if expired, otherwise false
 */
export function isRefreshTokenExpired(): boolean;
