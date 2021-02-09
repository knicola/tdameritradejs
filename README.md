# TD Ameritrade Library for Node.js

Free, open-source Node.js client for the [TD Ameritrade Trading Platform](https://www.tdameritrade.com).


---

**WARNING**
This library is still in its early stages of development and thus far from ready for production use.

---


## Status

For details concerning the latest update please read the [CHANGELOG](./CHANGELOG.md).

The API client is very close to being complete. All documented API methods have been implemented.

The data streamer implements most of what the documentation talks about *except* Actives, Level 1 Options and Level 2 order book. Documentation also mentions services `NEWS_STORY` and `NEWS_HEADLINE_LIST` but does not provide any information.

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

## API
See [API Docs](API.md) file.

## Usage

In order to use TD Ameritrade's API services you will need a `Consumer Key` (also called `Client ID` and `API Key`). To get one first create a [developer account](https://developer.tdameritrade.com/user/register) and [add a new app](https://developer.tdameritrade.com/user/me/apps/add). The key will be listed under the newly created app.


#### Node.js

[SSL certificate](#Generate-SSL-Certificate) is required for oauth2 authorization.

```js
const { TDAmeritrade } = require('@knicola/tdameritrade')

const td = new TDAmeritrade({
    apiKey: 'your-consumer-key',
    redirectUri: 'https://localhost:8443',
    sslKey: 'path/to/selfsigned.key',
    sslCert: 'path/to/selfsigned.crt',
})

// event will fire once the local web server
// is ready for the oauth2 authorization.
td.on('login', url => {
    // use this to print the td oauth2 url to console
    // or to open the url directly in the browser.
    console.log(url)
})

// event will fire every time the token is renewed.
td.on('token', token => {
    // use this to know when a new access token is
    // issued or to save the token to a file.
    console.log(token)
})

// an all-in-one entry point which will determine
// whether authorization is required or, if the
// access token expired, whether to renew it.
td.login().then(async () => {
    const { candles } = await td.getPriceHistory('SPY')
    console.log(candles)

    // the websocket interface will be instantiated automatically.
    // for now, it will choose the first available account.
    const streamer = await td.streamer()
    // you could also choose to instantiate it
    // manually with `new td.TDStreamer(...)`

    // event will trigger once the streaming client is
    // connected *and* authenticated to the server.
    streamer.on('authenticated', () => {
        // we can now interact with the server
        streamer.subsChartEquity('SPY')
    })

    // event will trigger everytime the streaming server
    // sends us a new candle (that is every minute).
    streamer.on('chart', data => {
        console.log(data)
        // choose to save the data or determine
        // whether to place a buy/sell order.
        td.placeOrder({ ... }).then(res => {
            // ...
        })
    })

    // connect to the streaming server
    streamer.connect()
})
```

#### Browser

The `.login()` and `.authorize()` methods are not available in the browser since they depend on Node.js specific modules. Either the authorization code or the issued access and refresh token will have to be provided by the server hosting the website.

Authorization code:
```js
const { TDAmeritrade } = require('@knicola/tdameritrade')
const td = new TDAmeritrade()
const authCode = 'provided by the server'

// the config will update automatically
// with the access and refresh token.
await td.getAccessToken(authCode)

const { candles } = await td.getPriceHistory('SPY')
```
Access and Refresh token:
```js
const { TDAmeritrade } = require('@knicola/tdameritrade')

// provided by the server
const token = {
    apiKey: 'your-consumer-key',
    accessToken: 'your-access-token',
    refreshToken: 'your-refresh_token',
    accessTokenExpiresAt: '2020-01-01T01:31:01.000Z',
    refreshTokenExpiresAt: '2020-03-31T01:01:01.000Z',
}

const td = new TDAmeritrade(token)

const { candles } = await td.getPriceHistory('SPY')
```

## Generate SSL Certificate

In most cases, a self-signed certificate will be enough. You can generate one using `openssl`:

```sh
$ openssl req -x509 -nodes -newkey rsa:2048 -keyout selfsigned.key -out selfsigned.crt -batch

# OR

$ openssl req -x509 -newkey rsa:2048 -nodes -sha256 -out selfsigned.crt -keyout selfsigned.key \
-subj '/CN=localhost' -extensions EXT -config <( \
printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

## License

This project is open-sourced software licensed under the [MIT license](./LICENSE).
