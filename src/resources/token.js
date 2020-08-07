'use strict'

function authorize(authorizationCode) {
    return this.axios
        .post('/oauth2/token', {
            grant_type: 'authorization_code',
            access_type: this.config.accessType || 'offline',
            client_id: `${this.config.apiKey}@AMER.OAUTHAP`,
            redirect_uri: this.config.redirectUri,
            code: authorizationCode || this.config.authorizationCode,
        })
        .then(res => {
            this.config.accessToken = res.data.access_token
            this.config.refreshToken = res.data.refresh_token
            return res
        })
} // authorize()

function refresh(refreshToken) {
    return this.axios
        .post('/oauth2/token', {
            grant_type: 'refresh_token',
            access_type: this.config.accessType || 'offline',
            client_id: `${this.config.apiKey}@AMER.OAUTHAP`,
            refresh_token: refreshToken || this.config.refreshToken,
        })
        .then(res => {
            this.config.accessToken = res.data.access_token
            this.config.refreshToken = res.data.refresh_token
            return res
        })
} // refresh()

module.exports = {
    authorize,
    refresh,
}
