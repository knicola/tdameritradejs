# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
## [0.6.0] - 2022-01-19
### Added
* Level one options capability. See [#38](https://github.com/knicola/tdameritradejs/pull/38) by [@ryanblenis](https://github.com/ryanblenis)
* Method `getPositions()` to client. See [#40](https://github.com/knicola/tdameritradejs/pull/40) by [@kevinsherman](https://github.com/kevinsherman)
* Optional fields, positions and orders, to `getAccount()` and `getAccounts()`.
### Changed
* **[Breaking]** Return error response body instead of AxiosError. See [#27](https://github.com/knicola/tdameritradejs/pull/27) by [@marknokes](https://github.com/marknokes)

## [0.5.1] - 2021-03-21
### Added
* Missing `frequency` jsdoc property in `getPriceHistory()`.

### Changed 
* `frequencyType` jsdoc property values in `getPriceHistory()`. Thank you [@kevinsherman](https://github.com/kevinsherman)!

## [0.5.0] - 2021-02-09
### Added
* Jsdoc comments everywhere 🎉.
* API documentation. See [API.md](API.md).
* Script to generate API documentation from jsdoc comments.
* Script to generate type declarations from jsdoc comments.
* Dev dependencies:
  * @rollup/plugin-babel: 5.2.3
  * @rollup/plugin-commonjs: 17.1.0
  * @rollup/plugin-json: 4.1.0
  * @rollup/plugin-node-resolve: 11.1.1
  * @types/ws: 7.4.0
  * eslint-plugin-jsdoc: 31.6.0
  * jsdoc: 3.6.6
  * jsdoc-to-markdown: 6.0.1
  * jsdoc-ts-utils: 1.1.2
  * change-case: 4.1.2

### Changed
* Rewired a lot of parts of the api client to allow for a cleaner file structure. Everything works just as before with
  the exception of `TDAccount` and `TDStreamer` interfaces, which have been moved back to the main module.
* Improved type declarations. See [index.d.ts](types/index.d.ts).
* Fixed browser distribution.
* Fixed bug with `td.streamer()` not being able to retrieve `userPrincipals` correctly when enabling the full axios
  response option. Thanks to [@kjanoudi](https://github.com/kjanoudi) for catching this!
* Moved `debug` package from `devDependencies` to `dependencies`.
* Bump `ws` from 7.4.2 to 7.4.3

## [0.4.1] - 2021-01-07
### Added
* Rollup dev dependency to build a browser distribution. See `dist/index.min.js`.

### Changed
* Bump `axios` from 0.19.2 to 0.21.1
* Bump `axios-mock-adapter` from 1.18.2 to 1.19.0
* Bump `debug` from 4.2.0 to 4.3.1

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
