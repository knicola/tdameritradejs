'use strict'

const debug = require('debug')('ameritrade:tests') // eslint-disable-line no-unused-vars
// require('debug').enable('ameritrade:tests')

/** @class */
const TDStreamer = require('../src/tdStreamer')
const userPrincipals = require('./setup/userPrincipals.fixture')

const cuid = require('cuid')
jest.mock('cuid')
cuid.mockImplementation(() => 'test_requestid')

/**
 * Callback used by create()
 *
 * @callback Callback
 * @param {TDStreamer} streamer
 * @param {Jest.ProvidesCallback} done
 */
/**
 * Creates a new TDStreamer and authenticates for convenience.
 *
 * @param {string} name The name of your test
 * @param {Callback} fn The function for your test
 * @returns {void}
 */
function td(name, fn) {
    // just a quick and dirty way to ease testing. would like to revise.
    test(name, done => {
        const streamer = new TDStreamer(userPrincipals)
        streamer.once('message', () => {
            // mock a successful auth response
            streamer.send({
                response: [{
                    service: 'ADMIN',
                    command: 'LOGIN',
                    content: { code: 0 },
                }]
            })
        })
        streamer.once('authenticated', () => {
            fn(streamer, done)
            streamer.disconnect({ force: true })
        })
        streamer.connect()
    })
} // td()

describe('TDStreamer', () => {
    describe('.connect()', () => {
        it('should connect and authenticate to the server', done => {
            const streamer = new TDStreamer(userPrincipals)
            streamer.once('message', message => {
                expect(JSON.parse(message)).toEqual({
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
                done()
            })
            streamer.connect()
        }) // test
    }) // group

    describe('.createRequest()', () => {
        td('should create a request object', (streamer, done) => {
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
        td('should create a request with a user defined requestid', (streamer, done) => {
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
        td('should create and send a request to the server', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
            })
            streamer.sendRequest({
                service: 'SRV',
                command: 'CMD',
                parameters: {
                    param1: 'value1',
                    param2: 'value2',
                }
            })
        }) // test
        td('should create and send a request to the server with a user defined requestid', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
                    requests: [{
                        requestid: 'custom_id',
                        account: '123456789',
                        source: 'test_appId',
                        service: 'SRV',
                        command: 'CMD',
                    }]
                })
                done()
            })
            streamer.sendRequest({
                requestid: 'custom_id',
                service: 'SRV',
                command: 'CMD',
            })
        }) // test
        td('should create and send multiple requests to the server in a single message', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.sendRequest([{
                requestid: 'custom_id_1',
                service: 'SRV_1',
                command: 'CMD_1',
            }, {
                requestid: 'custom_id_2',
                service: 'SRV_2',
                command: 'CMD_2',
            }])
        }) // test
        td('should return the request object', (streamer, done) => {
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
        td('should send a JSON message to the server', (streamer, done) => {
            streamer.once('message', message => {
                expect(JSON.parse(message)).toEqual({ message: 'test' })
                done()
            })
            streamer.send({ message: 'test' })
        }) // test
    }) // group

    describe('.subscribe()', () => {
        td('should send a subscribtion request to the server', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subscribe({
                service: 'SRV',
                parameters: {
                    param1: 'value1',
                    param2: 'value2',
                }
            })
        }) // test
        td('should send a subscribtion request to the server with a user defined requestid', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
                    requests: [{
                        requestid: 'custom_id',
                        source: 'test_appId',
                        account: '123456789',
                        service: 'SRV',
                        command: 'SUBS',
                    }]
                })
                done()
            })
            streamer.subscribe({
                requestid: 'custom_id',
                service: 'SRV',
            })
        }) // test
        td('should send multiple subscription requests to the server in a single message', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subscribe([{ service: 'SRV_1' }, { service: 'SRV_2' }])
        }) // test
        td('should return the request object', (streamer, done) => {
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
        td('should send an unsubscribe request to the server', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.unsubscribe({
                service: 'SRV',
                parameters: {
                    param1: 'value1',
                    param2: 'value2',
                }
            })
        }) // test
        td('should send an unsubscribe request to the server with a user defined requestid', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
                    requests: [{
                        requestid: 'custom_id',
                        source: 'test_appId',
                        account: '123456789',
                        service: 'SRV',
                        command: 'UNSUBS',
                    }]
                })
                done()
            })
            streamer.unsubscribe({
                requestid: 'custom_id',
                service: 'SRV',
            })
        }) // test
        td('should send multiple unsubscribe requests to the server in a single message', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.unsubscribe([{ service: 'SRV_1' }, { service: 'SRV_2' }])
        }) // test
        td('should return the request object', (streamer, done) => {
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
        td('should send a QOS request to the server', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
            })
            streamer.setQOS('realtime')
        }) // test
        td('should return the request object', (streamer, done) => {
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
        td('should subscribe for Account Activity updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsAccountActivity()
        }) // test
        td('should choose which fields to subscribe for', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsAccountActivity(['accountNumber', 'messageData', 'subscriptionKey'])
        }) // test
    }) // group

    describe('.unsubsAccountActivity()', () => {
        td('should unsubscribe from Account Activity updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
                    requests: [{
                        requestid: 'test_requestid',
                        source: 'test_appId',
                        account: '123456789',
                        service: 'ACCT_ACTIVITY',
                        command: 'UNSUBS',
                    }]
                })
                done()
            })
            streamer.unsubsAccountActivity()
        }) // test
    }) // group

    describe('.subsChartEquity()', () => {
        td('should subscribe to Chart Equity updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsChartEquity('SYMBOL')
        }) // test
        td('should choose which fields to subscribe for', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsChartEquity('SYMBOL', ['key', 'openPrice', 'closePrice'])
        }) // test
    }) // group

    describe('.unsubsChartEquity()', () => {
        td('should unsubscribe from Chart Equity updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.unsubsChartEquity('SYMBOL')
        }) // test
    }) // group

    describe('.subsChartFutures()', () => {
        td('should subscribe to Chart Futures updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsChartFutures('SYMBOL')
        }) // test
        td('should choose which fields to subscribe for', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsChartFutures('SYMBOL', ['key', 'openPrice', 'closePrice'])
        }) // test
    }) // group

    describe('.unsubsChartFutures()', () => {
        td('should unsubscribe from Chart Futures updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.unsubsChartFutures('SYMBOL')
        }) // test
    }) // group

    describe('.subsChartOptions()', () => {
        td('should subscribe to Chart Options updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsChartOptions('SYMBOL')
        }) // test
        td('should choose which fields to subscribe for', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsChartOptions('SYMBOL', ['key', 'openPrice', 'closePrice'])
        }) // test
    }) // group

    describe('.unsubsChartOptions()', () => {
        td('should unsubscribe from Chart Options updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.unsubsChartOptions('SYMBOL')
        }) // test
    }) // group

    describe('.subsNewsHeadline()', () => {
        td('should subscribe to Chart Options updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsNewsHeadline('SYMBOL')
        }) // test
        td('should choose which fields to subscribe for', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsNewsHeadline('SYMBOL', ['symbol', 'headline'])
        }) // test
    }) // group

    describe('.unsubsNewsHeadline()', () => {
        td('should unsubscribe from Chart Options updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.unsubsNewsHeadline('SYMBOL')
        }) // test
    }) // group

    describe('.subsTimesaleEquity()', () => {
        td('should subscribe to Chart Options updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsTimesaleEquity('SYMBOL')
        }) // test
        td('should choose which fields to subscribe for', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsTimesaleEquity('SYMBOL', ['symbol', 'lastPrice'])
        }) // test
    }) // group

    describe('.unsubsTimesaleEquity()', () => {
        td('should unsubscribe from Chart Options updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.unsubsTimesaleEquity('SYMBOL')
        }) // test
    }) // group

    describe('.subsTimesaleFutures()', () => {
        td('should subscribe to Chart Options updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsTimesaleFutures('SYMBOL')
        }) // test
        td('should choose which fields to subscribe for', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsTimesaleFutures('SYMBOL', ['symbol', 'lastPrice'])
        }) // test
    }) // group

    describe('.unsubsTimesaleFutures()', () => {
        td('should unsubscribe from Chart Options updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.unsubsTimesaleFutures('SYMBOL')
        }) // test
    }) // group

    describe('.subsTimesaleOptions()', () => {
        td('should subscribe to Chart Options updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsTimesaleOptions('SYMBOL')
        }) // test
        td('should choose which fields to subscribe for', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsTimesaleOptions('SYMBOL', ['symbol', 'lastPrice'])
        }) // test
    }) // group

    describe('.unsubsTimesaleOptions()', () => {
        td('should unsubscribe from Chart Options updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.unsubsTimesaleOptions('SYMBOL')
        }) // test
    }) // group

    describe('.subsTimesaleForex()', () => {
        td('should subscribe to Chart Options updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsTimesaleForex('SYMBOL')
        }) // test
        td('should choose which fields to subscribe for', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsTimesaleForex('SYMBOL', ['symbol', 'lastPrice'])
        }) // test
    }) // group

    describe('.unsubsTimesaleForex()', () => {
        td('should unsubscribe from Chart Options updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.unsubsTimesaleForex('SYMBOL')
        }) // test
    }) // group

    describe('.subsChartHistoryFutures()', () => {
        td('should get Chart History Futures data', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
                    requests: [{
                        requestid: 'test_requestid',
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
                done()
            })
            streamer.getChartHistoryFutures('/ES', {
                frequency: 'm1',
                period: 'd1',
            })
        }) // test
    }) // group

    describe('.subsLevelOneEquity()', () => {
        td('should subscribe for Level One Equity updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsLevelOneEquity('SYMBOL')
        }) // test
        td('should choose which fields to subscribe for', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsLevelOneEquity('SYMBOL', ['symbol', 'bidPrice', 'askPrice'])
        }) // test
    }) // group

    describe('.unsubsLevelOneEquity()', () => {
        td('should unsubscribe from Chart Options updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.unsubsLevelOneEquity('SYMBOL')
        }) // test
    }) // group

    describe('.subsLevelOneFutures()', () => {
        td('should subscribe for Level One Futures updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsLevelOneFutures('SYMBOL')
        }) // test
        td('should choose which fields to subscribe for', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.subsLevelOneFutures('SYMBOL', ['symbol', 'askPrice', 'askSize'])
        }) // test
    }) // group

    describe('.unsubsLevelOneFutures()', () => {
        td('should unsubscribe from Chart Options updates', (streamer, done) => {
            streamer.once('message', msg => {
                expect(JSON.parse(msg)).toEqual({
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
                done()
            })
            streamer.unsubsLevelOneFutures('SYMBOL')
        }) // test
    }) // group

    describe('Events and Transforms', () => {
        td('should receive CHART_EQUITY data and emit `chart` event', (streamer, done) => {
            streamer.once('chart', data => {
                expect(data).toEqual({
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
                done()
            })
            // msg will be reflected back to the client
            streamer.send({
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
        }) // test
        td('should receive CHART_FUTURES data and emit `chart` event', (streamer, done) => {
            streamer.once('chart', data => {
                expect(data).toEqual({
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
                done()
            })
            streamer.send({
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
        }) // test
        td('should receive TIMESALE_EQUITY data and emit `timesale` event', (streamer, done) => {
            streamer.once('timesale', data => {
                expect(data).toEqual({
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
                done()
            })
            streamer.send({
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
        }) // test
        td('should receive TIMESALE_FUTURES data and emit `timesale` event', (streamer, done) => {
            streamer.once('timesale', data => {
                expect(data).toEqual({
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
                done()
            })
            streamer.send({
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
        }) // test
        td('should receive NEWS_HEADLINE data and emit `news_headline` event', (streamer, done) => {
            streamer.once('news_headline', data => {
                expect(data).toEqual({
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
                done()
            })
            streamer.send({
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
        }) // test
        td('should receive QUOTE data and emit `level_one_equity` event', (streamer, done) => {
            streamer.once('level_one_equity', data => {
                expect(data).toEqual({
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
                done()
            })
            streamer.send({
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
        }) // test
        td('should receive LEVELONE_FUTURES data and emit `level_one_futures` event', (streamer, done) => {
            streamer.once('level_one_futures', data => {
                expect(data).toEqual({
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
                done()
            })
            streamer.send({
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
        }) // test
        td('should receive heartbeat notification and emit `heartbeat` event', (streamer, done) => {
            streamer.once('heartbeat', data => {
                expect(data).toEqual('1595384500929')
                done()
            })
            streamer.send({ notify: [{ heartbeat: '1595384500929' }] })
        }) // test
        td('should receive null and emit `invalid_message` event', (streamer, done) => {
            streamer.once('invalid_message', data => {
                expect(data).toEqual('null')
                done()
            })
            streamer.send(null)
        }) // test
        td('should receive invalid JSON and emit `invalid_message` event', (streamer, done) => {
            streamer.once('invalid_message', data => {
                expect(data).toEqual('"invalid json"')
                done()
            })
            streamer.send('invalid json')
        }) // test
        td('should receive an unknown message and emit `unknown_message` event', (streamer, done) => {
            streamer.once('unknown_message', data => {
                expect(data).toEqual({ unknown: 'value' })
                done()
            })
            streamer.send({ unknown: 'value' })
        }) // test
        td('should receive an unknown response message and emit `unknown_response` event', (streamer, done) => {
            streamer.once('unknown_response', data => {
                expect(data).toEqual({
                    unknown: 'value'
                })
                done()
            })
            streamer.send({
                response: [{
                    unknown: 'value'
                }]
            })
        }) // test
        td('should receive an unknown notification message and emit `unknown_notification` event', (streamer, done) => {
            streamer.once('unknown_notification', data => {
                expect(data).toEqual('unknown')
                done()
            })
            streamer.send({
                notify: ['unknown']
            })
        }) // test
        td('should receive an unknown data message and emit `unknown_data` event', (streamer, done) => {
            streamer.once('unknown_data', data => {
                expect(data).toEqual({
                    unknown: 'value',
                })
                done()
            })
            streamer.send({
                data: [{
                    unknown: 'value',
                }]
            })
        }) // test
    }) // group
}) // group
