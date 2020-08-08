'use strict'

function authenticate(authCode) {
    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('access_type', this.config.accessType || 'offline')
    params.append('client_id', this.config.apiKey)
    params.append('redirect_uri', this.config.redirectUri)
    params.append('code', authCode || this.config.authCode)

    delete this.config.accessToken

    return this.axios
        .post('/oauth2/token', params)
        .then(res => {
            const data = this.config.returnFullResponse ? res.data : res
            this.config.accessToken = data.access_token
            this.config.refreshToken = data.refresh_token
            return res
        })
} // authenticate()

function refreshToken(refreshToken) {
    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token')
    params.append('access_type', 'offline')
    params.append('client_id', this.config.apiKey)
    params.append('refresh_token', refreshToken || this.config.refreshToken)

    delete this.config.accessToken

    return this.axios
        .post('/oauth2/token', params)
        .then(res => {
            const data = this.config.returnFullResponse ? res.data : res
            this.config.accessToken = data.access_token
            this.config.refreshToken = data.refresh_token
            return res
        })
} // refreshToken()

module.exports = {
    authenticate,
    refreshToken,
}
