var test = require('tap').test;
var fs = require('fs');
var kv = require('../main.js');

test('backupDB', function (t) {
	kv.root('../../../kvdb');
  kv.backup({'DB':'forTest'});
	t.end();
});
