var test = require('tap').test;
var fs = require('fs');
var kv = require('../main.js');

test('get', function (t) {
   	kv.init('../../../kvdb');
    var keys = kv.list();
    var V = kv.get(keys[0]);
    t.equal(V.toString(), "Hello World");
    t.end();
});
