# tabular-cli

**[Detects and normalizes tabular data](https://www.npmjs.com/package/tabular-stream) (dsv, json, ndjson, xls, xlsx, xml, ods or sylk) and converts it to [dsv, json, ndjson, or ssejson](https://www.npmjs.com/package/format-data). Spreadsheets and DSV must have a header.**

[![npm status](http://img.shields.io/npm/v/tabular-cli.svg?style=flat-square)](https://www.npmjs.org/package/tabular-cli) [![Travis build status](https://img.shields.io/travis/vweevers/tabular-cli.svg?style=flat-square&label=travis)](http://travis-ci.org/vweevers/tabular-cli) [![AppVeyor build status](https://img.shields.io/appveyor/ci/vweevers/tabular-cli.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/vweevers/tabular-cli) [![Dependency status](https://img.shields.io/david/vweevers/tabular-cli.svg?style=flat-square)](https://david-dm.org/vweevers/tabular-cli)

## examples

**To CSV**

```
npm i tabular-cli -g
tabular -o csv < input.xlsx > output.csv
```

**To SSE JSON with snake_case keys**

```
npm i snake-case
tabular -o sse -k snake-case --event status < status.tsv >> events.sse
```

**To JSON in the form of `{ "rows": .. }` with missing values set to `null`**

```
tabular -o json --style object -d null < input.ndjson > output.json
```

## options

#### `--keys module` (shorthand `-k`)
 
An optional function to [transform and/or filter keys](https://www.npmjs.com/package/map-tabular-keys), passed as a module name or location - relative to the current working directory or something installed alongside tabular-cli. For example: `tabular -k snake-case` or `-k camel-case`. Everything at [change-case](https://www.npmjs.com/package/change-case) works well.

#### `--output format` (shorthand `-o`)

Output format, one of:

* json: via [format-data/json](https://github.com/finnp/format-data/blob/master/json.js) with additional options `style`, `prefix`, `separator` and `suffix`
* ndjson: via [ndjson](https://npmjs.com/package/ndjson)
* dsv: via [csv-write-stream](https://npmjs.com/package/csv-write-stream) with additional options `separator` and `no-headers` (a boolean flag)
* csv: shorthand for `-o dsv --separator ,`
* tsv: shorthand for `-o dsv --separator \t`
* sse: [ssejson](https://npmjs.com/package/ssejson) with additional option `event`

The **default is json.**

#### `--default value` (shorthand `-d`)

Fallback value to use for `null` and `undefined` values. **Default is `0`**. The CLI app coerces `null`, `undefined`, `true`, `false` or any number to a javascript type.

#### `--version`

Print version and exit.

#### `--help`

Open this readme in a browser and exit.

## install

With [npm](https://npmjs.org) do:

```
npm install tabular-cli -g
```

## license

[MIT](http://opensource.org/licenses/MIT) © [Vincent Weevers](http://vincentweevers.nl). Test data © Statistics Netherlands, The Hague/Heerlen.
