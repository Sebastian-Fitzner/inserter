Inserter
============

This module inserts pre-defined strings into specific sections of other files by using comments.

It reads file(s) from a defined directory, takes the marked strings and pass these strings into files which have a reference to these strings.


## Installation

`npm install inserter`

## Usage

Read source files from a provided directory, process its content and output the strings into output files.

``` js
var Inserter = require('./index');

var insert = new Inserter({
	tplFolder: ['test/tpl/test-case/usage'],
	endpointFolders: ['test/output']
});

insert.render();
```

## Options

#### insertStartkey

Type: `string`

Default value: `@INSERT :: START`

Define a string value which represents the start key for your snippets.

Example: `@STARTING`

#### insertEndkey

Type: `string`

Default value: `@INSERT :: END`

Define a string value which represents the end key for your snippets.

Example: `@ENDING`

#### insertpointKey

Type: `string`

Default value: `@INSERTPOINT ::`

Define a string value which represents insert point which you can use in your output files.

Example: `@INSERTING`

#### idKey

Type: `string`

Default value: `@id:`

Define a string value which is the id of your snippet. This key will be used to create a reference to your `INSERTPOINT` file. 

Example: `@id=`

#### refKey

Type: `string`

Default value: `@ref:`

Define a string value which is used in your `INSERTPOINT` to create a reference to an id.

Example: `@reference=`

#### tagKey

Type: `string`

Default value: `@tag:`

Define a string value which be used to group multiple snippets into a group. 

Example: `@tag=`

#### keepKey

Type: `String`

Default value: `@keep:`

Define a string value which can be used to delete the `INSERTPOINT` comment in your output files. 

Example: `@keep=`

#### keep

Type: `boolean`

Default value: `true`

Define a boolean value which can be used to delete all `INSERTPOINT` comments in your output files. 

Example: `keep: false`

#### tplFolder

Type: `Array`

Default value: `false`

Define an array value which is the path to your template folder which holds your predefined markup snippets.

Example: `[test/tpl/test-case/usage]`

#### tplFolder

Type: `Array`

Default value: `false`

Define an array value which is the reference to your output (`INSERTPOINT`) folders. 

Example: `[test/tpl/test-case/usage]`


## Api

### exposeData()

Get data object of your snippets. 

## Examples

see `test.js` and `test` folder...

## License
Copyright (c) 2016 Sebastian Fitzner. see [License.md](LICENSE.md).