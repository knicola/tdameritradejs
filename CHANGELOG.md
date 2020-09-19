# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.4.0] - 2020-09-19
### Added
* `TDAmeritrade.isAccessTokenExpired(): boolean` to determine whether the access token is expired or not. Will return true if no access token exists.
* `TDAmeritrade.isRefreshTokenExpired(): boolean` to determine whether the refresh token is expired or not. Will return true if no refresh token exists.
* `TDAmeritrade.authorize(): Promise` to bootstrap a local web server for oauth2 authorization. Will request access token and update config if authorization is successful.
* `TDAmeritrade.login(): Promise` to automatically authorize or refresh the access token depending on whether the access and/or refresh token exist and are not expired. Depends on `.authorize()`, `.getAccessToken()`, `.refreshAccessToken()`, `.isAccessTokenExpired()` and `.isRefreshTokenExpired()`.
* `TDAmeritrade.on(eventName:'login'|'token')` to subscribe to events. The `login` event fires once `.authorize()` is done bootstrapping the local web server and provides a `url` argument which can be used to authorize our td app. The `token` event fires everytime the access token is renewed, by either using `.getAccessToken()` or `.refreshAccessToken()`, and provides a `token` argument containing the newly received token info.
* `TDAmeritrade.streamer(): Promise<TDStreamer>` to help instantiate a new `TDStreamer` instance. Depends on `.getUserPrincipals()`.
* `TDAmeritrade.account(accountId:string): TDAccount` to help instantiate a new `TDAccount` instance. A reference to the `TDAmeritrade.config` will be passed on to the `TDAccount` instance. This helps keep access token updates in sync.
* `TDAmeritrade.config.refreshAndRetry: boolean` (default: true) option to automatically refresh the access token on a 401 response and retry the request. This will also update the config with the newly received token.
* `TDAmeritrade.config.sslKey: string` option to hold the path to the ssl key file.
* `TDAmeritrade.config.sslCert: string` option to hold the path to the ssl certificate file.

### Changed
* Renamed `TDAmeritrade.authenticate()` to `TDAmeritrade.getAccessToken()`.
* Renamed `TDAmeritrade.refreshToken()` to `TDAmeritrade.refreshAccessToken()`.
* Moved `TDStreamer` from exports to `TDAmeritrade.TDStreamer`.
* Moved `TDAccount` from exports to `TDAmeritrade.TDAccount`.
* Test suites from using an http and websocket server to completely use mocks. Only `node.spec.js` test suite runs a live http server during testing on port `8443` and uses a pre-generated self-signed ssl certificate, found in `./tests/setup/`.

### Removed
* The npm scripts used for oauth2 authorization and token retrieval. Use the `TDAmeritrade.login()` method now instead.
