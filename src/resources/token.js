'use strict'

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

function refreshAccessToken(refreshToken) {
    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token')
    params.append('access_type', this.config.accessType || 'offline')
    params.append('client_id', this.config.apiKey)
    params.append('refresh_token', refreshToken || this.config.refreshToken)

    delete this.config.accessToken

    return this.axios.post('/oauth2/token', params)
} // refreshAccessToken()

module.exports = {
    getAccessToken,
    refreshAccessToken,
}
