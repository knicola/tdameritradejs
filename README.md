# TD Ameritrade Library for Node.js

Free, open-source Node.js client for the [TD Ameritrade Trading Platform](https://www.tdameritrade.com).


---

**WARNING**
This library is still in its early stages of development and thus far from ready for production use.

---


## Status

The main API client is more or less complete. It provides two interfaces `TDAmeritrade`, which is the main api interface, and `TDAccount` to help target a specific account rather than passing `accountId` as a parameter all the time.

A third interface (`TDStreamer`) is also in the works, but far from being complete. This interface will be used to subscribe to TD Ameritrade's data streaming service.

An attempt to provide typescript definitions is also in progress.


## Usage

```js
const { TDAmeritrade, TDAccount, TDStreamer } = require('./src')
const config = {
    accessToken: 'access_token',
    apiKey: 'testClientId@AMER.OAUTHAP'
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
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout selfsigned.key -out selfsigned.crt -batch
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
