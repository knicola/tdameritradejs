'use strict'

exports.handlers = {
    beforeParse: function(e) {
        e.source = e.source
            .replace(/\/\*\*\s*?@typedef\s*?{\s*?import.*\*\//g, '')
            .replace(/\{\(\.\.\.args:\sany\[\]\)\s=>\svoid\}/g, '{Function}')
    }
}
