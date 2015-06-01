var tabular   = require('tabular-stream')
  , formatter = require('format-data')
  , pick      = require('object.pick')
  , xtend     = require('xtend')
  , pipeline  = require('stream-combiner2')
  
// Shorthands and format-specific options
  , formats = {
    json: [ ['style', 'prefix', 'separator', 'suffix'] ],
    sse : [ ['event'] ],    
    csv : [  'dsv', { separator: ','  } ],
    tsv : [  'dsv', { separator: '\t' } ],
    dsv : [ ['separator', 'newline', 'sendHeaders'], { format: 'csv' } ]
}

module.exports = function (opts) {
  opts || (opts = {})

  var input    = pick(opts, ['defaultValue', 'keys', 'phpexcel'])
    , cfg      = formats[opts.output]
    , keys     = cfg && cfg[0]
    , override = cfg && cfg[1]

  if (typeof keys === 'string') {
    // It's a shorthand
    override = xtend(override, formats[keys][1])
    keys = formats[keys][0]
  }

  var output = xtend(
    keys ? pick(opts, keys) : null,
    { format: opts.output },
    override
  )

  return pipeline( tabular(input), formatter(output) )
}
