'use strict'

const debug = require('debug')('ameritrade:tests') // eslint-disable-line no-unused-vars
// require('debug').enable('ameritrade:tests')

const WS = require('jest-websocket-mock').default

const TDStreamer = require('../src/streamer')
const userPrincipals = require('./setup/userPrincipals.fixture')

const cuid = require('cuid')
jest.mock('cuid')
cuid.mockImplementation(() => 'test_requestid')

describe('TDStreamer', () => {
    let server, streamer
    beforeEach(async () => {
        server = new WS('wss://localhost:3331/ws', { jsonProtocol: true })
        streamer = new TDStreamer(userPrincipals)
        streamer.connect()
        await server.connected
        await server.nextMessage
    })

    afterEach(() => {
        WS.clean()
    })
    describe('.connect()', () => {
        it('should connect and authenticate to the server', async () => {
            const streamer = new TDStreamer(userPrincipals)
            streamer.connect()
            await server.connected
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    account: '123456789',
                    source: 'test_appId',
                    service: 'ADMIN',
                    command: 'LOGIN',
                    parameters: {
                        credential: 'userid=123456789&token=test_token&company=AMER&segment=AMER&cddomain=A000000011111111&usergroup=ACCT&accesslevel=ACCT&authorized=Y&timestamp=1577836800000&appid=test_appId&acl=test_acl',
                        token: 'test_token',
                        version: '1.0',
                    }
                }]
            })
        }) // test
    }) // group

    describe('.createRequest()', () => {
        it('should create a request object', done => {
            const request = streamer.createRequest({
                service: 'SRV',
                command: 'CMD',
                parameters: {
                    param1: 'value1',
                    param2: 'value2',
                }
            })
            expect(request).toEqual({
                requests: [{
                    requestid: 'test_requestid',
                    account: '123456789',
                    source: 'test_appId',
                    service: 'SRV',
                    command: 'CMD',
                    parameters: {
                        param1: 'value1',
                        param2: 'value2',
                    }
                }]
            })
            done()
        }) // test
        it('should create a request with a user defined requestid', done => {
            const request = streamer.createRequest({
                requestid: 'custom_id',
                service: 'SRV',
                command: 'CMD',
            })
            expect(request).toEqual({
                requests: [{
                    requestid: 'custom_id',
                    account: '123456789',
                    source: 'test_appId',
                    service: 'SRV',
                    command: 'CMD',
                }]
            })
            done()
        }) // test
    }) // group

    describe('.sendRequest()', () => {
        it('should create and send a request to the server', async () => {
            streamer.sendRequest({
                service: 'SRV',
                command: 'CMD',
                parameters: {
                    param1: 'value1',
                    param2: 'value2',
                }
            })
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    account: '123456789',
                    source: 'test_appId',
                    service: 'SRV',
                    command: 'CMD',
                    parameters: {
                        param1: 'value1',
                        param2: 'value2',
                    }
                }]
            })
        }) // test
        it('should create and send a request to the server with a user defined requestid', async () => {
            streamer.sendRequest({
                requestid: 'custom_id',
                service: 'SRV',
                command: 'CMD',
            })
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'custom_id',
                    account: '123456789',
                    source: 'test_appId',
                    service: 'SRV',
                    command: 'CMD',
                }]
            })
        }) // test
        it('should create and send multiple requests to the server in a single message', async () => {
            streamer.sendRequest([{
                requestid: 'custom_id_1',
                service: 'SRV_1',
                command: 'CMD_1',
            }, {
                requestid: 'custom_id_2',
                service: 'SRV_2',
                command: 'CMD_2',
            }])
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'custom_id_1',
                    account: '123456789',
                    source: 'test_appId',
                    service: 'SRV_1',
                    command: 'CMD_1',
                }, {
                    requestid: 'custom_id_2',
                    account: '123456789',
                    source: 'test_appId',
                    service: 'SRV_2',
                    command: 'CMD_2',
                }]
            })
        }) // test
        it('should return the request object', done => {
            const request = streamer.sendRequest({
                requestid: 'custom_id',
                service: 'SRV',
                command: 'CMD',
            })
            expect(request).toEqual({
                requests: [{
                    requestid: 'custom_id',
                    account: '123456789',
                    source: 'test_appId',
                    service: 'SRV',
                    command: 'CMD',
                }]
            })
            done()
        }) // test
    }) // group

    describe('.send()', () => {
        it('should send a JSON message to the server', async () => {
            streamer.send({ message: 'test' })
            await expect(server).toReceiveMessage({ message: 'test' })
        }) // test
    }) // group

    describe('.subscribe()', () => {
        it('should send a subscribtion request to the server', async () => {
            streamer.subscribe({
                service: 'SRV',
                parameters: {
                    param1: 'value1',
                    param2: 'value2',
                }
            })
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'SRV',
                    command: 'SUBS',
                    parameters: {
                        param1: 'value1',
                        param2: 'value2',
                    }
                }]
            })
        }) // test
        it('should send a subscribtion request to the server with a user defined requestid', async () => {
            streamer.subscribe({
                requestid: 'custom_id',
                service: 'SRV',
            })
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'custom_id',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'SRV',
                    command: 'SUBS',
                }]
            })
        }) // test
        it('should send multiple subscription requests to the server in a single message', async () => {
            streamer.subscribe([{ service: 'SRV_1' }, { service: 'SRV_2' }])
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'SRV_1',
                    command: 'SUBS',
                }, {
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'SRV_2',
                    command: 'SUBS',
                }]
            })
        }) // test
        it('should return the request object', done => {
            const request = streamer.subscribe({
                requestid: 'custom_id',
                service: 'SRV',
            })
            expect(request).toEqual({
                requests: [{
                    requestid: 'custom_id',
                    account: '123456789',
                    source: 'test_appId',
                    service: 'SRV',
                    command: 'SUBS',
                }]
            })
            done()
        }) // test
    }) // group

    describe('.unsubscribe()', () => {
        it('should send an unsubscribe request to the server', async () => {
            streamer.unsubscribe({
                service: 'SRV',
                parameters: {
                    param1: 'value1',
                    param2: 'value2',
                }
            })
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'SRV',
                    command: 'UNSUBS',
                    parameters: {
                        param1: 'value1',
                        param2: 'value2',
                    }
                }]
            })
        }) // test
        it('should send an unsubscribe request to the server with a user defined requestid', async () => {
            streamer.unsubscribe({
                requestid: 'custom_id',
                service: 'SRV',
            })
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'custom_id',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'SRV',
                    command: 'UNSUBS',
                }]
            })
        }) // test
        it('should send multiple unsubscribe requests to the server in a single message', async () => {
            streamer.unsubscribe([{ service: 'SRV_1' }, { service: 'SRV_2' }])
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'SRV_1',
                    command: 'UNSUBS',
                }, {
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'SRV_2',
                    command: 'UNSUBS',
                }]
            })
        }) // test
        it('should return the request object', done => {
            const request = streamer.unsubscribe({
                requestid: 'custom_id',
                service: 'SRV',
            })
            expect(request).toEqual({
                requests: [{
                    requestid: 'custom_id',
                    account: '123456789',
                    source: 'test_appId',
                    service: 'SRV',
                    command: 'UNSUBS',
                }]
            })
            done()
        }) // test
    }) // group

    describe('.setQOS()', () => {
        it('should send a QOS request to the server', async () => {
            streamer.setQOS('realtime')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'ADMIN',
                    command: 'QOS',
                    parameters: { qoslevel: 1 },
                }]
            })
        }) // test
        it('should return the request object', done => {
            const request = streamer.setQOS('realtime')
            expect(request).toEqual({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'ADMIN',
                    command: 'QOS',
                    parameters: { qoslevel: 1 },
                }]
            })
            done()
        }) // test
    }) // group

    describe('.subsAccountActivity()', () => {
        it('should subscribe for Account Activity updates', async () => {
            streamer.subsAccountActivity()
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'ACCT_ACTIVITY',
                    command: 'SUBS',
                    parameters: {
                        keys: 'test_key',
                        fields: '0,1,2,3'
                    }
                }]
            })
        }) // test
        it('should choose which fields to subscribe for', async () => {
            streamer.subsAccountActivity(['accountNumber', 'messageData', 'subscriptionKey'])
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'ACCT_ACTIVITY',
                    command: 'SUBS',
                    parameters: {
                        keys: 'test_key',
                        fields: '1,3,0'
                    }
                }]
            })
        }) // test
    }) // group

    describe('.unsubsAccountActivity()', () => {
        it('should unsubscribe from Account Activity updates', async () => {
            streamer.unsubsAccountActivity()
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'ACCT_ACTIVITY',
                    command: 'UNSUBS',
                }]
            })
        }) // test
    }) // group

    describe('.subsChartEquity()', () => {
        it('should subscribe to Chart Equity updates', async () => {
            streamer.subsChartEquity('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'CHART_EQUITY',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,1,2,3,4,5,6,7',
                    }
                }]
            })
        }) // test
        it('should choose which fields to subscribe for', async () => {
            streamer.subsChartEquity('SYMBOL', ['key', 'openPrice', 'closePrice'])
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'CHART_EQUITY',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,1,4',
                    }
                }]
            })
        }) // test
    }) // group

    describe('.unsubsChartEquity()', () => {
        it('should unsubscribe from Chart Equity updates', async () => {
            streamer.unsubsChartEquity('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'CHART_EQUITY',
                    command: 'UNSUBS',
                    parameters: {
                        keys: 'SYMBOL'
                    }
                }]
            })
        }) // test
    }) // group

    describe('.subsChartFutures()', () => {
        it('should subscribe to Chart Futures updates', async () => {
            streamer.subsChartFutures('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'CHART_FUTURES',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,1,2,3,4,5,6',
                    }
                }]
            })
        }) // test
        it('should choose which fields to subscribe for', async () => {
            streamer.subsChartFutures('SYMBOL', ['key', 'openPrice', 'closePrice'])
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'CHART_FUTURES',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,2,5',
                    }
                }]
            })
        }) // test
    }) // group

    describe('.unsubsChartFutures()', () => {
        it('should unsubscribe from Chart Futures updates', async () => {
            streamer.unsubsChartFutures('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'CHART_FUTURES',
                    command: 'UNSUBS',
                    parameters: {
                        keys: 'SYMBOL'
                    }
                }]
            })
        }) // test
    }) // group

    describe('.subsChartOptions()', () => {
        it('should subscribe to Chart Options updates', async () => {
            streamer.subsChartOptions('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'CHART_FUTURES',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,1,2,3,4,5,6',
                    }
                }]
            })
        }) // test
        it('should choose which fields to subscribe for', async () => {
            streamer.subsChartOptions('SYMBOL', ['key', 'openPrice', 'closePrice'])
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'CHART_FUTURES',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,2,5',
                    }
                }]
            })
        }) // test
    }) // group

    describe('.unsubsChartOptions()', () => {
        it('should unsubscribe from Chart Options updates', async () => {
            streamer.unsubsChartOptions('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'CHART_FUTURES',
                    command: 'UNSUBS',
                    parameters: {
                        keys: 'SYMBOL'
                    }
                }]
            })
        }) // test
    }) // group

    describe('.subsNewsHeadline()', () => {
        it('should subscribe to Chart Options updates', async () => {
            streamer.subsNewsHeadline('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'NEWS_HEADLINE',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,1,2,3,4,5,6,7,8,9,10',
                    }
                }]
            })
        }) // test
        it('should choose which fields to subscribe for', async () => {
            streamer.subsNewsHeadline('SYMBOL', ['symbol', 'headline'])
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'NEWS_HEADLINE',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,5',
                    }
                }]
            })
        }) // test
    }) // group

    describe('.unsubsNewsHeadline()', () => {
        it('should unsubscribe from Chart Options updates', async () => {
            streamer.unsubsNewsHeadline('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'NEWS_HEADLINE',
                    command: 'UNSUBS',
                    parameters: {
                        keys: 'SYMBOL'
                    }
                }]
            })
        }) // test
    }) // group

    describe('.subsTimesaleEquity()', () => {
        it('should subscribe to Chart Options updates', async () => {
            streamer.subsTimesaleEquity('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'TIMESALE_EQUITY',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,1,2,3,4',
                    }
                }]
            })
        }) // test
        it('should choose which fields to subscribe for', async () => {
            streamer.subsTimesaleEquity('SYMBOL', ['symbol', 'lastPrice'])
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'TIMESALE_EQUITY',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,2',
                    }
                }]
            })
        }) // test
    }) // group

    describe('.unsubsTimesaleEquity()', () => {
        it('should unsubscribe from Chart Options updates', async () => {
            streamer.unsubsTimesaleEquity('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'TIMESALE_EQUITY',
                    command: 'UNSUBS',
                    parameters: {
                        keys: 'SYMBOL'
                    }
                }]
            })
        }) // test
    }) // group

    describe('.subsTimesaleFutures()', () => {
        it('should subscribe to Chart Options updates', async () => {
            streamer.subsTimesaleFutures('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'TIMESALE_FUTURES',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,1,2,3,4',
                    }
                }]
            })
        }) // test
        it('should choose which fields to subscribe for', async () => {
            streamer.subsTimesaleFutures('SYMBOL', ['symbol', 'lastPrice'])
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'TIMESALE_FUTURES',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,2',
                    }
                }]
            })
        }) // test
    }) // group

    describe('.unsubsTimesaleFutures()', () => {
        it('should unsubscribe from Chart Options updates', async () => {
            streamer.unsubsTimesaleFutures('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'TIMESALE_FUTURES',
                    command: 'UNSUBS',
                    parameters: {
                        keys: 'SYMBOL'
                    }
                }]
            })
        }) // test
    }) // group

    describe('.subsTimesaleOptions()', () => {
        it('should subscribe to Chart Options updates', async () => {
            streamer.subsTimesaleOptions('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'TIMESALE_OPTIONS',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,1,2,3,4',
                    }
                }]
            })
        }) // test
        it('should choose which fields to subscribe for', async () => {
            streamer.subsTimesaleOptions('SYMBOL', ['symbol', 'lastPrice'])
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'TIMESALE_OPTIONS',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,2',
                    }
                }]
            })
        }) // test
    }) // group

    describe('.unsubsTimesaleOptions()', () => {
        it('should unsubscribe from Chart Options updates', async () => {
            streamer.unsubsTimesaleOptions('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'TIMESALE_OPTIONS',
                    command: 'UNSUBS',
                    parameters: {
                        keys: 'SYMBOL'
                    }
                }]
            })
        }) // test
    }) // group

    describe('.subsTimesaleForex()', () => {
        it('should subscribe to Chart Options updates', async () => {
            streamer.subsTimesaleForex('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'TIMESALE_FOREX',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,1,2,3,4',
                    }
                }]
            })
        }) // test
        it('should choose which fields to subscribe for', async () => {
            streamer.subsTimesaleForex('SYMBOL', ['symbol', 'lastPrice'])
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'TIMESALE_FOREX',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,2',
                    }
                }]
            })
        }) // test
    }) // group

    describe('.unsubsTimesaleForex()', () => {
        it('should unsubscribe from Chart Options updates', async () => {
            streamer.unsubsTimesaleForex('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'TIMESALE_FOREX',
                    command: 'UNSUBS',
                    parameters: {
                        keys: 'SYMBOL'
                    }
                }]
            })
        }) // test
    }) // group

    describe('.subsChartHistoryFutures()', () => {
        it('should get Chart History Futures data', async () => {
            const mathRandomSpy = jest.spyOn(Math, 'random')
            mathRandomSpy.mockImplementation(() => 1)
            streamer.getChartHistoryFutures('/ES', {
                frequency: 'm1',
                period: 'd1',
            })
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: '2000000000',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'CHART_HISTORY_FUTURES',
                    command: 'GET',
                    parameters: {
                        symbol: '/ES',
                        frequency: 'm1',
                        period: 'd1'
                    }
                }]
            })
        }) // test
    }) // group

    describe('.subsLevelOneEquity()', () => {
        it('should subscribe for Level One Equity updates', async () => {
            streamer.subsLevelOneEquity('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'QUOTE',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,1,2,3,4,5,6,7,8,9,10,11,'  +
                                '12,13,14,15,16,17,18,22,23,' +
                                '24,25,26,27,28,29,30,31,32,' +
                                '33,34,37,38,39,40,41,42,43,' +
                                '44,45,46,47,48,49,50,51,52',
                    }
                }]
            })
        }) // test
        it('should choose which fields to subscribe for', async () => {
            streamer.subsLevelOneEquity('SYMBOL', ['symbol', 'bidPrice', 'askPrice'])
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'QUOTE',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,1,2'
                    }
                }]
            })
        }) // test
    }) // group

    describe('.unsubsLevelOneEquity()', () => {
        it('should unsubscribe from Chart Options updates', async () => {
            streamer.unsubsLevelOneEquity('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'QUOTE',
                    command: 'UNSUBS',
                    parameters: {
                        keys: 'SYMBOL'
                    }
                }]
            })
        }) // test
    }) // group

    describe('.subsLevelOneFutures()', () => {
        it('should subscribe for Level One Futures updates', async () => {
            streamer.subsLevelOneFutures('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'LEVELONE_FUTURES',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,1,2,3,4,5,6,7,8,9,10,11,'  +
                                '12,13,14,15,16,17,18,19,20,' +
                                '21,22,23,24,25,26,27,28,29,' +
                                '30,31,32,33,34,35',
                    }
                }]
            })
        }) // test
        it('should choose which fields to subscribe for', async () => {
            streamer.subsLevelOneFutures('SYMBOL', ['symbol', 'askPrice', 'askSize'])
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'LEVELONE_FUTURES',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,2,5'
                    }
                }]
            })
        }) // test
    }) // group

    describe('.unsubsLevelOneFutures()', () => {
        it('should unsubscribe from Chart Options updates', async () => {
            streamer.unsubsLevelOneFutures('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'LEVELONE_FUTURES',
                    command: 'UNSUBS',
                    parameters: {
                        keys: 'SYMBOL'
                    }
                }]
            })
        }) // test
    }) // group
    
    describe('.subsLevelOneOption()', () => {
        it('should subscribe for Level One Option updates', async () => {
            streamer.subsLevelOneOption('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'OPTION',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,1,2,3,4,5,6,7,8,9,10,11,'  +
                                '12,13,14,15,16,17,18,19,20,' +
                                '21,22,23,24,25,26,27,28,29,' +
                                '30,31,32,33,34,35,36,37,38,' + 
                                '39,40,41',
                    }
                }]
            })
        }) // test
        it('should choose which fields to subscribe for', async () => {
            streamer.subsLevelOneOption('SYMBOL', ['symbol', 'askPrice', 'askSize'])
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'OPTION',
                    command: 'SUBS',
                    parameters: {
                        keys: 'SYMBOL',
                        fields: '0,3,21'
                    }
                }]
            })
        }) // test
    }) // group

    describe('.unsubsLevelOneOption()', () => {
        it('should unsubscribe from level one Options updates', async () => {
            streamer.unsubsLevelOneOption('SYMBOL')
            await expect(server).toReceiveMessage({
                requests: [{
                    requestid: 'test_requestid',
                    source: 'test_appId',
                    account: '123456789',
                    service: 'OPTION',
                    command: 'UNSUBS',
                    parameters: {
                        keys: 'SYMBOL'
                    }
                }]
            })
        }) // test
    }) // group

    describe('Events and Transforms', () => {
        it('should receive CHART_EQUITY data and emit `chart` event', async () => {
            const cb = jest.fn()
            streamer.once('chart', cb)
            // msg will be reflected back to the client
            server.send({
                data: [{
                    service: 'CHART_EQUITY',
                    timestamp: 1594480424741,
                    command: 'SUBS',
                    content: [{
                        '1': 318.01,
                        '2': 318.15,
                        '3': 318.01,
                        '4': 318.1,
                        '5': 4460,
                        '6': 779,
                        '7': 1594425540000,
                        '8': 18453,
                        'seq': 707,
                        'key': 'SPY'
                    }]
                }]
            })
            await expect(cb).toBeCalledTimes(1)
            await expect(cb).toBeCalledWith({
                service: 'CHART_EQUITY',
                timestamp: 1594480424741,
                command: 'SUBS',
                content: [{
                    'key': 'SPY',
                    'seq': 707,
                    'chartTime': 1594425540000,
                    'openPrice': 318.01,
                    'highPrice': 318.15,
                    'lowPrice': 318.01,
                    'closePrice': 318.1,
                    'volume': 4460
                }]
            })
        }) // test
        it('should receive CHART_FUTURES data and emit `chart` event', async () => {
            const cb = jest.fn()
            streamer.once('chart', cb)
            server.send({
                data: [{
                    service: 'CHART_FUTURES',
                    timestamp: 1594418211705,
                    command: 'SUBS',
                    content: [{
                        'seq': 0,
                        'key': '/ES',
                        '1': 1594414740000,
                        '2': 3178.25,
                        '3': 3180.0,
                        '4': 3177.75,
                        '5': 3179.5,
                        '6': 842.0
                    }]
                }]
            })
            await expect(cb).toReturnTimes(1)
            await expect(cb).toBeCalledWith({
                service: 'CHART_FUTURES',
                timestamp: 1594418211705,
                command: 'SUBS',
                content: [{
                    key: '/ES',
                    seq: 0,
                    chartTime: 1594414740000,
                    openPrice: 3178.25,
                    highPrice: 3180,
                    lowPrice: 3177.75,
                    closePrice: 3179.5,
                    volume: 842
                }]
            })
        }) // test
        it('should receive TIMESALE_EQUITY data and emit `timesale` event', async () => {
            const cb = jest.fn()
            streamer.once('timesale', cb)
            server.send({
                data: [{
                    service: 'TIMESALE_EQUITY',
                    timestamp: 1594418966775,
                    command: 'SUBS',
                    content: [{
                        '1': 1594418765976,
                        '2': 0.703,
                        '3': 500,
                        '4': 19519,
                        'seq': 0,
                        'key': 'OAS'
                    }]
                }]
            })
            await expect(cb).toBeCalledTimes(1)
            await expect(cb).toBeCalledWith({
                service: 'TIMESALE_EQUITY',
                timestamp: 1594418966775,
                command: 'SUBS',
                content: [{
                    'key': 'OAS',
                    'seq': 0,
                    'tradeTime': 1594418765976,
                    'lastPrice': 0.703,
                    'lastSize': 500,
                    'lastSequence': 19519
                }]
            })
        }) // test
        it('should receive TIMESALE_FUTURES data and emit `timesale` event', async () => {
            const cb = jest.fn()
            streamer.once('timesale', cb)
            server.send({
                data: [{
                    service: 'TIMESALE_FUTURES',
                    timestamp: 1594426089565,
                    command: 'SUBS',
                    content: [{
                        '1': 1594414799990,
                        '2': 3179.5,
                        '3': 3,
                        '4': 36073384,
                        'seq': 2858,
                        'key': '/ES'
                    }]
                }]
            })
            await expect(cb).toBeCalledTimes(1)
            await expect(cb).toBeCalledWith({
                service: 'TIMESALE_FUTURES',
                timestamp: 1594426089565,
                command: 'SUBS',
                content: [{
                    'key': '/ES',
                    'seq': 2858,
                    'tradeTime': 1594414799990,
                    'lastPrice': 3179.5,
                    'lastSize': 3,
                    'lastSequence': 36073384
                }]
            })
        }) // test
        it('should receive NEWS_HEADLINE data and emit `news_headline` event', async () => {
            const cb = jest.fn()
            streamer.once('news_headline', cb)
            server.send({
                data: [{
                    service: 'NEWS_HEADLINE',
                    timestamp: 1593041176318,
                    command: 'SUBS',
                    content: [{
                        'seq': 11,
                        'key': 'SPY',
                        '1': 0,
                        '2': 1593025258000,
                        '3': 'SN20200624010293',
                        '4': 'D',
                        '5': "MW UPDATE: Investors shouldn't get carried away with momentum stocks while this negative pattern persists",
                        '6': 'SN20200624010293',
                        '7': 1,
                        '8': 'I/XFT1,GOOGL,R/WA,N/DJMW,AAPL,M/RTWS,R/FL,R/NY,P/OAC,I/RTS,R/WEU,M/NND,I/FDS,I/XSTX,N/POV,CUK,N/SN,I/XGDW,N/WEI,SPY,*ALL*,R/CA,I/EXT,I/ATR,R/USS,P/AEQI,I/CPR,R/USW,I/SCR,P/BFX,I/XDJGI,R/EU,N/DJWI,AAL,I/XNQ1,N/ADR,R/USE,R/NME,N/RUBL,FB,I/ISV,M/FCL,I/SOF,I/XEX6,I/XISL,P/SGN,R/TX,I/XRUS,MSFT,I/XRTT,R/PRM,I/XNYA,R/UK,N/HIY,R/MA,N/ETF,I/TAT,P/MWWS,I/XTLT,P/EWR,I/XDJLC,DIA,R/US,I/XDJI,I/RTB,GOOG,I/IAV,M/TEC,N/CNW,CCL.LN,I/XDJT,CCL,I/XSLI,P/ABO,I/XSP1,I/XSP5,M/TRSH,I/XGTI,M/LEAH,N/HDY,AMZN,I/AIR',
                        '9': false,
                        '10': 'DJCNEWS'
                    }]
                }]
            })
            await expect(cb).toBeCalledTimes(1)
            await expect(cb).toBeCalledWith({
                service: 'NEWS_HEADLINE',
                timestamp: 1593041176318,
                command: 'SUBS',
                content: [{
                    key: 'SPY',
                    seq: 11,
                    errorCode: 0,
                    storyDatetime: 1593025258000,
                    headlineID: 'SN20200624010293',
                    status: 'D',
                    headline: "MW UPDATE: Investors shouldn't get carried away with momentum stocks while this negative pattern persists",
                    storyID: 'SN20200624010293',
                    countForKeyword: 1,
                    keywordArray: 'I/XFT1,GOOGL,R/WA,N/DJMW,AAPL,M/RTWS,R/FL,R/NY,P/OAC,I/RTS,R/WEU,M/NND,I/FDS,I/XSTX,N/POV,CUK,N/SN,I/XGDW,N/WEI,SPY,*ALL*,R/CA,I/EXT,I/ATR,R/USS,P/AEQI,I/CPR,R/USW,I/SCR,P/BFX,I/XDJGI,R/EU,N/DJWI,AAL,I/XNQ1,N/ADR,R/USE,R/NME,N/RUBL,FB,I/ISV,M/FCL,I/SOF,I/XEX6,I/XISL,P/SGN,R/TX,I/XRUS,MSFT,I/XRTT,R/PRM,I/XNYA,R/UK,N/HIY,R/MA,N/ETF,I/TAT,P/MWWS,I/XTLT,P/EWR,I/XDJLC,DIA,R/US,I/XDJI,I/RTB,GOOG,I/IAV,M/TEC,N/CNW,CCL.LN,I/XDJT,CCL,I/XSLI,P/ABO,I/XSP1,I/XSP5,M/TRSH,I/XGTI,M/LEAH,N/HDY,AMZN,I/AIR',
                    isHot: false,
                    storySource: 'DJCNEWS'
                }]
            })
        }) // test
        it('should receive QUOTE data and emit `level_one_equity` event', async () => {
            const cb = jest.fn()
            streamer.once('level_one_equity', cb)
            server.send({
                data: [{
                    service: 'QUOTE',
                    command: 'SUBS',
                    timestamp: 1595785007371,
                    content: [{
                        '1': 320.15,
                        '10': 72000,
                        '11': 71995,
                        '12': 321.99,
                        '13': 319.246,
                        '14': ' ',
                        '15': 320.88,
                        '16': 'p',
                        '17': true,
                        '18': true,
                        '2': 320.3,
                        '22': 18467,
                        '23': 18467,
                        '24': 0.0072,
                        '25': 'SPDR S&P 500',
                        '26': 'P',
                        '27': 2,
                        '28': 320.95,
                        '3': 320.88,
                        '30': 339.08,
                        '31': 218.26,
                        '33': 5.7254,
                        '34': 1.78,
                        '39': 'PACIFIC',
                        '4': 1,
                        '40': '2020-06-19 00:00:00.000',
                        '41': true,
                        '43': 320.88,
                        '44': 9,
                        '45': 72000,
                        '46': 18467,
                        '48': 'Normal',
                        '49': 320.88,
                        '5': 4,
                        '50': 1595635195538,
                        '51': 1595635200001,
                        '52': 1595635200001,
                        '6': 'P',
                        '7': 'P',
                        '8': 73766597,
                        '9': 6546,
                        'assetMainType': 'EQUITY',
                        'assetSubType': 'ETF',
                        'cusip': '78462F103',
                        'delayed': false,
                        'key': 'SPY'
                    }],
                }]
            })
            await expect(cb).toBeCalledTimes(1)
            await expect(cb).toBeCalledWith({
                service: 'QUOTE',
                command: 'SUBS',
                timestamp: 1595785007371,
                content: [{
                    key: 'SPY',
                    assetMainType: 'EQUITY',
                    assetSubType: 'ETF',
                    cusip: '78462F103',
                    delayed: false,
                    bidPrice: 320.15,
                    askPrice: 320.3,
                    lastPrice: 320.88,
                    bidSize: 1,
                    askSize: 4,
                    askID: 'P',
                    bidID: 'P',
                    totalVolume: 73766597,
                    lastSize: 6546,
                    tradeTime: 72000,
                    quoteTime: 71995,
                    highPrice: 321.99,
                    lowPrice: 319.246,
                    bidTick: ' ',
                    closePrice: 320.88,
                    exchangeID: 'p',
                    marginable: true,
                    shortable: true,
                    quoteDay: 18467,
                    tradeDay: 18467,
                    volatility: 0.0072,
                    description: 'SPDR S&P 500',
                    lastID: 'P',
                    digits: 2,
                    openPrice: 320.95,
                    '52WeekHigh': 339.08,
                    '52WeekLow': 218.26,
                    dividendAmount: 5.7254,
                    dividendYield: 1.78,
                    exchangeName: 'PACIFIC',
                    dividendDate: '2020-06-19 00:00:00.000',
                    regularMarketQuote: true,
                    regularMarketLastPrice: 320.88,
                    regularMarketLastSize: 9,
                    regularMarketTradeTime: 72000,
                    regularMarketTradeDay: 18467,
                    securityStatus: 'Normal',
                    mark: 320.88,
                    quoteTimeInLong: 1595635195538,
                    tradeTimeInLong: 1595635200001,
                    regularMarketTradeTimeInLong: 1595635200001
                }]
            })
        }) // test
        it('should receive LEVELONE_FUTURES data and emit `level_one_futures` event', async () => {
            const cb = jest.fn()
            streamer.once('level_one_futures', cb)
            server.send({
                data: [{
                    command: 'SUBS',
                    content: [{
                        '1': 3250.25,
                        '10': 1596072756018,
                        '11': 1596072755753,
                        '19': -2.25,
                        '2': 3250.5,
                        '20': -0.0007,
                        '24': 3250.25,
                        '3': 3250.25,
                        '4': 5,
                        '5': 24,
                        '8': 25893,
                        '9': 3,
                        'key': '/ES'
                    }],
                    service: 'LEVELONE_FUTURES',
                    timestamp: 1596072756064
                }]
            })
            await expect(cb).toBeCalledTimes(1)
            await expect(cb).toBeCalledWith({
                command: 'SUBS',
                content: [{
                    key: '/ES',
                    bidPrice: 3250.25,
                    askPrice: 3250.5,
                    lastPrice: 3250.25,
                    bidSize: 5,
                    askSize: 24,
                    totalVolume: 25893,
                    lastSize: 3,
                    quoteTime: 1596072756018,
                    tradeTime: 1596072755753,
                    netChange: -2.25,
                    futurePercentChange: -0.0007,
                    mark: 3250.25,
                }],
                service: 'LEVELONE_FUTURES',
                timestamp: 1596072756064
            })
        }) // test
        it('should receive OPTION data and emit `level_one_option` event', async () => {
            const cb = jest.fn()
            streamer.once('level_one_option', cb)
            server.send({
                data: [{
                    service: 'OPTION',
                    timestamp: 1632792429190,
                    command: 'SUBS',
                    content: [{
                        'key': 'SPY_100121C444',
                        '1': 'SPY Oct 1 2021 444 Call (Weekly)',
                        '2': 1.61,
                        '3': 1.63,
                        '4': 1.64,
                        '5': 2.55,
                        '6': 1.52,
                        '7': 2.855,
                        '8': 27345,
                        '9': 8099,
                        '10': 11.2577,
                        '11': 58500,
                        '12': 58417,
                        '13': -1.36,
                        '14': 18897,
                        '15': 18897,
                        '16': 2021,
                        '17': 100,
                        '18': 2,
                        '19': 2.14,
                        '20': 70,
                        '21': 70,
                        '22': 3,
                        '23': -1.215,
                        '24': 444,
                        '25': 'C',
                        '26': 'SPY',
                        '27': 10,
                        '28': undefined,
                        '29': 1.64,
                        '30': 1,
                        '31': 4,
                        '32': 0.4068,
                        '33': 0.0688,
                        '34': -0.2332,
                        '35': 0.1943,
                        '36': 0.0225,
                        '37': 'Normal',
                        '38': 1.635,
                        '39': 442.64,
                        '40': 'S',
                        '41': 1.635
                    }],
                    key: 'SPY_100121C444'
                }]
            })
            await expect(cb).toBeCalledTimes(1)
            await expect(cb).toBeCalledWith({
                service: 'OPTION',
                timestamp: 1632792429190,
                command: 'SUBS',
                key: 'SPY_100121C444',
                content: [{
                    symbol: 'SPY_100121C444',
                    description: 'SPY Oct 1 2021 444 Call (Weekly)',
                    bidPrice: 1.61,
                    askPrice: 1.63,
                    lastPrice: 1.64,
                    highPrice: 2.55,
                    lowPrice: 1.52,
                    closePrice: 2.855,
                    totalVolume: 27345,
                    openInterest: 8099,
                    volatility: 11.2577,
                    quoteTime: 58500,
                    tradeTime: 58417,
                    intrinsicValue: -1.36,
                    quoteDay: 18897,
                    tradeDay: 18897,
                    expirationYear: 2021,
                    multiplier: 100,
                    digits: 2,
                    openPrice: 2.14,
                    bidSize: 70,
                    askSize: 70,
                    lastSize: 3,
                    netChange: -1.215,
                    strikePrice: 444,
                    contractType: 'C',
                    underlying: 'SPY',
                    expirationMonth: 10,
                    deliverables: undefined,
                    timeValue: 1.64,
                    expirationDay: 1,
                    daysToExpiration: 4,
                    delta: 0.4068,
                    gamma: 0.0688,
                    theta: -0.2332,
                    vega: 0.1943,
                    rho: 0.0225,
                    securityStatus: 'Normal',
                    theoreticalOptionValue: 1.635,
                    underlyingPrice: 442.64,
                    uvExpirationType: 'S',
                    mark: 1.635
                }]
            })
        }) // test
        it('should receive CHART_HISTORY_FUTURES data and emit `chart_history_futures` event', async () => {
            const cb = jest.fn()
            streamer.once('chart_history_futures', cb)
            server.send({
                snapshot: [{
                    command: 'GET',
                    content: [{
                        '0': '39763282',
                        '1': 0,
                        '2': 1,
                        '3': [{
                            '0': 1597118400000,
                            '1': 3350.25,
                            '2': 3379,
                            '3': 3319.5,
                            '4': 3335.75,
                            '5': 1710857
                        }],
                        'key': '/ES'
                    }],
                    service: 'CHART_HISTORY_FUTURES',
                    timestamp: 1597179376910
                }]
            })
            await expect(cb).toBeCalledTimes(1)
            await expect(cb).toBeCalledWith({
                command: 'GET',
                content: [{
                    chartTime: 1597118400000,
                    closePrice: 3335.75,
                    highPrice: 3379,
                    lowPrice: 3319.5,
                    openPrice: 3350.25,
                    volume: 1710857,
                }],
                key: '/ES',
                service: 'CHART_HISTORY_FUTURES',
                timestamp: 1597179376910,
            })
        }) // test
        it('should receive heartbeat notification and emit `heartbeat` event', async () => {
            const cb = jest.fn()
            streamer.once('heartbeat', cb)
            server.send({ notify: [{ heartbeat: '1595384500929' }] })
            await expect(cb).toBeCalledTimes(1)
            await expect(cb).toBeCalledWith('1595384500929')
        }) // test
        it('should receive null and emit `invalid_message` event', async () => {
            const cb = jest.fn()
            streamer.once('invalid_message', cb)
            server.send(null)
            await expect(cb).toBeCalledTimes(1)
            await expect(cb).toBeCalledWith('null')
        }) // test
        it('should receive invalid JSON and emit `invalid_message` event', async () => {
            const cb = jest.fn()
            streamer.once('invalid_message', cb)
            server.send('invalid json')
            await expect(cb).toBeCalledTimes(1)
            await expect(cb).toBeCalledWith('"invalid json"')
        }) // test
        it('should receive an unknown message and emit `unknown_message` event', async () => {
            const cb = jest.fn()
            streamer.once('unknown_message', cb)
            server.send({ unknown: 'value' })
            await expect(cb).toBeCalledTimes(1)
            await expect(cb).toBeCalledWith({ unknown: 'value' })
        }) // test
        it('should receive an unknown response message and emit `unknown_response` event', async () => {
            const cb = jest.fn()
            streamer.once('unknown_response', cb)
            server.send({
                response: [{
                    unknown: 'value'
                }]
            })
            await expect(cb).toBeCalledTimes(1)
            await expect(cb).toBeCalledWith({ unknown: 'value' })
        }) // test
        it('should receive an unknown notification message and emit `unknown_notification` event', async () => {
            const cb = jest.fn()
            streamer.once('unknown_notification', cb)
            server.send({
                notify: ['unknown']
            })
            await expect(cb).toBeCalledTimes(1)
            await expect(cb).toBeCalledWith('unknown')
        }) // test
        it('should receive an unknown data message and emit `unknown_data` event', async () => {
            const cb = jest.fn()
            streamer.once('unknown_data', cb)
            server.send({
                data: [{
                    unknown: 'value',
                }]
            })
            await expect(cb).toBeCalledTimes(1)
            await expect(cb).toBeCalledWith({
                unknown: 'value',
            })
        }) // test
    }) // group
}) // group
