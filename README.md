# TD Ameritrade Library for Node.js

Free, open-source Node.js client for the [TD Ameritrade Trading Platform](https://www.tdameritrade.com).


---

**WARNING**
This library is still in its early stages of development and thus far from ready for production use.

---


## Status
There are 3 interfaces available:
* `TDAmeritrade` - the main API interface.
* `TDAccount` - a helper interface to ease the use of account specific functions.
* `TDStreamer` - the data streaming interface.

The API client is very close to being complete. All documented API methods have been implemented and I do not expect to introduce any breaking changes for the time being. I'd say feel free to give it a spin.

The data streaming interface implements most of what the documentation talks about. The only (documented) services that have not been implemented yet are the Actives, the Level 1 & 2 data and the Chart Futures History. I do expect breaking changes to be introduced to this interfaces. Mainly to the user provided config and the events.

An attempt to provide typescript definitions is also in progress.

## Installing

Using npm:
```sh
$ npm install @knicola/tdameritrade
```

Using yarn:
```sh
$ yarn add @knicola/tdameritrade
```

## Usage

```js
const { TDAmeritrade, TDAccount, TDStreamer } = require('@knicola/tdameritrade')
const config = {
    accessToken: 'access_token',
    apiKey: 'testClientId' // `@AMER.OAUTHAP` suffix is not required
}

// main api interface
const api = new TDAmeritrade(config)
const accounts = await api.getAccounts()
api.getOrders(accounts[0].accountId).then( ... )

// account specific interface
const account = new TDAccount(accounts[0].accountId, config)
account.getOrders().then( ... )

// data streamer
const userPrincipals = api.getUserPrincipals(['streamerSubscriptionKeys', 'streamerConnectionInfo'])
const streamer = new TDStreamer(userPrincipals)
streamer.on('authenticated', () => streamer.subsChartEquity('SPY'))
streamer.on('chart', data => {
    // ..
})
streamer.connect()
```


## Development

Official API documentation can be found here: https://developer.tdameritrade.com/apis

Generate an SSL certificate and place it in the root folder before running any tests:
```sh
$ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout selfsigned.key -out selfsigned.crt -batch
```

For live tests create an access token:
- [Register for a developer's account](https://developer.tdameritrade.com/user/register) and [add a new app](https://developer.tdameritrade.com/user/me/apps/add).
- Copy `.env.example` to `.env` and fill in the `CLIENT_ID` var with the app's `Consumer Key`.
- Run `npm run authorize` and login with your regular TD Ameritrade account.


### NPM Scripts

| Command                   | Description                                                                       |
|---------------------------|-----------------------------------------------------------------------------------|
| `npm test`                | Run test suites                                                                   |
| `npm run lint`            | Run linting rules                                                                 |
| `npm run coverage`        | Generate coverage report                                                          |
| `npm run build`           | Bundle the project for browser use                                                |
| `npm run authorize`       | Run oauth and get an access token for testing (saves the token for later use)     |
| `npm run refresh_token`   | Refresh the oauth access token (also saves the new token)                         |
| `npm run user_principals` | Get the user principals object used to authenticate to the json streaming service |


## License

This project is open-sourced software licensed under the [MIT license](./LICENSE).
