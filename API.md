# API Docs

**Index**
* [TDAmeritrade](#TDAmeritrade)
* [TDAccount](#TDAccount)
* [TDStreamer](#TDStreamer)
* [Type Definitions](#TypeDefinitions)


<br><a name="TDAmeritrade"></a>

## TDAmeritrade

TD Ameritrade API client



* [TDAmeritrade](#TDAmeritrade)
    * [new TDAmeritrade([config])](#new_TDAmeritrade_new)
    * [td.axios](#TDAmeritrade+axios) : <code>AxiosInstance</code>
    * [td.on(event, fn)](#TDAmeritrade+on) ⇒ <code>EventEmitter.&lt;(string\|symbol), any&gt;</code>
    * [td.getAccounts([fields])](#TDAmeritrade+getAccounts) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getAccount(accountId, [fields])](#TDAmeritrade+getAccount) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getPositions(accountId)](#TDAmeritrade+getPositions) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getPreferences(accountId)](#TDAmeritrade+getPreferences) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.updatePreferences(accountId, preferences)](#TDAmeritrade+updatePreferences) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getStreamerSubscriptionKeys([accountIds])](#TDAmeritrade+getStreamerSubscriptionKeys) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getUserPrincipals([fields])](#TDAmeritrade+getUserPrincipals) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getMarketHours(markets, date)](#TDAmeritrade+getMarketHours) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getMovers(index, direction, change)](#TDAmeritrade+getMovers) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getQuotes(symbols)](#TDAmeritrade+getQuotes) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getQuote(symbol)](#TDAmeritrade+getQuote) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getPriceHistory(symbol, params)](#TDAmeritrade+getPriceHistory) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getOptionChain(symbol, params)](#TDAmeritrade+getOptionChain) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.searchInstruments(symbol, projection)](#TDAmeritrade+searchInstruments) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getInstrument(cusip)](#TDAmeritrade+getInstrument) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.authorize()](#TDAmeritrade+authorize) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.login()](#TDAmeritrade+login) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getOrder(accountId, orderId)](#TDAmeritrade+getOrder) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getOrders(accountId, params)](#TDAmeritrade+getOrders) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getAllOrders(params)](#TDAmeritrade+getAllOrders) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.placeOrder(accountId, order)](#TDAmeritrade+placeOrder) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.replaceOrder(accountId, orderId, order)](#TDAmeritrade+replaceOrder) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.cancelOrder(accountId, orderId)](#TDAmeritrade+cancelOrder) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getSavedOrder(accountId, savedOrderId)](#TDAmeritrade+getSavedOrder) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getSavedOrders(accountId)](#TDAmeritrade+getSavedOrders) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.createSavedOrder(accountId, savedOrder)](#TDAmeritrade+createSavedOrder) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.replaceSavedOrder(accountId, savedOrderId, savedOrder)](#TDAmeritrade+replaceSavedOrder) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.deleteSavedOrder(accountId, savedOrderId)](#TDAmeritrade+deleteSavedOrder) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getAccessToken(authCode)](#TDAmeritrade+getAccessToken) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.refreshAccessToken([refreshToken])](#TDAmeritrade+refreshAccessToken) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.isAccessTokenExpired()](#TDAmeritrade+isAccessTokenExpired) ⇒ <code>boolean</code>
    * [td.isRefreshTokenExpired()](#TDAmeritrade+isRefreshTokenExpired) ⇒ <code>boolean</code>
    * [td.getTransaction(accountId, transactionId)](#TDAmeritrade+getTransaction) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getTransactions(accountId, params)](#TDAmeritrade+getTransactions) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.createWatchlist(accountId, watchlist)](#TDAmeritrade+createWatchlist) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.deleteWatchlist(accountId, watchlistId)](#TDAmeritrade+deleteWatchlist) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getWatchlist(accountId, watchlistId)](#TDAmeritrade+getWatchlist) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getWatchlists(accountId)](#TDAmeritrade+getWatchlists) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.getAllWatchlists()](#TDAmeritrade+getAllWatchlists) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.replaceWatchlist(accountId, watchlistId, watchlist)](#TDAmeritrade+replaceWatchlist) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.updateWatchlist(accountId, watchlistId, watchlist)](#TDAmeritrade+updateWatchlist) ⇒ <code>Promise.&lt;any&gt;</code>
    * [td.account(accountId)](#TDAmeritrade+account) ⇒ [<code>TDAccount</code>](#TDAccount)
    * [td.streamer()](#TDAmeritrade+streamer) ⇒ [<code>Promise.&lt;TDStreamer&gt;</code>](#TDStreamer)


<br><a name="new_TDAmeritrade_new"></a>

### new TDAmeritrade([config])

**Arguments**

- **[config] ([<code>Config</code>](#Config))** : Config



**Example**  
```js
const td = new TDAmeritrade({
    apiKey: process.env.API_KEY,
    redirectUri: 'https://localhost:8443',
    sslKey: './selfsigned.key',
    sslCert: './selfsigned.crt',
})
```

<br><a name="TDAmeritrade+axios"></a>

### td.axios : <code>AxiosInstance</code>

The axios instance used by the client.



<br><a name="TDAmeritrade+on"></a>

### td.on(event, fn) ⇒ <code>EventEmitter.&lt;(string\|symbol), any&gt;</code>

Add a listener for a given event.

**Arguments**

- **event (<code>&#x27;login&#x27;</code> | <code>&#x27;token&#x27;</code>)** : The event name
- **fn (<code>EventEmitter.EventListener.&lt;any, any&gt;</code>)** : Callback function

**Returns**

- **<code>EventEmitter.&lt;(string\|symbol), any&gt;</code>** : Event emitter


<br><a name="TDAmeritrade+getAccounts"></a>

### td.getAccounts([fields]) ⇒ <code>Promise.&lt;any&gt;</code>

Get account balances, positions, and orders for all linked accounts.

**Arguments**

- **[fields] ([<code>AccountFields</code>](#AccountFields) | [<code>Array.&lt;AccountFields&gt;</code>](#AccountFields))** : Fields to include

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : List of all accounts


**Example**  
```js
const accounts = await td.getAccounts()
```

<br><a name="TDAmeritrade+getAccount"></a>

### td.getAccount(accountId, [fields]) ⇒ <code>Promise.&lt;any&gt;</code>

Get account balances, positions, and orders for a specific account.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **[fields] ([<code>AccountFields</code>](#AccountFields) | [<code>Array.&lt;AccountFields&gt;</code>](#AccountFields))** : Fields to include

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The requested account


**Example**  
```js
const acctInfo = await td.getAccount('45678')
```

<br><a name="TDAmeritrade+getPositions"></a>

### td.getPositions(accountId) ⇒ <code>Promise.&lt;any&gt;</code>

Get account positions for a specific account.

**Arguments**

- **accountId (<code>string</code>)** : The account id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The requested account's positions


**Example**  
```js
const acctInfo = await td.getPositions('45678')
```

<br><a name="TDAmeritrade+getPreferences"></a>

### td.getPreferences(accountId) ⇒ <code>Promise.&lt;any&gt;</code>

Get preferences for a specific account.

**Arguments**

- **accountId (<code>string</code>)** : The account id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The account preferences


**Example**  
```js
const prefs = await td.getPreferences('45678')
```

<br><a name="TDAmeritrade+updatePreferences"></a>

### td.updatePreferences(accountId, preferences) ⇒ <code>Promise.&lt;any&gt;</code>

Update preferences for a specific account. The `directOptionsRouting` and
`directEquityRouting` values cannot be modified via this operation.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **preferences ([<code>Preferences</code>](#Preferences))** : The updated preferences

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAmeritrade+getStreamerSubscriptionKeys"></a>

### td.getStreamerSubscriptionKeys([accountIds]) ⇒ <code>Promise.&lt;any&gt;</code>

Get the SubscriptionKey for provided accounts or default accounts.

**Arguments**

- **[accountIds] (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : The account id(s)

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The susbscription keys


**Example**  
```js
const subsKeys = await td.getStreamerSubscriptionKeys('45678')
```

<br><a name="TDAmeritrade+getUserPrincipals"></a>

### td.getUserPrincipals([fields]) ⇒ <code>Promise.&lt;any&gt;</code>

Get user principal details.

**Arguments**

- **[fields] ([<code>UserPrincipalFields</code>](#UserPrincipalFields) | [<code>Array.&lt;UserPrincipalFields&gt;</code>](#UserPrincipalFields))** : Fields to include

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : User principal details


**Example**  
```js
const usrPrinc = await td.getUserPrincipals()
// OR
const usrPrinc = await td.getUserPrincipals('streamerSubscriptionKeys')
// OR
const usrPrinc = await td.getUserPrincipals(['streamerSubscriptionKeys', 'streamerConnectionInfo'])
```

<br><a name="TDAmeritrade+getMarketHours"></a>

### td.getMarketHours(markets, date) ⇒ <code>Promise.&lt;any&gt;</code>

Get the market hours for the specified market(s).

**Arguments**

- **markets ([<code>Market</code>](#Market) | [<code>Array.&lt;Market&gt;</code>](#Market))** : The market(s) for which you're requesting market hours
- **date (<code>string</code>)** : The date for which market hours information is requested. Valid ISO-8601 formats are `yyyy-MM-dd` and `yyyy-MM-dd'T'HH:mm:ssz`

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The market hours


**Example**  
```js
td.getMarketHours('EQUITY', '2021-01-21')
// OR
td.getMarketHours(['EQUITY', 'FUTURE'], '2021-01-21')
```

<br><a name="TDAmeritrade+getMovers"></a>

### td.getMovers(index, direction, change) ⇒ <code>Promise.&lt;any&gt;</code>

Get mover information by index symbol, direction type and change.

**Arguments**

- **index (<code>&#x27;$COMPX&#x27;</code> | <code>&#x27;$DJI&#x27;</code> | <code>&#x27;$SPX.X&#x27;</code>)** : The index symbol
- **direction (<code>&#x27;up&#x27;</code> | <code>&#x27;down&#x27;</code>)** : The direction
- **change (<code>&#x27;value&#x27;</code> | <code>&#x27;percent&#x27;</code>)** : The change type

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The mover information


**Example**  
```js
const movers = await td.getMovers('$DJI', 'up', 'percent')
```

<br><a name="TDAmeritrade+getQuotes"></a>

### td.getQuotes(symbols) ⇒ <code>Promise.&lt;any&gt;</code>

Get quote data for one or more symbols.

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : The ticker symbol(s)

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The quote data


**Example**  
```js
const data = await td.getQuotes(['ABC', 'XYZ'])
```

<br><a name="TDAmeritrade+getQuote"></a>

### td.getQuote(symbol) ⇒ <code>Promise.&lt;any&gt;</code>

Get quote data for a specified symbol.

**Arguments**

- **symbol (<code>string</code>)** : The ticker symbol

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The quote data


**Example**  
```js
const data = await td.getQuote('XYZ')
```

<br><a name="TDAmeritrade+getPriceHistory"></a>

### td.getPriceHistory(symbol, params) ⇒ <code>Promise.&lt;any&gt;</code>

Get price history for a specified symbol.

**Arguments**

- **symbol (<code>string</code>)** : The ticker symbol
- **params ([<code>PriceHistoryQuery</code>](#PriceHistoryQuery))** : The query parameters

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The price history


**Example**  
```js
const prices = await td.getPriceHistory('XYZ', {
    periodType: 'day',
    period: 5,
    frequencyType: 'minute',
    needExtendedHoursData: false
})
```

<br><a name="TDAmeritrade+getOptionChain"></a>

### td.getOptionChain(symbol, params) ⇒ <code>Promise.&lt;any&gt;</code>

Get Option Chains for optionable symbols.

**Arguments**

- **symbol (<code>string</code>)** : The ticker symbol
- **params ([<code>OptionChainQuery</code>](#OptionChainQuery))** : The query parameters

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The option chain


<br><a name="TDAmeritrade+searchInstruments"></a>

### td.searchInstruments(symbol, projection) ⇒ <code>Promise.&lt;any&gt;</code>

Search or retrieve instrument data, including fundamental data.

**Arguments**

- **symbol (<code>string</code>)** : The ticker symbol
- **projection (<code>&#x27;symbol-search&#x27;</code> | <code>&#x27;symbol-regex&#x27;</code> | <code>&#x27;desc-search&#x27;</code> | <code>&#x27;desc-regex&#x27;</code> | <code>&#x27;fundamental&#x27;</code>)** : The type of request
     - `symbol-search`: Retrieve instrument data of a specific symbol or cusip
     - `symbol-regex`: Retrieve instrument data for all symbols matching regex. Example: `symbol=XYZ.*`
        will return all symbols beginning with XYZ
     - `desc-search`: Retrieve instrument data for instruments whose description contains the word supplied.
        Example: `symbol=FakeCompany` will return all instruments with FakeCompany in the description.
     - `desc-regex`: Search description with full regex support. Example: `symbol=XYZ.[A-C]` returns all instruments
        whose descriptions contain a word beginning with XYZ followed by a character A through C.
     - `fundamental`: Returns fundamental data for a single instrument specified by exact symbol.

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The instrument data


**Example**  
```js
const res = await td.searchInstruments('XYZ', 'symbol-search')
```

<br><a name="TDAmeritrade+getInstrument"></a>

### td.getInstrument(cusip) ⇒ <code>Promise.&lt;any&gt;</code>

Get an instrument by its CUSIP.

**Arguments**

- **cusip (<code>string</code>)** : The CUSIP identifier

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The instrument details


**Example**  
```js
const instr = await td.getInstrument('03074K100')
```

<br><a name="TDAmeritrade+authorize"></a>

### td.authorize() ⇒ <code>Promise.&lt;any&gt;</code>

Bootstrap a local web server for oauth2 authorization. Will request
access token and update config if authorization is successful.

**(Available for Nodejs only)**

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


**Example**  
```js
td.authorize().then(token => {
    console.log(token)
}).catch(err => {
    console.log(err)
})
```

<br><a name="TDAmeritrade+login"></a>

### td.login() ⇒ <code>Promise.&lt;any&gt;</code>

Authorize or refresh the access token depending on whether
the access and/or refresh token exist and are not expired.

**(Available for Nodejs only)**

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


**Example**  
```js
td.login().then(token => {
    console.log(token)
}).catch(err => {
    console.log(err)
})
```

<br><a name="TDAmeritrade+getOrder"></a>

### td.getOrder(accountId, orderId) ⇒ <code>Promise.&lt;any&gt;</code>

Get a specific order for a specific account.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **orderId (<code>string</code>)** : The order id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The order details


**Example**  
```js
const order = await td.getOrder('45678', '98745')
```

<br><a name="TDAmeritrade+getOrders"></a>

### td.getOrders(accountId, params) ⇒ <code>Promise.&lt;any&gt;</code>

Get a list of orders for a specific account.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **params ([<code>OrdersQuery</code>](#OrdersQuery))** : The query parameters

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : List of orders


**Example**  
```js
const orders = await td.getOrders('45678', {
    fromEnteredTime: '2021-01-01',
    toEnteredTime: '2021-01-15',
    maxResults: 25,
    status: 'FILLED'
})
```

<br><a name="TDAmeritrade+getAllOrders"></a>

### td.getAllOrders(params) ⇒ <code>Promise.&lt;any&gt;</code>

Get a list of orders from all accounts.

**Arguments**

- **params ([<code>OrdersQuery</code>](#OrdersQuery))** : The query parameters

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : List of orders


**Example**  
```js
const orders = await td.getAllOrders({
    fromEnteredTime: '2021-01-01',
    toEnteredTime: '2021-01-15',
    maxResults: 25,
    status: 'FILLED'
})
```

<br><a name="TDAmeritrade+placeOrder"></a>

### td.placeOrder(accountId, order) ⇒ <code>Promise.&lt;any&gt;</code>

Place an order for a specific account.
Read [Place Order Samples](https://developer.tdameritrade.com/content/place-order-samples) for more info.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **order (<code>object</code>)** : The order

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


**Example**  
```js
await td.placeOrder('45678', {
    orderType: 'MARKET',
    session: 'NORMAL',
    duration: 'DAY',
    orderStrategyType: 'SINGLE',
    orderLegCollection: [
        {
            instruction: 'Buy',
            quantity: 15,
            instrument: {
                symbol: 'XYZ',
                assetType: 'EQUITY'
            }
        }
    ]
})
```

<br><a name="TDAmeritrade+replaceOrder"></a>

### td.replaceOrder(accountId, orderId, order) ⇒ <code>Promise.&lt;any&gt;</code>

Replace an existing order for an account. The existing order will be replaced by the new order.
Once replaced, the old order will be canceled and a new order will be created.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **orderId (<code>string</code>)** : The order id
- **order (<code>object</code>)** : The new order

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAmeritrade+cancelOrder"></a>

### td.cancelOrder(accountId, orderId) ⇒ <code>Promise.&lt;any&gt;</code>

Cancel a specific order for a specific account.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **orderId (<code>string</code>)** : The order id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


**Example**  
```js
await td.cancelOrder('45678', '98745')
```

<br><a name="TDAmeritrade+getSavedOrder"></a>

### td.getSavedOrder(accountId, savedOrderId) ⇒ <code>Promise.&lt;any&gt;</code>

Get saved order by its ID, for a specific account.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **savedOrderId (<code>string</code>)** : The saved order id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The saved order details


<br><a name="TDAmeritrade+getSavedOrders"></a>

### td.getSavedOrders(accountId) ⇒ <code>Promise.&lt;any&gt;</code>

Get saved orders for a specific account.

**Arguments**

- **accountId (<code>string</code>)** : The account id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : List of saved orders


<br><a name="TDAmeritrade+createSavedOrder"></a>

### td.createSavedOrder(accountId, savedOrder) ⇒ <code>Promise.&lt;any&gt;</code>

Save an order for a specific account.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **savedOrder (<code>object</code>)** : The saved order

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


**Example**  
```js
await td.createSavedOrder('45678', {
    complexOrderStrategyType: 'NONE',
    orderType: 'LIMIT',
    session: 'NORMAL',
    price: '6.45',
    duration: 'DAY',
    orderStrategyType: 'SINGLE',
    orderLegCollection: [
        {
            instruction: 'BUY_TO_OPEN',
            quantity: 10,
            instrument: {
                symbol: 'XYZ_032015C49',
                assetType: 'OPTION'
            }
        }
    ]
})
```

<br><a name="TDAmeritrade+replaceSavedOrder"></a>

### td.replaceSavedOrder(accountId, savedOrderId, savedOrder) ⇒ <code>Promise.&lt;any&gt;</code>

Replace an existing saved order for an account. The existing saved order will be replaced by the new order.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **savedOrderId (<code>string</code>)** : The saved order id
- **savedOrder (<code>object</code>)** : The new saved order

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAmeritrade+deleteSavedOrder"></a>

### td.deleteSavedOrder(accountId, savedOrderId) ⇒ <code>Promise.&lt;any&gt;</code>

Delete a specific saved order for a specific account.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **savedOrderId (<code>string</code>)** : The saved order id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


**Example**  
```js
await td.deleteSavedOrder('45678', '98754')
```

<br><a name="TDAmeritrade+getAccessToken"></a>

### td.getAccessToken(authCode) ⇒ <code>Promise.&lt;any&gt;</code>

Get the access token along with an optional refresh token.

**Arguments**

- **authCode (<code>string</code>)** : The authorization code

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The token details


**Example**  
```js
const token = await td.getAccessToken('authorization-code-goes-here')
```

<br><a name="TDAmeritrade+refreshAccessToken"></a>

### td.refreshAccessToken([refreshToken]) ⇒ <code>Promise.&lt;any&gt;</code>

Refresh the access token.

**Arguments**

- **[refreshToken] (<code>string</code>)** : The refresh token

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The token details


**Example**  
```js
const token = await td.refreshAccessToken('refresh-token-goes-here')
```

<br><a name="TDAmeritrade+isAccessTokenExpired"></a>

### td.isAccessTokenExpired() ⇒ <code>boolean</code>

Determine if access token is expired.

**Returns**

- **<code>boolean</code>** : True if expired, otherwise false


<br><a name="TDAmeritrade+isRefreshTokenExpired"></a>

### td.isRefreshTokenExpired() ⇒ <code>boolean</code>

Determine if refresh token is expired.

**Returns**

- **<code>boolean</code>** : True if expired, otherwise false


<br><a name="TDAmeritrade+getTransaction"></a>

### td.getTransaction(accountId, transactionId) ⇒ <code>Promise.&lt;any&gt;</code>

Get a transaction for a specific account.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **transactionId (<code>string</code>)** : The transaction id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The transaction details


**Example**  
```js
const transaction = await td.getTransaction('45678', '98754')
```

<br><a name="TDAmeritrade+getTransactions"></a>

### td.getTransactions(accountId, params) ⇒ <code>Promise.&lt;any&gt;</code>

Get all transactions for a specific account.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **params ([<code>TransactionQuery</code>](#TransactionQuery))** : The query parameters

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The transaction history


**Example**  
```js
const transactions = await td.getTransactions('45678', {
    symbol: 'SPY',
    startDate: '2021-01-01',
    endDate: '2021-01-31',
})
```

<br><a name="TDAmeritrade+createWatchlist"></a>

### td.createWatchlist(accountId, watchlist) ⇒ <code>Promise.&lt;any&gt;</code>

Create watchlist for specific account.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **watchlist ([<code>Watchlist</code>](#Watchlist))** : The watchlist

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAmeritrade+deleteWatchlist"></a>

### td.deleteWatchlist(accountId, watchlistId) ⇒ <code>Promise.&lt;any&gt;</code>

Delete watchlist for a specific account.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **watchlistId (<code>string</code>)** : The watchlist id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


**Example**  
```js
await td.deleteWatchlist('45678', '98754')
```

<br><a name="TDAmeritrade+getWatchlist"></a>

### td.getWatchlist(accountId, watchlistId) ⇒ <code>Promise.&lt;any&gt;</code>

Get watchlist for a specific account.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **watchlistId (<code>string</code>)** : The watchlist id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


**Example**  
```js
const watchlist = await td.getWatchlist('45678', '98754')
```

<br><a name="TDAmeritrade+getWatchlists"></a>

### td.getWatchlists(accountId) ⇒ <code>Promise.&lt;any&gt;</code>

Get all watchlists of an account.

**Arguments**

- **accountId (<code>string</code>)** : The account id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : List of watchlists


**Example**  
```js
const watchlists = await td.getWatchlists('45678')
```

<br><a name="TDAmeritrade+getAllWatchlists"></a>

### td.getAllWatchlists() ⇒ <code>Promise.&lt;any&gt;</code>

All watchlists for all of the user's linked accounts.

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : List of watchlists


**Example**  
```js
const watchlists = await td.getAllWatchlists()
```

<br><a name="TDAmeritrade+replaceWatchlist"></a>

### td.replaceWatchlist(accountId, watchlistId, watchlist) ⇒ <code>Promise.&lt;any&gt;</code>

Replace watchlist for a specific account. This method does not verify that the symbol or asset type are valid.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **watchlistId (<code>string</code>)** : The watchlist id
- **watchlist ([<code>Watchlist</code>](#Watchlist))** : The watchlist

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAmeritrade+updateWatchlist"></a>

### td.updateWatchlist(accountId, watchlistId, watchlist) ⇒ <code>Promise.&lt;any&gt;</code>

Partially update watchlist for a specific account: change watchlist name, add
to the beginning/end of a watchlist, update or delete items in a watchlist.
This method does not verify that the symbol or asset type are valid.

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **watchlistId (<code>string</code>)** : The watchlist id
- **watchlist ([<code>Watchlist</code>](#Watchlist))** : The new watchlist

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAmeritrade+account"></a>

### td.account(accountId) ⇒ [<code>TDAccount</code>](#TDAccount)

Create a new instance of Account.

**Arguments**

- **accountId (<code>string</code>)** : The account id

**Returns**

- **[<code>TDAccount</code>](#TDAccount)** : A new Account instance


**Example**  
```js
const ira_account = td.account('45678')
```

<br><a name="TDAmeritrade+streamer"></a>

### td.streamer() ⇒ [<code>Promise.&lt;TDStreamer&gt;</code>](#TDStreamer)

Create a new instance of TDStreamer.
For the time being, this will select the first available account.

**Returns**

- **[<code>Promise.&lt;TDStreamer&gt;</code>](#TDStreamer)** : A new TDStreamer instance


**Example**  
```js
const streamer = await td.streamer()
```


<br><a name="TDAccount"></a>

## TDAccount



* [TDAccount](#TDAccount)
    * [new TDAccount(accountId, [config])](#new_TDAccount_new)
    * [account.getAccount([fields])](#TDAccount+getAccount) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.getPositions()](#TDAccount+getPositions) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.getPreferences()](#TDAccount+getPreferences) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.updatePreferences(preferences)](#TDAccount+updatePreferences) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.getStreamerSubscriptionKeys()](#TDAccount+getStreamerSubscriptionKeys) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.getOrders(params)](#TDAccount+getOrders) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.getOrder(orderId)](#TDAccount+getOrder) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.placeOrder(order)](#TDAccount+placeOrder) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.replaceOrder(orderId, order)](#TDAccount+replaceOrder) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.cancelOrder(orderId)](#TDAccount+cancelOrder) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.createSavedOrder(savedOrder)](#TDAccount+createSavedOrder) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.deleteSavedOrder(savedOrderId)](#TDAccount+deleteSavedOrder) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.getSavedOrder(savedOrderId)](#TDAccount+getSavedOrder) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.getSavedOrders()](#TDAccount+getSavedOrders) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.replaceSavedOrder(savedOrderId, savedOrder)](#TDAccount+replaceSavedOrder) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.createWatchlist(watchlist)](#TDAccount+createWatchlist) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.deleteWatchlist(watchlistId)](#TDAccount+deleteWatchlist) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.getWatchlist(watchlistId)](#TDAccount+getWatchlist) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.getWatchlists()](#TDAccount+getWatchlists) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.replaceWatchlist(watchlistId, watchlist)](#TDAccount+replaceWatchlist) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.updateWatchlist(watchlistId, watchlist)](#TDAccount+updateWatchlist) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.getTransaction(transactionId)](#TDAccount+getTransaction) ⇒ <code>Promise.&lt;any&gt;</code>
    * [account.getTransactions(params)](#TDAccount+getTransactions) ⇒ <code>Promise.&lt;any&gt;</code>


<br><a name="new_TDAccount_new"></a>

### new TDAccount(accountId, [config])

**Arguments**

- **accountId (<code>string</code>)** : The account id
- **[config] ([<code>Config</code>](#Config))** : Config



<br><a name="TDAccount+getAccount"></a>

### account.getAccount([fields]) ⇒ <code>Promise.&lt;any&gt;</code>

Get account balances, positions, and orders.

**Arguments**

- **[fields] ([<code>AccountFields</code>](#AccountFields) | [<code>Array.&lt;AccountFields&gt;</code>](#AccountFields))** : Fields to include

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The requested account


<br><a name="TDAccount+getPositions"></a>

### account.getPositions() ⇒ <code>Promise.&lt;any&gt;</code>

Get account positions.

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The requested account's positions


<br><a name="TDAccount+getPreferences"></a>

### account.getPreferences() ⇒ <code>Promise.&lt;any&gt;</code>

Get account preferences.

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The account preferences


<br><a name="TDAccount+updatePreferences"></a>

### account.updatePreferences(preferences) ⇒ <code>Promise.&lt;any&gt;</code>

Update account preferences. The `directOptionsRouting` and
`directEquityRouting` values cannot be modified via this operation.

**Arguments**

- **preferences ([<code>Preferences</code>](#Preferences))** : The updated preferences

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAccount+getStreamerSubscriptionKeys"></a>

### account.getStreamerSubscriptionKeys() ⇒ <code>Promise.&lt;any&gt;</code>

Get the SubscriptionKey.

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The susbscription keys


<br><a name="TDAccount+getOrders"></a>

### account.getOrders(params) ⇒ <code>Promise.&lt;any&gt;</code>

Get a list of orders.

**Arguments**

- **params ([<code>OrdersQuery</code>](#OrdersQuery))** : The query parameters

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : List of orders


<br><a name="TDAccount+getOrder"></a>

### account.getOrder(orderId) ⇒ <code>Promise.&lt;any&gt;</code>

Get a specific order.

**Arguments**

- **orderId (<code>string</code>)** : The order id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The order details


<br><a name="TDAccount+placeOrder"></a>

### account.placeOrder(order) ⇒ <code>Promise.&lt;any&gt;</code>

Place an order.
Read [Place Order Samples](https://developer.tdameritrade.com/content/place-order-samples) for more info.

**Arguments**

- **order (<code>object</code>)** : The order

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAccount+replaceOrder"></a>

### account.replaceOrder(orderId, order) ⇒ <code>Promise.&lt;any&gt;</code>

Replace an existing order. The existing order will be replaced by the new order.
Once replaced, the old order will be canceled and a new order will be created.

**Arguments**

- **orderId (<code>string</code>)** : The order id
- **order (<code>object</code>)** : The new order

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAccount+cancelOrder"></a>

### account.cancelOrder(orderId) ⇒ <code>Promise.&lt;any&gt;</code>

Cancel a specific order.

**Arguments**

- **orderId (<code>string</code>)** : The order id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAccount+createSavedOrder"></a>

### account.createSavedOrder(savedOrder) ⇒ <code>Promise.&lt;any&gt;</code>

Save an order.

**Arguments**

- **savedOrder (<code>object</code>)** : The saved order

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAccount+deleteSavedOrder"></a>

### account.deleteSavedOrder(savedOrderId) ⇒ <code>Promise.&lt;any&gt;</code>

Delete a specific saved order.

**Arguments**

- **savedOrderId (<code>string</code>)** : The saved order id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAccount+getSavedOrder"></a>

### account.getSavedOrder(savedOrderId) ⇒ <code>Promise.&lt;any&gt;</code>

Get saved order by its ID.

**Arguments**

- **savedOrderId (<code>string</code>)** : The saved order id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The saved order details


<br><a name="TDAccount+getSavedOrders"></a>

### account.getSavedOrders() ⇒ <code>Promise.&lt;any&gt;</code>

Get saved orders.

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : List of saved orders


<br><a name="TDAccount+replaceSavedOrder"></a>

### account.replaceSavedOrder(savedOrderId, savedOrder) ⇒ <code>Promise.&lt;any&gt;</code>

Replace an existing saved order for an account. The existing saved order will be replaced by the new order.

**Arguments**

- **savedOrderId (<code>string</code>)** : The saved order id
- **savedOrder (<code>object</code>)** : The new saved order

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAccount+createWatchlist"></a>

### account.createWatchlist(watchlist) ⇒ <code>Promise.&lt;any&gt;</code>

Create watchlist.

**Arguments**

- **watchlist ([<code>Watchlist</code>](#Watchlist))** : The watchlist

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAccount+deleteWatchlist"></a>

### account.deleteWatchlist(watchlistId) ⇒ <code>Promise.&lt;any&gt;</code>

Delete watchlist.

**Arguments**

- **watchlistId (<code>string</code>)** : The watchlist id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAccount+getWatchlist"></a>

### account.getWatchlist(watchlistId) ⇒ <code>Promise.&lt;any&gt;</code>

Get watchlist.

**Arguments**

- **watchlistId (<code>string</code>)** : The watchlist id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAccount+getWatchlists"></a>

### account.getWatchlists() ⇒ <code>Promise.&lt;any&gt;</code>

Get all watchlists.

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : List of watchlists


<br><a name="TDAccount+replaceWatchlist"></a>

### account.replaceWatchlist(watchlistId, watchlist) ⇒ <code>Promise.&lt;any&gt;</code>

Replace watchlist. This method does not verify that the symbol or asset type are valid.

**Arguments**

- **watchlistId (<code>string</code>)** : The watchlist id
- **watchlist ([<code>Watchlist</code>](#Watchlist))** : The watchlist

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAccount+updateWatchlist"></a>

### account.updateWatchlist(watchlistId, watchlist) ⇒ <code>Promise.&lt;any&gt;</code>

Partially update watchlist: change watchlist name, add to the
beginning/end of a watchlist, update or delete items in a watchlist.
This method does not verify that the symbol or asset type are valid.

**Arguments**

- **watchlistId (<code>string</code>)** : The watchlist id
- **watchlist ([<code>Watchlist</code>](#Watchlist))** : The new watchlist

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : Success


<br><a name="TDAccount+getTransaction"></a>

### account.getTransaction(transactionId) ⇒ <code>Promise.&lt;any&gt;</code>

Get a transaction.

**Arguments**

- **transactionId (<code>string</code>)** : The transaction id

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The transaction details


<br><a name="TDAccount+getTransactions"></a>

### account.getTransactions(params) ⇒ <code>Promise.&lt;any&gt;</code>

Get all transactions.

**Arguments**

- **params ([<code>TransactionQuery</code>](#TransactionQuery))** : The query parameters

**Returns**

- **<code>Promise.&lt;any&gt;</code>** : The transaction history



<br><a name="TDStreamer"></a>

## TDStreamer



* [TDStreamer](#TDStreamer)
    * [new TDStreamer(userPrincipals)](#new_TDStreamer_new)
    * [streamer.state](#TDStreamer+state) ⇒ [<code>State</code>](#State)
    * [streamer.on(event, fn)](#TDStreamer+on) ⇒ <code>EventEmitter.&lt;(string\|symbol), any&gt;</code>
    * [streamer.once(event, fn)](#TDStreamer+once) ⇒ <code>EventEmitter.&lt;(string\|symbol), any&gt;</code>
    * [streamer.removeListener(event, fn)](#TDStreamer+removeListener) ⇒ <code>void</code>
    * [streamer.removeAllListeners([event])](#TDStreamer+removeAllListeners) ⇒ <code>void</code>
    * [streamer.eventNames()](#TDStreamer+eventNames) ⇒ <code>Array.&lt;(string\|symbol)&gt;</code>
    * [streamer.listeners(event)](#TDStreamer+listeners) ⇒ <code>Array.&lt;EventEmitter.EventListener.&lt;any, any&gt;&gt;</code>
    * [streamer.listenerCount(event)](#TDStreamer+listenerCount) ⇒ <code>number</code>
    * [streamer.connect()](#TDStreamer+connect) ⇒ <code>void</code>
    * [streamer.disconnect(options)](#TDStreamer+disconnect) ⇒ <code>void</code>
    * [streamer.createRequest(requests)](#TDStreamer+createRequest) ⇒ <code>object</code>
    * [streamer.sendRequest(requests)](#TDStreamer+sendRequest) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.send(message)](#TDStreamer+send) ⇒ <code>void</code>
    * [streamer.subscribe(services)](#TDStreamer+subscribe) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.unsubscribe(services)](#TDStreamer+unsubscribe) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.setQOS(level)](#TDStreamer+setQOS) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.subsAccountActivity([fields])](#TDStreamer+subsAccountActivity) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.unsubsAccountActivity()](#TDStreamer+unsubsAccountActivity) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.subsChartEquity(symbols, [fields])](#TDStreamer+subsChartEquity) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.unsubsChartEquity(symbols)](#TDStreamer+unsubsChartEquity) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.subsChartFutures(symbols, [fields])](#TDStreamer+subsChartFutures) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.unsubsChartFutures(symbols)](#TDStreamer+unsubsChartFutures) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.subsChartOptions(symbols, [fields])](#TDStreamer+subsChartOptions) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.unsubsChartOptions(symbols)](#TDStreamer+unsubsChartOptions) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.subsNewsHeadline(symbols, [fields])](#TDStreamer+subsNewsHeadline) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.unsubsNewsHeadline(symbols)](#TDStreamer+unsubsNewsHeadline) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.subsTimesaleEquity(symbols, [fields])](#TDStreamer+subsTimesaleEquity) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.unsubsTimesaleEquity(symbols)](#TDStreamer+unsubsTimesaleEquity) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.subsTimesaleFutures(symbols, [fields])](#TDStreamer+subsTimesaleFutures) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.unsubsTimesaleFutures(symbols)](#TDStreamer+unsubsTimesaleFutures) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.subsTimesaleOptions(symbols, [fields])](#TDStreamer+subsTimesaleOptions) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.unsubsTimesaleOptions(symbols)](#TDStreamer+unsubsTimesaleOptions) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.subsTimesaleForex(symbols, [fields])](#TDStreamer+subsTimesaleForex) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.unsubsTimesaleForex(symbols)](#TDStreamer+unsubsTimesaleForex) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.getChartHistoryFutures(symbols, options)](#TDStreamer+getChartHistoryFutures) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.subsLevelOneEquity(symbols, [fields])](#TDStreamer+subsLevelOneEquity) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.unsubsLevelOneEquity(symbols)](#TDStreamer+unsubsLevelOneEquity) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.subsLevelOneFutures(symbols, [fields])](#TDStreamer+subsLevelOneFutures) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.unsubsLevelOneFutures(symbols)](#TDStreamer+unsubsLevelOneFutures) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.subsLevelOneOption(symbols, [fields])](#TDStreamer+subsLevelOneOption) ⇒ <code>Array.&lt;object&gt;</code>
    * [streamer.unsubsLevelOneOption(symbols)](#TDStreamer+unsubsLevelOneOption) ⇒ <code>Array.&lt;object&gt;</code>


<br><a name="new_TDStreamer_new"></a>

### new TDStreamer(userPrincipals)

**Arguments**

- **userPrincipals (<code>object</code>)** : User principals object



<br><a name="TDStreamer+state"></a>

### streamer.state ⇒ [<code>State</code>](#State)

**Returns**

- **[<code>State</code>](#State)** : state


<br><a name="TDStreamer+on"></a>

### streamer.on(event, fn) ⇒ <code>EventEmitter.&lt;(string\|symbol), any&gt;</code>

Add a listener for a given event.

**Arguments**

- **event ([<code>State</code>](#State) | [<code>Event</code>](#Event) | [<code>Error</code>](#Error))** : The event name
- **fn (<code>EventEmitter.EventListener.&lt;any, any&gt;</code>)** : Callback function

**Returns**

- **<code>EventEmitter.&lt;(string\|symbol), any&gt;</code>** : Event emitter


<br><a name="TDStreamer+once"></a>

### streamer.once(event, fn) ⇒ <code>EventEmitter.&lt;(string\|symbol), any&gt;</code>

Add a one-time listener for a given event.

**Arguments**

- **event ([<code>State</code>](#State) | [<code>Event</code>](#Event) | [<code>Error</code>](#Error))** : The event name
- **fn (<code>EventEmitter.EventListener.&lt;any, any&gt;</code>)** : Callback function

**Returns**

- **<code>EventEmitter.&lt;(string\|symbol), any&gt;</code>** : Event emitter


<br><a name="TDStreamer+removeListener"></a>

### streamer.removeListener(event, fn) ⇒ <code>void</code>

Remove the listeners of a given event.

**Arguments**

- **event ([<code>State</code>](#State) | [<code>Event</code>](#Event))** : The event name
- **fn (<code>EventEmitter.EventListener.&lt;any, any&gt;</code>)** : Callback function



<br><a name="TDStreamer+removeAllListeners"></a>

### streamer.removeAllListeners([event]) ⇒ <code>void</code>

Remove all listeners, or those of the specified event.

**Arguments**

- **[event] ([<code>State</code>](#State) | [<code>Event</code>](#Event) | [<code>Error</code>](#Error))** : The event name



<br><a name="TDStreamer+eventNames"></a>

### streamer.eventNames() ⇒ <code>Array.&lt;(string\|symbol)&gt;</code>

Return an array listing the events for which
the streamer has registered listeners.

**Returns**

- **<code>Array.&lt;(string\|symbol)&gt;</code>** : event names


<br><a name="TDStreamer+listeners"></a>

### streamer.listeners(event) ⇒ <code>Array.&lt;EventEmitter.EventListener.&lt;any, any&gt;&gt;</code>

Return the listeners registered for a given event.

**Arguments**

- **event ([<code>State</code>](#State) | [<code>Event</code>](#Event) | [<code>Error</code>](#Error))** : The event name

**Returns**

- **<code>Array.&lt;EventEmitter.EventListener.&lt;any, any&gt;&gt;</code>** : List of listeners


<br><a name="TDStreamer+listenerCount"></a>

### streamer.listenerCount(event) ⇒ <code>number</code>

Return the number of listeners listening to a given event.

**Arguments**

- **event ([<code>State</code>](#State) | [<code>Event</code>](#Event) | [<code>Error</code>](#Error))** : The event name

**Returns**

- **<code>number</code>** : Number of listeners


<br><a name="TDStreamer+connect"></a>

### streamer.connect() ⇒ <code>void</code>

Connect to the server



<br><a name="TDStreamer+disconnect"></a>

### streamer.disconnect(options) ⇒ <code>void</code>

Disconnect from the server

**Arguments**

- **options ([<code>DisconnectOptions</code>](#DisconnectOptions))** : Options



<br><a name="TDStreamer+createRequest"></a>

### streamer.createRequest(requests) ⇒ <code>object</code>

Create a request object

**Arguments**

- **requests ([<code>Request</code>](#Request) | [<code>Array.&lt;Request&gt;</code>](#Request))** : The requests to send to the server

**Returns**

- **<code>object</code>** : The requests object


<br><a name="TDStreamer+sendRequest"></a>

### streamer.sendRequest(requests) ⇒ <code>Array.&lt;object&gt;</code>

Send a request to the server

**Arguments**

- **requests ([<code>Request</code>](#Request) | [<code>Array.&lt;Request&gt;</code>](#Request))** : The requests to send to the server

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The requests sent to the server


<br><a name="TDStreamer+send"></a>

### streamer.send(message) ⇒ <code>void</code>

Send a message to the server

**Arguments**

- **message (<code>object</code>)** : The JSON message to send to server



<br><a name="TDStreamer+subscribe"></a>

### streamer.subscribe(services) ⇒ <code>Array.&lt;object&gt;</code>

Subscribe for service updates

**Arguments**

- **services ([<code>Service</code>](#Service) | [<code>Array.&lt;Service&gt;</code>](#Service))** : The services to subscribe to

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+unsubscribe"></a>

### streamer.unsubscribe(services) ⇒ <code>Array.&lt;object&gt;</code>

Unsubscribe from services updates

**Arguments**

- **services ([<code>Service</code>](#Service) | [<code>Array.&lt;Service&gt;</code>](#Service))** : The services to unsubscribe from

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+setQOS"></a>

### streamer.setQOS(level) ⇒ <code>Array.&lt;object&gt;</code>

Set Quality of Service

**Arguments**

- **level (<code>&#x27;express&#x27;</code> | <code>&#x27;realtime&#x27;</code> | <code>&#x27;fast&#x27;</code> | <code>&#x27;moderate&#x27;</code> | <code>&#x27;slow&#x27;</code> | <code>&#x27;delayed&#x27;</code>)** : level

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+subsAccountActivity"></a>

### streamer.subsAccountActivity([fields]) ⇒ <code>Array.&lt;object&gt;</code>

Subscribe to Account Activity updates

**Arguments**

- **[fields] (<code>Array.&lt;(&#x27;subscriptionKey&#x27;\|&#x27;accountNumber&#x27;\|&#x27;messageType&#x27;\|&#x27;messageData&#x27;)&gt;</code>)** : Fields to include (default all)

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+unsubsAccountActivity"></a>

### streamer.unsubsAccountActivity() ⇒ <code>Array.&lt;object&gt;</code>

Unsubscribe from Account Activity updates

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+subsChartEquity"></a>

### streamer.subsChartEquity(symbols, [fields]) ⇒ <code>Array.&lt;object&gt;</code>

Susbscribe to Chart Equity updates

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to subscribe to
- **[fields] (<code>Array.&lt;(&#x27;key&#x27;\|&#x27;openPrice&#x27;\|&#x27;highPrice&#x27;\|&#x27;lowPrice&#x27;\|&#x27;closePrice&#x27;\|&#x27;volume&#x27;\|&#x27;sequence&#x27;\|&#x27;chartTime&#x27;\|&#x27;chartDay&#x27;)&gt;</code>)** : Fields to include (default all)

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+unsubsChartEquity"></a>

### streamer.unsubsChartEquity(symbols) ⇒ <code>Array.&lt;object&gt;</code>

Unsubscribe from Chart Equity updates

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to unsubscribe from

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+subsChartFutures"></a>

### streamer.subsChartFutures(symbols, [fields]) ⇒ <code>Array.&lt;object&gt;</code>

Susbscribe to Chart Futures updates

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to subscribe to
- **[fields] (<code>Array.&lt;(&#x27;key&#x27;\|&#x27;chartTime&#x27;\|&#x27;openPrice&#x27;\|&#x27;highPrice&#x27;\|&#x27;lowPrice&#x27;\|&#x27;closePrice&#x27;\|&#x27;volume&#x27;)&gt;</code>)** : Fields to include (default all)

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+unsubsChartFutures"></a>

### streamer.unsubsChartFutures(symbols) ⇒ <code>Array.&lt;object&gt;</code>

Unsubscribe from Chart Futures updates

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to unsubscribe from

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+subsChartOptions"></a>

### streamer.subsChartOptions(symbols, [fields]) ⇒ <code>Array.&lt;object&gt;</code>

Subscribe to Chart Options updates

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to subscribe to
- **[fields] (<code>Array.&lt;(&#x27;key&#x27;\|&#x27;chartTime&#x27;\|&#x27;openPrice&#x27;\|&#x27;highPrice&#x27;\|&#x27;lowPrice&#x27;\|&#x27;closePrice&#x27;\|&#x27;volume&#x27;)&gt;</code>)** : Fields to include (default all)

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+unsubsChartOptions"></a>

### streamer.unsubsChartOptions(symbols) ⇒ <code>Array.&lt;object&gt;</code>

Unsbscribe from Chart Options updates

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to unsubscribe from

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+subsNewsHeadline"></a>

### streamer.subsNewsHeadline(symbols, [fields]) ⇒ <code>Array.&lt;object&gt;</code>

Subscribe to News Headline updates

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to subscribe to
- **[fields] (<code>Array.&lt;(&#x27;symbol&#x27;\|&#x27;errorCode&#x27;\|&#x27;storyDatetime&#x27;\|&#x27;headlineId&#x27;\|&#x27;status&#x27;\|&#x27;headline&#x27;\|&#x27;storyId&#x27;\|&#x27;countForKeyword&#x27;\|&#x27;keywordArray&#x27;\|&#x27;isHot&#x27;\|&#x27;storySource&#x27;)&gt;</code>)** : Fields to include (default all)

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+unsubsNewsHeadline"></a>

### streamer.unsubsNewsHeadline(symbols) ⇒ <code>Array.&lt;object&gt;</code>

Unsbscribe from News Headline updates

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to unsubscribe from

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+subsTimesaleEquity"></a>

### streamer.subsTimesaleEquity(symbols, [fields]) ⇒ <code>Array.&lt;object&gt;</code>

Subscribe to Timesale Equity updates

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to subscribe to
- **[fields] (<code>Array.&lt;(&#x27;symbol&#x27;\|&#x27;tradeTime&#x27;\|&#x27;lastPrice&#x27;\|&#x27;lastSize&#x27;\|&#x27;lastSequence&#x27;)&gt;</code>)** : Fields to include (default all)

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+unsubsTimesaleEquity"></a>

### streamer.unsubsTimesaleEquity(symbols) ⇒ <code>Array.&lt;object&gt;</code>

Unsbscribe from Timesale Equity updates

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to unsubscribe from

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+subsTimesaleFutures"></a>

### streamer.subsTimesaleFutures(symbols, [fields]) ⇒ <code>Array.&lt;object&gt;</code>

Subscribe to Timesale Futures updates

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to subscribe to
- **[fields] (<code>Array.&lt;(&#x27;symbol&#x27;\|&#x27;tradeTime&#x27;\|&#x27;lastPrice&#x27;\|&#x27;lastSize&#x27;\|&#x27;lastSequence&#x27;)&gt;</code>)** : Fields to include (default all)

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+unsubsTimesaleFutures"></a>

### streamer.unsubsTimesaleFutures(symbols) ⇒ <code>Array.&lt;object&gt;</code>

Unsbscribe from Timesale Futures updates

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to unsubscribe from

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+subsTimesaleOptions"></a>

### streamer.subsTimesaleOptions(symbols, [fields]) ⇒ <code>Array.&lt;object&gt;</code>

Subscribe to Timesale Options updates

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to subscribe to
- **[fields] (<code>Array.&lt;(&#x27;symbol&#x27;\|&#x27;tradeTime&#x27;\|&#x27;lastPrice&#x27;\|&#x27;lastSize&#x27;\|&#x27;lastSequence&#x27;)&gt;</code>)** : Fields to include (default all)

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+unsubsTimesaleOptions"></a>

### streamer.unsubsTimesaleOptions(symbols) ⇒ <code>Array.&lt;object&gt;</code>

Unsbscribe from Timesale Options updates

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to unsubscribe from

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+subsTimesaleForex"></a>

### streamer.subsTimesaleForex(symbols, [fields]) ⇒ <code>Array.&lt;object&gt;</code>

Subscribe to Timesale Forex updates

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to subscribe to
- **[fields] (<code>Array.&lt;(&#x27;symbol&#x27;\|&#x27;tradeTime&#x27;\|&#x27;lastPrice&#x27;\|&#x27;lastSize&#x27;\|&#x27;lastSequence&#x27;)&gt;</code>)** : Fields to include (default all)

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+unsubsTimesaleForex"></a>

### streamer.unsubsTimesaleForex(symbols) ⇒ <code>Array.&lt;object&gt;</code>

Unsbscribe from Timesale Forex updates

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to unsubscribe from

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+getChartHistoryFutures"></a>

### streamer.getChartHistoryFutures(symbols, options) ⇒ <code>Array.&lt;object&gt;</code>

Get historical data for Futures

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols
- **options ([<code>ChartHistoryFuturesOptions</code>](#ChartHistoryFuturesOptions))** : Chart history futures options

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+subsLevelOneEquity"></a>

### streamer.subsLevelOneEquity(symbols, [fields]) ⇒ <code>Array.&lt;object&gt;</code>

Subscribe to Level One Equity service

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to subscribe to
- **[fields] (<code>Array.&lt;(&#x27;symbol&#x27;\|&#x27;bidPrice&#x27;\|&#x27;askPrice&#x27;\|&#x27;lastPrice&#x27;\|&#x27;bidSize&#x27;\|&#x27;askSize&#x27;\|&#x27;askID&#x27;\|&#x27;bidID&#x27;\|&#x27;totalVolume&#x27;\|&#x27;lastSize&#x27;\|&#x27;tradeTime&#x27;\|&#x27;quoteTime&#x27;\|&#x27;highPrice&#x27;\|&#x27;lowPrice&#x27;\|&#x27;bidTick&#x27;\|&#x27;closePrice&#x27;\|&#x27;exchangeID&#x27;\|&#x27;marginable&#x27;\|&#x27;shortable&#x27;\|&#x27;quoteDay&#x27;\|&#x27;tradeDay&#x27;\|&#x27;volatility&#x27;\|&#x27;description&#x27;\|&#x27;lastID&#x27;\|&#x27;digits&#x27;\|&#x27;openPrice&#x27;\|&#x27;netChange&#x27;\|&#x27;52WeekHigh&#x27;\|&#x27;52WeekLow&#x27;\|&#x27;peRatio&#x27;\|&#x27;dividendAmount&#x27;\|&#x27;dividendYield&#x27;\|&#x27;nav&#x27;\|&#x27;fundPrice&#x27;\|&#x27;exchangeName&#x27;\|&#x27;dividendDate&#x27;\|&#x27;regularMarketQuote&#x27;\|&#x27;regularMarketTrade&#x27;\|&#x27;regularMarketLastPrice&#x27;\|&#x27;regularMarketLastSize&#x27;\|&#x27;regularMarketTradeTime&#x27;\|&#x27;regularMarketTradeDay&#x27;\|&#x27;regularMarketNetChange&#x27;\|&#x27;securityStatus&#x27;\|&#x27;mark&#x27;\|&#x27;quoteTimeInLong&#x27;\|&#x27;tradeTimeInLong&#x27;\|&#x27;regularMarketTradeTimeInLong&#x27;)&gt;</code>)** : Fields to include (default all)

**Returns**

- **<code>Array.&lt;object&gt;</code>** : object


<br><a name="TDStreamer+unsubsLevelOneEquity"></a>

### streamer.unsubsLevelOneEquity(symbols) ⇒ <code>Array.&lt;object&gt;</code>

Unsbscribe from Level One Equity service

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to unsubscribe from

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+subsLevelOneFutures"></a>

### streamer.subsLevelOneFutures(symbols, [fields]) ⇒ <code>Array.&lt;object&gt;</code>

Subscribe to Level One Equity service

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to subscribe to
- **[fields] (<code>Array.&lt;(&#x27;symbol&#x27;\|&#x27;bidPrice&#x27;\|&#x27;askPrice&#x27;\|&#x27;lastPrice&#x27;\|&#x27;bidSize&#x27;\|&#x27;askSize&#x27;\|&#x27;askID&#x27;\|&#x27;bidID&#x27;\|&#x27;totalVolume&#x27;\|&#x27;lastSize&#x27;\|&#x27;quoteTime&#x27;\|&#x27;tradeTime&#x27;\|&#x27;highPrice&#x27;\|&#x27;lowPrice&#x27;\|&#x27;closePrice&#x27;\|&#x27;exchangeID&#x27;\|&#x27;description&#x27;\|&#x27;lastID&#x27;\|&#x27;openPrice&#x27;\|&#x27;netChange&#x27;\|&#x27;futurePercentChange&#x27;\|&#x27;exhangeName&#x27;\|&#x27;securityStatus&#x27;\|&#x27;openInterest&#x27;\|&#x27;mark&#x27;\|&#x27;tick&#x27;\|&#x27;tickAmount&#x27;\|&#x27;product&#x27;\|&#x27;futurePriceFormat&#x27;\|&#x27;futureTradingHours&#x27;\|&#x27;futureIsTradable&#x27;\|&#x27;futureMultiplier&#x27;\|&#x27;futureIsActive&#x27;\|&#x27;futureSettlementPrice&#x27;\|&#x27;futureActiveSymbol&#x27;\|&#x27;futureExpirationDate&#x27;)&gt;</code>)** : Fields to include (default all)

**Returns**

- **<code>Array.&lt;object&gt;</code>** : object


<br><a name="TDStreamer+unsubsLevelOneFutures"></a>

### streamer.unsubsLevelOneFutures(symbols) ⇒ <code>Array.&lt;object&gt;</code>

Unsbscribe from Level One Futures service

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to unsubscribe from

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TDStreamer+subsLevelOneOption"></a>

### streamer.subsLevelOneOption(symbols, [fields]) ⇒ <code>Array.&lt;object&gt;</code>

Subscribe to Level One Option service

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to subscribe to
- **[fields] (<code>Array.&lt;(&#x27;symbol&#x27;\|&#x27;bidPrice&#x27;\|&#x27;askPrice&#x27;\|&#x27;lastPrice&#x27;\|&#x27;bidSize&#x27;\|&#x27;askSize&#x27;\|&#x27;askID&#x27;\|&#x27;bidID&#x27;\|&#x27;totalVolume&#x27;\|&#x27;lastSize&#x27;\|&#x27;quoteTime&#x27;\|&#x27;tradeTime&#x27;\|&#x27;highPrice&#x27;\|&#x27;lowPrice&#x27;\|&#x27;closePrice&#x27;\|&#x27;exchangeID&#x27;\|&#x27;description&#x27;\|&#x27;lastID&#x27;\|&#x27;openPrice&#x27;\|&#x27;netChange&#x27;\|&#x27;futurePercentChange&#x27;\|&#x27;exhangeName&#x27;\|&#x27;securityStatus&#x27;\|&#x27;openInterest&#x27;\|&#x27;mark&#x27;\|&#x27;tick&#x27;\|&#x27;tickAmount&#x27;\|&#x27;product&#x27;\|&#x27;futurePriceFormat&#x27;\|&#x27;futureTradingHours&#x27;\|&#x27;futureIsTradable&#x27;\|&#x27;futureMultiplier&#x27;\|&#x27;futureIsActive&#x27;\|&#x27;futureSettlementPrice&#x27;\|&#x27;futureActiveSymbol&#x27;\|&#x27;futureExpirationDate&#x27;)&gt;</code>)** : Fields to include (default all)

**Returns**

- **<code>Array.&lt;object&gt;</code>** : object


<br><a name="TDStreamer+unsubsLevelOneOption"></a>

### streamer.unsubsLevelOneOption(symbols) ⇒ <code>Array.&lt;object&gt;</code>

Unsbscribe from Level One Option service

**Arguments**

- **symbols (<code>string</code> | <code>Array.&lt;string&gt;</code>)** : Ticker symbols to unsubscribe from

**Returns**

- **<code>Array.&lt;object&gt;</code>** : The request objects sent to the server


<br><a name="TypeDefinitions"></a>

## Type Definitions

<br><a name="Config"></a>

## Config : <code>object</code>


**Properties**

- **baseURL (<code>string</code>)** : TD Ameritrade's API URL
- **apiKey (<code>string</code>)** : The API key (Client ID) provided by TD Ameritrade
- **refreshAndRetry (<code>boolean</code>)** : Refresh token and retry request if a 401 response is received
- **returnFullResponse (<code>boolean</code>)** : Return the full axios response instead of only the data
- **accessToken (<code>string</code>)** : The OAuth2 access token
- **refreshToken (<code>string</code>)** : The OAuth2 refresh token
- **accessTokenExpiresAt (<code>string</code>)** : The access token's date and time of expiration
- **refreshTokenExpiresAt (<code>string</code>)** : The refresh token's date and time of expiration
- **redirectUri (<code>string</code>)** : The local uri to receive the access code from TD Ameritrade's OAuth2
- **sslKey (<code>string</code>)** : The path to your private SSL key
- **sslCert (<code>string</code>)** : The path to your public SSL key


<br><a name="AccountFields"></a>

## AccountFields : <code>&#x27;positions&#x27;</code> \| <code>&#x27;orders&#x27;</code>



<br><a name="Preferences"></a>

## Preferences : <code>object</code>


**Properties**

- **expressTrading (<code>boolean</code>)** : Express trading
- **defaultEquityOrderLegInstruction (<code>&#x27;BUY&#x27;</code> \| <code>&#x27;SELL&#x27;</code> \| <code>&#x27;BUY\_TO\_COVER&#x27;</code> \| <code>&#x27;SELL\_SHORT&#x27;</code> \| <code>&#x27;NONE&#x27;</code>)** : Default equity order leg instruction
- **defaultEquityOrderType (<code>&#x27;MARKET&#x27;</code> \| <code>&#x27;LIMIT&#x27;</code> \| <code>&#x27;STOP&#x27;</code> \| <code>&#x27;STOP\_LIMIT&#x27;</code> \| <code>&#x27;TRAILING\_STOP&#x27;</code> \| <code>&#x27;MARKET\_ON\_CLOSE&#x27;</code> \| <code>&#x27;NONE&#x27;</code>)** : Default order type
- **defaultEquityOrderPriceLinkType (<code>&#x27;VALUE&#x27;</code> \| <code>&#x27;PERCENT&#x27;</code> \| <code>&#x27;NONE&#x27;</code>)** : Default equity order price link type
- **defaultEquityOrderDuration (<code>&#x27;DAY&#x27;</code> \| <code>&#x27;GOOD\_TILL\_CANCEL&#x27;</code> \| <code>&#x27;NONE&#x27;</code>)** : Default equity order duration
- **defaultEquityOrderMarketSession (<code>&#x27;AM&#x27;</code> \| <code>&#x27;PM&#x27;</code> \| <code>&#x27;NORMAL&#x27;</code> \| <code>&#x27;SEAMLESS&#x27;</code> \| <code>&#x27;NONE&#x27;</code>)** : Default equity order market session
- **defaultEquityQuantity (<code>number</code>)** : Default equity quantity
- **mutualFundTaxLotMethod (<code>&#x27;FIFO&#x27;</code> \| <code>&#x27;LIFO&#x27;</code> \| <code>&#x27;HIGH\_COST&#x27;</code> \| <code>&#x27;LOW\_COST&#x27;</code> \| <code>&#x27;MINIMUM\_TAX&#x27;</code> \| <code>&#x27;AVERAGE\_COST&#x27;</code> \| <code>&#x27;NONE&#x27;</code>)** : Mutual fund taxlot method
- **optionTaxLotMethod (<code>&#x27;FIFO&#x27;</code> \| <code>&#x27;LIFO&#x27;</code> \| <code>&#x27;HIGH\_COST&#x27;</code> \| <code>&#x27;LOW\_COST&#x27;</code> \| <code>&#x27;MINIMUM\_TAX&#x27;</code> \| <code>&#x27;AVERAGE\_COST&#x27;</code> \| <code>&#x27;NONE&#x27;</code>)** : Option taxlot method
- **equityTaxLotMethod (<code>&#x27;FIFO&#x27;</code> \| <code>&#x27;LIFO&#x27;</code> \| <code>&#x27;HIGH\_COST&#x27;</code> \| <code>&#x27;LOW\_COST&#x27;</code> \| <code>&#x27;MINIMUM\_TAX&#x27;</code> \| <code>&#x27;AVERAGE\_COST&#x27;</code> \| <code>&#x27;NONE&#x27;</code>)** : Equity taxlot method
- **defaultAdvancedToolLaunch (<code>&#x27;TA&#x27;</code> \| <code>&#x27;N&#x27;</code> \| <code>&#x27;Y&#x27;</code> \| <code>&#x27;TOS&#x27;</code> \| <code>&#x27;NONE&#x27;</code> \| <code>&#x27;CC2&#x27;</code>)** : Default advanced tool launch
- **authTokenTimeout (<code>&#x27;FIFTY\_FIVE\_MINUTES&#x27;</code> \| <code>&#x27;TWO\_HOURS&#x27;</code> \| <code>&#x27;FOUR\_HOURS&#x27;</code> \| <code>&#x27;EIGHT\_HOURS&#x27;</code>)** : Auth token timeout


<br><a name="UserPrincipalFields"></a>

## UserPrincipalFields : <code>&#x27;streamerSubscriptionKeys&#x27;</code> \| <code>&#x27;streamerConnectionInfo&#x27;</code> \| <code>&#x27;preferences&#x27;</code> \| <code>&#x27;surrogateIds&#x27;</code>



<br><a name="Market"></a>

## Market : <code>&#x27;EQUITY&#x27;</code> \| <code>&#x27;OPTION&#x27;</code> \| <code>&#x27;FUTURE&#x27;</code> \| <code>&#x27;BOND&#x27;</code> \| <code>&#x27;FOREX&#x27;</code>



<br><a name="PriceHistoryQuery"></a>

## PriceHistoryQuery : <code>object</code>


**Properties**

- **periodType (<code>&#x27;day&#x27;</code> \| <code>&#x27;month&#x27;</code> \| <code>&#x27;year&#x27;</code> \| <code>&#x27;ytd&#x27;</code>)** : The type of period to show
- **period (<code>1</code> \| <code>2</code> \| <code>3</code> \| <code>4</code> \| <code>5</code> \| <code>6</code> \| <code>10</code> \| <code>15</code> \| <code>20</code>)** : The number of periods to show
     - `day` : 1, 2, 3, 4, 5, 10*
     - `month` : 1*, 2, 3, 6
     - `year` : 1*, 2, 3, 5, 10, 15, 20
     - `ytd` : 1*
- **frequencyType (<code>&#x27;minute&#x27;</code> \| <code>&#x27;daily&#x27;</code> \| <code>&#x27;weekly&#x27;</code> \| <code>&#x27;monthly&#x27;</code>)** : The type of frequency with which a new candle is formed
     - `day` : minute*
     - `month` : daily, weekly*
     - `year` : daily, weekly, monthly*
     - `ytd` : daily, weekly*
- **frequency (<code>1</code> \| <code>5</code> \| <code>10</code> \| <code>15</code> \| <code>30</code>)** : The number of the `frequencyType` to be included in each candle.
Valid frequencies by `frequencyType` (defaults marked with an asterisk):
     - minute: 1*, 5, 10, 15, 30
     - daily: 1*
     - weekly: 1*
     - monthly: 1*
- **startDate (<code>string</code>)** : Start date as milliseconds since epoch. If `startDate` and `endDate` are provided, period should not be provided
- **endDate (<code>string</code>)** : End date as milliseconds since epoch. If `startDate` and `endDate` are provided, period should not be provided. Default is previous trading day
- **needExtendedHoursData (<code>boolean</code>)** : Include extended hours data. Default is `true`


<br><a name="OptionStrategy"></a>

## OptionStrategy : <code>&#x27;SINGLE&#x27;</code> \| <code>&#x27;ANALYTICAL&#x27;</code> \| <code>&#x27;COVERED&#x27;</code> \| <code>&#x27;VERTICAL&#x27;</code> \| <code>&#x27;CALENDAR&#x27;</code> \| <code>&#x27;STRANGLE&#x27;</code> \| <code>&#x27;STRADDLE&#x27;</code> \| <code>&#x27;BUTTERFLY&#x27;</code> \| <code>&#x27;CONDOR&#x27;</code> \| <code>&#x27;DIAGONAL&#x27;</code> \| <code>&#x27;COLLAR&#x27;</code> \| <code>&#x27;ROLL&#x27;</code>



<br><a name="OptionChainQuery"></a>

## OptionChainQuery : <code>object</code>


**Properties**

- **contractType (<code>&#x27;CALL&#x27;</code> \| <code>&#x27;PUT&#x27;</code> \| <code>&#x27;ALL&#x27;</code>)** : Type of contracts to return in the chain. Default is `ALL`
- **strikeCount (<code>number</code>)** : The number of strikes to return above and below the at-the-money price
- **includeQuotes (<code>boolean</code>)** : Include quotes for options in the option chain. Default is `false`
- **strategy ([<code>OptionStrategy</code>](#OptionStrategy))** : Passing a value returns a Strategy Chain. Default is `SINGLE`
- **interval ([<code>OptionStrategy</code>](#OptionStrategy))** : Strike interval for spread strategy chains
- **strike (<code>number</code>)** : Provide a strike price to return options only at that strike price
- **range (<code>&#x27;ITM&#x27;</code> \| <code>&#x27;NTM&#x27;</code> \| <code>&#x27;OTM&#x27;</code> \| <code>&#x27;SAK&#x27;</code> \| <code>&#x27;SBK&#x27;</code> \| <code>&#x27;SNK&#x27;</code> \| <code>&#x27;ALL&#x27;</code>)** : Returns options for the given range. Default is `ALL`
    - `ITM` : In-the-money
    - `NTM` : Near-the-money
    - `OTM` : Out-of-the-money
    - `SAK` : Strikes Above Market
    - `SBK` : Strikes Below Market
    - `SNK` : Strikes Near Market
    - `ALL` : All Strikes
- **fromDate (<code>string</code>)** : Only return expirations after this date. For strategies, expiration refers
to the nearest term expiration in the strategy. Valid ISO-8601 formats are: `yyyy-MM-dd` and `yyyy-MM-dd'T'HH:mm:ssz`
- **toDate (<code>string</code>)** : Only return expirations before this date. For strategies, expiration refers
to the nearest term expiration in the strategy. Valid ISO-8601 formats are: `yyyy-MM-dd` and `yyyy-MM-dd'T'HH:mm:ssz`
- **volatility ([<code>OptionStrategy</code>](#OptionStrategy))** : Volatility to use in calculations.Applies only to `ANALYTICAL` strategy chains
- **underlyingPrice ([<code>OptionStrategy</code>](#OptionStrategy))** : Underlying price to use in calculations.Applies only to ANALYTICAL strategy chains
- **interestRate ([<code>OptionStrategy</code>](#OptionStrategy))** : Interest rate to use in calculations.Applies only to ANALYTICAL strategy chains
- **daysToExpiration ([<code>OptionStrategy</code>](#OptionStrategy))** : Days to expiration to use in calculations.Applies only to ANALYTICAL strategy chains
- **expMonth (<code>string</code>)** : Return only options expiring in the specified month. Month is given in the three
character format (eg. `JAN`). Default is ALL
- **optionType (<code>&#x27;S&#x27;</code> \| <code>&#x27;NS&#x27;</code> \| <code>&#x27;ALL&#x27;</code>)** : Type of contracts to return. Default is `ALL`


<br><a name="OrderStatus"></a>

## OrderStatus : <code>&#x27;AWAITING\_PARENT\_ORDER&#x27;</code> \| <code>&#x27;AWAITING\_CONDITION&#x27;</code> \| <code>&#x27;AWAITING\_MANUAL\_REVIEW&#x27;</code> \| <code>&#x27;ACCEPTED&#x27;</code> \| <code>&#x27;AWAITING\_UR\_OUT&#x27;</code> \| <code>&#x27;PENDING\_ACTIVATION&#x27;</code> \| <code>&#x27;QUEUED&#x27;</code> \| <code>&#x27;WORKING&#x27;</code> \| <code>&#x27;REJECTED&#x27;</code> \| <code>&#x27;PENDING\_CANCEL&#x27;</code> \| <code>&#x27;CANCELED&#x27;</code> \| <code>&#x27;PENDING\_REPLACE&#x27;</code> \| <code>&#x27;REPLACED&#x27;</code> \| <code>&#x27;FILLED&#x27;</code> \| <code>&#x27;EXPIRED&#x27;</code>



<br><a name="OrdersQuery"></a>

## OrdersQuery : <code>object</code>


**Properties**

- **maxResults (<code>number</code>)** : The max number of orders to retrieve.
- **fromEnteredTime (<code>string</code>)** : Specifies that no orders entered before this time should be returned. Valid
ISO-8601 formats are: `yyyy-MM-dd`. Date must be within 60 days from today's date. `toEnteredTime` must also be set.
- **toEnteredTime (<code>string</code>)** : Specifies that no orders entered after this time should be returned. Valid
ISO-8601 formats are: `yyyy-MM-dd`. `fromEnteredTime` must also be set.
- **status ([<code>OrderStatus</code>](#OrderStatus))** : Specifies that only orders of this status should be returned.


<br><a name="TransactionQuery"></a>

## TransactionQuery : <code>object</code>


**Properties**

- **type (<code>&#x27;ALL&#x27;</code> \| <code>&#x27;TRADE&#x27;</code> \| <code>&#x27;BUY\_ONLY&#x27;</code> \| <code>&#x27;SELL\_ONLY&#x27;</code> \| <code>&#x27;CASH\_IN\_OR\_CASH\_OUT&#x27;</code> \| <code>&#x27;CHECKING&#x27;</code> \| <code>&#x27;DIVIDEND&#x27;</code> \| <code>&#x27;INTEREST&#x27;</code> \| <code>&#x27;OTHER&#x27;</code> \| <code>&#x27;ADVISOR\_FEES&#x27;</code>)** : Only transactions with the specified type will be returned.
- **symbol (<code>string</code>)** : Only transactions with the specified symbol will be returned.
- **startDate (<code>string</code>)** : Only transactions after the Start Date will be returned.
Note: The maximum date range is one year. Valid ISO-8601 formats are: `yyyy-MM-dd`.
- **endDate (<code>string</code>)** : Only transactions before the End Date will be returned.
Note: The maximum date range is one year. Valid ISO-8601 formats are: `yyyy-MM-dd`.


<br><a name="WatchlistInstrument"></a>

## WatchlistInstrument : <code>object</code>


**Properties**

- **symbol (<code>string</code>)** : Symbol
- **description (<code>string</code>)** : Description
- **assetType (<code>&#x27;EQUITY&#x27;</code> \| <code>&#x27;OPTION&#x27;</code> \| <code>&#x27;MUTUAL\_FUND&#x27;</code> \| <code>&#x27;FIXED\_INCOME&#x27;</code> \| <code>&#x27;INDEX&#x27;</code>)** : Asset type


<br><a name="WatchlistItem"></a>

## WatchlistItem : <code>object</code>


**Properties**

- **instrument ([<code>WatchlistInstrument</code>](#WatchlistInstrument))** : Instrument


<br><a name="Watchlist"></a>

## Watchlist : <code>object</code>


**Properties**

- **name (<code>string</code>)** : Name
- **watchlistItems ([<code>Array.&lt;WatchlistItem&gt;</code>](#WatchlistItem))** : Items


<br><a name="State"></a>

## State : <code>&#x27;connecting&#x27;</code> \| <code>&#x27;connected&#x27;</code> \| <code>&#x27;authenticated&#x27;</code> \| <code>&#x27;disconnecting&#x27;</code> \| <code>&#x27;disconnected&#x27;</code>



<br><a name="Event"></a>

## Event : <code>&#x27;state\_change&#x27;</code> \| <code>&#x27;message&#x27;</code> \| <code>&#x27;account\_activity&#x27;</code> \| <code>&#x27;chart&#x27;</code> \| <code>&#x27;news\_headline&#x27;</code> \| <code>&#x27;timesale&#x27;</code> \| <code>&#x27;level\_one\_equity&#x27;</code> \| <code>&#x27;level\_one\_futures&#x27;</code> \| <code>&#x27;level\_one\_option&#x27;</code> \| <code>&#x27;chart\_history\_futures&#x27;</code> \| <code>&#x27;error&#x27;</code>



<br><a name="Error"></a>

## Error : <code>&#x27;unknown\_error&#x27;</code> \| <code>&#x27;unknown\_message&#x27;</code> \| <code>&#x27;unknown\_response&#x27;</code> \| <code>&#x27;unknown\_notification&#x27;</code> \| <code>&#x27;unknown\_data&#x27;</code> \| <code>&#x27;invalid\_message&#x27;</code> \| <code>&#x27;connection\_refused&#x27;</code> \| <code>&#x27;authentication\_failed&#x27;</code>



<br><a name="DisconnectOptions"></a>

## DisconnectOptions : <code>object</code>


**Properties**

- **force (<code>boolean</code>)** : Disconnect immediately


<br><a name="Request"></a>

## Request : <code>object</code>

The request object


**Properties**

- **requestid (<code>string</code>)** : A unique request identifier
- **service (<code>string</code>)** : The service name
- **parameters (<code>object</code>)** : The service parameters
- **command (<code>string</code>)** : The command


<br><a name="Service"></a>

## Service : <code>object</code>

The service object


**Properties**

- **requestid (<code>string</code>)** : A unique request identifier
- **service (<code>string</code>)** : The service name
- **parameters (<code>object</code>)** : The service parameters


<br><a name="ChartHistoryFuturesOptions"></a>

## ChartHistoryFuturesOptions : <code>object</code>

The Chart history futures options object


**Properties**

- **frequency (<code>&#x27;m1&#x27;</code> \| <code>&#x27;m5&#x27;</code> \| <code>&#x27;m10&#x27;</code> \| <code>&#x27;m30&#x27;</code> \| <code>&#x27;h1&#x27;</code> \| <code>&#x27;d1&#x27;</code> \| <code>&#x27;w1&#x27;</code> \| <code>&#x27;n1&#x27;</code>)** : Frequency
- **period (<code>string</code>)** : Time period. eg. d5, w4, n10, y1, y10 (d=day, w=week, n=month, y=year)
- **START_TIME (<code>string</code>)** : Start time of chart in milliseconds since Epoch
- **END_TIME (<code>string</code>)** : End time of chart in milliseconds since Epoch

