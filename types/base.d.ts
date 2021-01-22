import { AxiosInstance } from "axios"

export class Base {
    constructor(config: object)

    axios: AxiosInstance

    on(eventName:'login'|'token', fn): void
    /**
     * Bootstrap a local web server for oauth2 authorization. Will request
     * access token and update config if authorization is successful.
     * @note Nodejs only.
     */
    authorize(): Promise<any>
    /**
     * Authorize or refresh the access token depending on whether
     * the access and/or refresh token exist and are not expired.
     * @note Nodejs only.
     */
    login(): Promise<any>
    /**
     * Determine if access token is expired.
     * @returns True if expired, otherwise false
     */
    isAccessTokenExpired(): boolean
    /**
     * Determine if refresh token is expired.
     * @returns True if expired, otherwise false
     */
    isRefreshTokenExpired(): boolean
    /**
     * Get an access token.
     * @param authCode The authentication code
     */
    getAccessToken(authCode?): Promise<any>
    /**
     * Get a new access token using the refresh token.
     * @param refreshToken The refresh token
     */
    refreshAccessToken(refreshToken?): Promise<any>
} // base()
