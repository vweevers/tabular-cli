var test       = require('tape')
  , tabular    = require('../')
  , fs         = require('fs')
  , concat     = require('concat-stream')
  , through2   = require('through2').obj
  , deepEqual  = require('deep-equal')
  , spawn      = require('cross-spawn')
  , tabular    = require('tabular-stream')
  , bin        = require('path').resolve(__dirname, '../bin/tabular')

var formats = ['txt', 'csv', 'xlsx', 'xls', 'ods', 'json']
var expected = require('./expected.json').rows
var base = __dirname + require('path').sep + 'air_pollution_nl.'

// TODO: This test is circular (cli > tabular > stdout > tabular), 
// somewhat fragile and very non-specific. Should add a truncate,
// fixed or round option to coerce-tabular to prevent the rounding 
// differences in the spreadsheet parsing. Then simply compare text 
// here. Also, disable phpexcel-stream by default.
formats.forEach(function(format){
  test(format, function(t){
    t.plan(4)

    run(base + format, ['-k', 'snake-case', '--style', 'object', '--no-phpexcel'])
      .pipe( tabular() )

      // Ignore tiny rounding differences
      .pipe( through2(function(obj, _, next){
        for(var k in obj) {
          if (typeof obj[k] !== 'string')
            obj[k] = +(obj[k].toFixed(2))
        }

        next(null, obj)
      }))

      .pipe( concat(function(data){
        t.equal(data.length, expected.length, 'length ok')
        t.deepEqual(data[data.length-1], expected[expected.length-1], 'last row ok')
        t.deepEqual(data[0], expected[0], 'first row ok')
        t.ok(deepEqual(data, expected), 'deep equal')
      }))
  })
})

function run(input, args) {
  var child = spawn('node', [bin].concat(args))
  fs.createReadStream(input).pipe(child.stdin)
  return child.stdout
}
