'use strict'

/**
 * @file Modifies source comments before JSDOC parsing.
 */

// ts specific syntax is used in several JSDOC blocks to
// comply with TS requirements and provide intellisense.
// jsdoc bugs out when trying to parse this comments,
// so we need to either remove or replace them.

const externalAxios = `
/**
 * @external AxiosInstance
 * @see {@link https://github.com/axios/axios/blob/7d3b626a595e5b911c59dfb28a8080e56d840602/index.d.ts#L130|AxiosInstance}
 */
`
exports.handlers = {
    beforeParse: function(e) {
        e.source = e.source
            // replace AxiosInstance import with @external @link to force JSDOC
            // into converting AxiosInstance into a link pointing to its repo.
            .replace("/** @typedef {import('axios').AxiosInstance} AxiosInstance */", externalAxios)
            .replace('@type {AxiosInstance}', '@type {external:AxiosInstance}')
            // remove "/** @typdef {import('./file').TypeDef} TypeDef */"
            // JSDOC will find and link the TypeDef without the import.
            // .replace(/\/\*\*\s*?@typedef\s*?{\s*?import.*\*\//g, '')
            // replace "{(...args: any[]) => void}" with "{Function}"
            .replace(/\{\(\.\.\.args:\sany\[\]\)\s=>\svoid\}/g, '{Function}')
            // replace "{typeof Class}" with {Class}
            .replace(/\{typeof (\w+)\}/g, '{$1}')
    }
}
