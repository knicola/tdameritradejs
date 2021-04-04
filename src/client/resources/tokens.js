'use strict'

/**
 * Get the access token along with an optional refresh token.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} authCode The authorization code
 * @returns {Promise<any>} The token details
 *
 * @example
 * const token = await td.getAccessToken('authorization-code-goes-here')
 */
function getAccessToken(authCode) {
    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('access_type', this.config.accessType || 'offline')
    params.append('client_id', this.config.apiKey)
    params.append('redirect_uri', this.config.redirectUri)
    params.append('code', authCode || this.config.authCode)

    delete this.config.accessToken

    return this.axios.post('/oauth2/token', params)
} // getAccessToken()

/**
 * Refresh the access token.
 *
 * @instance
 * @memberof TDAmeritrade
 * @param {string} [refreshToken] The refresh token
 * @param {bool} [createNewRefreshToken] True to create both access token and refresh token. False to create access token only.
 * @returns {Promise<any>} The token details
 *
 * @example
 * const token = await td.refreshAccessToken('refresh-token-goes-here', false)
 */
function refreshAccessToken(refreshToken, createNewRefreshToken) {
    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token')
    if(true === createNewRefreshToken) {
        params.append('access_type', this.config.accessType || 'offline')
    }
    params.append('client_id', this.config.apiKey)
    params.append('refresh_token', refreshToken || this.config.refreshToken)

    delete this.config.accessToken

    return this.axios.post('/oauth2/token', params)
} // refreshAccessToken()

/**
 * Determine if access token is expired.
 *
 * @instance
 * @memberof TDAmeritrade
 * @returns {boolean} True if expired, otherwise false
 */
function isAccessTokenExpired() {
    return new Date(this.config.accessTokenExpiresAt).getTime() <= Date.now()
} // isAccessTokenExpired()

/**
 * Determine if refresh token is expired one day from now. We must use a valid refresh
 * token to get new refresh and access tokens so we cannot wait for it to expire.
 *
 * @instance
 * @memberof TDAmeritrade
 * @returns {boolean} True if expired, otherwise false
 */
function isRefreshTokenExpired() {
    const expiration = new Date(this.config.refreshTokenExpiresAt)
    expiration.setDate(expiration.getDate() - 1)
    return expiration.getTime() <= Date.now()
} // isRefreshTokenExpired()

module.exports = {
    getAccessToken,
    refreshAccessToken,
    isAccessTokenExpired,
    isRefreshTokenExpired,
}
