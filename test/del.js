var test = require('tap').test;
var fs = require('fs');
var kv = require('../main.js');

test('del', function (t) {
  kv.root('../../../kvdb');
  kv.newDB('forTest');
  kv.DB('forTest');
  kv.newTable('Test');
  kv.Table('Test');
  var keys = kv.list();
  var total = keys.length;
  if( total > 0 ) { 
    kv.del(keys[0]);
    console.log( 'del Key: ',keys[0] );
    keys = kv.list();
    t.equal(keys.length, total-1);
  }
  t.end();
});
