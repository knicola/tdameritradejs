'use strict'

/**
 * @typedef {object} Config
 * @property {string} [baseURL="https://api.tdameritrade.com/v1"] TD Ameritrade's API URL
 * @property {string} [apiKey] The API key (Client ID) provided by TD Ameritrade
 * @property {boolean} [refreshAndRetry=true] Refresh token and retry request if a 401 response is received
 * @property {boolean} [returnFullResponse=false] Return the full axios response instead of only the data
 * @property {string} [accessToken] The OAuth2 access token
 * @property {string} [refreshToken] The OAuth2 refresh token
 * @property {string} [accessTokenExpiresAt] The access token's date and time of expiration
 * @property {string} [refreshTokenExpiresAt] The refresh token's date and time of expiration
 * @property {string} [redirectUri="https://localhost:8443"] The local uri to receive the access code from TD Ameritrade's OAuth2
 * @property {string} [sslKey] The path to your private SSL key
 * @property {string} [sslCert] The path to your public SSL key
 */
/**
 * @type {Config}
 */
const config = {
    baseURL: 'https://api.tdameritrade.com/v1',
    refreshAndRetry: true,
    returnFullResponse: false,
    redirectUri: 'https://localhost:8443',
}

module.exports = config
