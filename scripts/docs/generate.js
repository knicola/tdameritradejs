'use strict'

const jsdoc2md = require('jsdoc-to-markdown')
const fs = require('fs')
const path = require('path')

const outputFile = path.resolve('./API.md')

if (fs.existsSync(outputFile)) {
    fs.rmSync(outputFile)
}

// just in case
jsdoc2md.clear()

const output = jsdoc2md.renderSync({
    'no-cache': true,
    'property-list-format': 'list',
    'param-list-format': 'list',
    'member-index-format': 'list',
    'global-index-format': 'none',
    'module-index-format': 'none',
    'example-lang': 'js',
    configure: 'jsdoc.json',
    source: 'src/node.js',
    template: fs.readFileSync(path.join(__dirname, 'template.hbs'), 'utf8'),
    partial: path.join(__dirname, 'partials/**/*.hbs'),
    helper: path.join(__dirname, 'helpers/*.js'),
})

fs.writeFileSync(outputFile, output)
