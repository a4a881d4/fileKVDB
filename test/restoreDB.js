var test = require('tap').test;
var fs = require('fs');
var kv = require('../main.js');

test('restoreDB', function (t) {
  kv.root('../../../kvdb');
  kv.restore({'DB':'forTest'});
  t.end();
});
