'use strict'

exports.jstr = (obj) => JSON.stringify(obj, null, 2)
exports.ne = (arg1, ...arg2) => ! [].concat(arg2).includes(arg1)
exports.eq = (arg1, ...arg2) => [].concat(arg2).includes(arg1)
exports.cleanType = (type) => type.substring(type.indexOf(':') + 1).replace(/\.</g, '<')
exports.prefixLines = (string, prefix = '') => string ? string.replace(/([\r\n])/g, '$1     ' + prefix) : ''
