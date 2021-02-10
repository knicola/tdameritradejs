'use strict'

const { babel } = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const { terser } = require('rollup-plugin-terser')

module.exports = [
    {
        input: 'src/browser.js',
        output: {
            file: 'dist/index.min.js',
            sourcemap: true,
            format: 'umd',
            name: 'tdameritrade'
        },
        plugins: [
            json(),
            terser({ compress: true }),
            nodeResolve({ browser: true }),
            commonjs({ sourceMap: false }),
            babel({
                exclude: 'node_modules/**',
                babelHelpers: 'bundled'
            }),
        ]
    }
]
