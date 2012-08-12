var test = require('tap').test;
var fs = require('fs');
var kv = require('../main.js');

test('get', function (t) {
  kv.root('../../../kvdb');
  kv.newDB('forTest');
  kv.DB('forTest');
  kv.newTable('Test');
  kv.Table('Test');
  var keys = kv.list();
  if( keys.length>0 ) {
    var V = kv.get(keys[0]);
    t.equal(V.toString(), "Hello World");
  }
  t.end();
});
