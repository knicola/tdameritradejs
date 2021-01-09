'use strict'

const { terser } = require('rollup-plugin-terser')

module.exports = {
    input: 'src/browser.js',
    output: {
        file: 'dist/index.min.js',
        format: 'umd',
        plugins: [
            terser()
        ]
    },
}
