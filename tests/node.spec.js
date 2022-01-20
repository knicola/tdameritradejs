'use strict'

const debug = require('debug')('ameritrade:tests') // eslint-disable-line no-unused-vars
// require('debug').enable('ameritrade:tests')

const axios = require('axios').default
const MockAdapter = require('axios-mock-adapter').default
const mockAxios = new MockAdapter(axios)
const https = require('https')
const { mockAxiosResponse } = require('./setup/common')

const { TDAmeritrade } = require('../src/node')
const config = {
    apiKey: 'test_client_id',
    redirectUri: 'https://localhost:8443',
    sslKey: 'tests/setup/selfsigned.key',
    sslCert: 'tests/setup/selfsigned.crt',
}
const userPrincipalFixture = require('./setup/userPrincipals.fixture')

describe('TDAmeritrade (Node.js)', () => {
    beforeEach(() => {
        // intercept all calls to make sure we
        // will never hit any live endpoints
        mockAxios.onAny().reply(mockAxiosResponse)
    })
    afterEach(() => {
        mockAxios.reset()
    })
    it('should be instance of TDAmeritrade', () => {
        const td = new TDAmeritrade(config)
        expect(td).toBeInstanceOf(require('../src/client'))
    })
    describe('.account()', () => {
        it('should create a new instance of TDAccount', () => {
            const td = new TDAmeritrade()
            expect(td.account(12345)).toBeInstanceOf(require('../src/client/account'))
        }) // test
    }) // group
    describe('.streamer()', () => {
        it('shoud create a new instance of TDStreamer', async () => {
            const td = new TDAmeritrade()
            mockAxios.reset()
            mockAxios.onGet('/userprincipals').reply(200, userPrincipalFixture)
            const streamer = await td.streamer()
            expect(streamer).toBeInstanceOf(require('../src/streamer'))
        }) // test
        it('should be able to create a new instance of TDStreamer with fullResponse config enabled', async () => {
            const td = new TDAmeritrade({
                fullResponse: true
            })
            mockAxios.reset()
            mockAxios.onGet('/userprincipals').reply(200, userPrincipalFixture)
            const streamer = await td.streamer()
            expect(streamer).toBeInstanceOf(require('../src/streamer'))
        }) // test
    }) // group
    describe('.authorize()', () => {
        it('should setup https server, emit event when ready and request an access token', () => {
            const td = new TDAmeritrade(config)
            mockAxios.onPost('/oauth2/token').reply(mockAxiosResponse)
            td.on('login', url => {
                expect(url).toEqual('https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=https://localhost:8443&client_id=test_client_id@AMER.OAUTHAP')
                https.get('https://localhost:8443/?code=test_auth_code')
            })
            return td.authorize().then(res => {
                expect(res.data).toEqual({
                    grant_type: 'authorization_code',
                    access_type: 'offline',
                    client_id: 'test_client_id@AMER.OAUTHAP',
                    redirect_uri: 'https://localhost:8443',
                    code: 'test_auth_code',
                })
            })
        }) // test
        it('should update config with the received token', () => {
            const td = new TDAmeritrade(config)
            const mockResponse = {
                access_token: 'test_access_token',
                refresh_token: 'test_refresh_token',
                scope: 'PlaceTrades AccountAccess MoveMoney',
                expires_in: 1800,
                refresh_token_expires_in: 7776000,
                token_type: 'Bearer'
            }
            mockAxios.reset()
            mockAxios.onPost('/oauth2/token').reply(200, mockResponse)
            const mockDate = jest.spyOn(Date, 'now')
            mockDate.mockImplementation(() => new Date('2020-01-01T01:01:01.000Z').getTime())
            td.on('login', url => {
                expect(url).toEqual('https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=https://localhost:8443&client_id=test_client_id@AMER.OAUTHAP')
                https.get('https://localhost:8443/?code=test_auth_code')
            })
            return td.authorize().then(res => {
                expect(res).toEqual(mockResponse)
                expect(td.config.accessToken).toEqual('test_access_token')
                expect(td.config.refreshToken).toEqual('test_refresh_token')
                expect(td.config.accessTokenExpiresAt).toEqual('2020-01-01T01:31:01.000Z')
                expect(td.config.refreshTokenExpiresAt).toEqual('2020-03-31T01:01:01.000Z')
            }).finally(() => mockDate.mockRestore())
        }) // test
        it('should return a 422 if no authorization code is provided by oauth redirection', () => {
            const td = new TDAmeritrade(config)
            td.on('login', () => {
                https.get('https://localhost:8443/?nocode', res => {
                    expect(res.statusCode).toEqual(422)
                    // exit gracefully
                    https.get('https://localhost:8443/?code=test_auth_code')
                })
            })
            return td.authorize()
        }) // test
        it('should reject if access code request fails', () => {
            const td = new TDAmeritrade(config)
            mockAxios.reset()
            mockAxios.onPost('/oauth2/token').reply(500)
            td.on('login', () => {
                https.get('https://localhost:8443/?code=test_auth_code')
            })
            return td.authorize().catch(err => {
                expect(err).not.toBeUndefined()
                expect(err.status).toEqual(500)
            })
        }) // test
        it('should default to port 8443 if redirectUri does not specify one', () => {
            const td = new TDAmeritrade(Object.assign({}, config, {
                redirectUri: 'https://localhost',
            }))
            mockAxios.reset()
            mockAxios.onPost('/oauth2/token').reply(200, { success: true })
            td.on('login', () => {
                https.get('https://localhost:8443/?code=test_auth_code')
            })
            return td.authorize().then(res => {
                expect(res).toEqual({ success: true })
            }).catch(err => {
                expect(err).toBeUndefined()
            })
        }) // test
    }) // group
    describe('.login()', () => {
        it('should call .authorize() if no access token is provided', () => {
            const td = new TDAmeritrade(config)
            const mockTd = jest.spyOn(td, 'authorize')
            mockTd.mockImplementation(() => Promise.resolve())
            return td.login().then(() => {
                expect(mockTd).toHaveBeenCalledTimes(1)
            })
        }) // test
        it('should call .refreshAccessToken() if access token is expired', () => {
            const refreshTokenDate = new Date()
            refreshTokenDate.setSeconds(1500)
            const td = new TDAmeritrade(Object.assign({}, config, {
                accessToken: 'test_access_token',
                refreshToken: 'test_refresh_token',
                accessTokenExpiresAt: '2020-01-01T01:31:01.000Z',
                refreshTokenExpiresAt: refreshTokenDate.toISOString(),
            }))
            const mockAuthorize = jest.spyOn(td, 'authorize')
            mockAuthorize.mockImplementation(() => Promise.resolve())
            const mockRefresh = jest.spyOn(td, 'refreshAccessToken')
            mockRefresh.mockImplementation(() => Promise.resolve())
            return td.login().then(() => {
                expect(mockAuthorize).not.toHaveBeenCalled()
                expect(mockRefresh).toHaveBeenCalledTimes(1)
            })
        }) // test
        it('should call .authorize() if refresh token is expired', () => {
            const td = new TDAmeritrade(Object.assign({}, config, {
                accessToken: 'test_access_token',
                refreshToken: 'test_refresh_token',
                accessTokenExpiresAt: '2020-01-01T01:31:01.000Z',
                refreshTokenExpiresAt: '2020-03-31T01:01:01.000Z',
            }))
            const mockAuthorize = jest.spyOn(td, 'authorize')
            mockAuthorize.mockImplementation(() => Promise.resolve())
            const mockRefresh = jest.spyOn(td, 'refreshAccessToken')
            mockRefresh.mockImplementation(() => Promise.resolve())
            return td.login().then(() => {
                expect(mockAuthorize).toHaveBeenCalledTimes(1)
                expect(mockRefresh).not.toHaveBeenCalled()
            })
        }) // test
        it('should resolve if access token is still valid', () => {
            const accessTokenDate = new Date()
            accessTokenDate.setSeconds(1500)
            const refreshTokenDate = new Date()
            refreshTokenDate.setSeconds(3000)
            const td = new TDAmeritrade(Object.assign({}, config, {
                accessToken: 'test_access_token',
                refreshToken: 'test_refresh_token',
                accessTokenExpiresAt: accessTokenDate.toISOString(),
                refreshTokenExpiresAt: refreshTokenDate.toISOString(),
            }))
            const mockAuthorize = jest.spyOn(td, 'authorize')
            mockAuthorize.mockImplementation(() => Promise.resolve())
            const mockRefresh = jest.spyOn(td, 'refreshAccessToken')
            mockRefresh.mockImplementation(() => Promise.resolve())
            return td.login().then(() => {
                expect(mockAuthorize).not.toHaveBeenCalled()
                expect(mockRefresh).not.toHaveBeenCalled()
            })
        }) // test
    }) // group
}) // group
