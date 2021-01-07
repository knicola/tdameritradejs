import { AxiosInstance } from "axios"

export class Base {
    constructor(config: object)

    axios: AxiosInstance

    on(eventName:'login'|'token', fn): void
    authorize(): Promise<any>
    login(): Promise<any>

    isAccessTokenExpired(): boolean
    isRefreshTokenExpired(): boolean
    getAccessToken(authCode?): Promise<any>
    refreshAccessToken(refreshToken?): Promise<any>
} // base()
