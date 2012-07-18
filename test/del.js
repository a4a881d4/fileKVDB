var test = require('tap').test;
var fs = require('fs');
var kv = require('../main.js');

test('del', function (t) {
   	kv.init('../../../kvdb');
    var keys = kv.list();
    var total = keys.length;
    kv.del(keys[0]);
    keys = kv.list();
    t.equal(keys.length, total-1);
    t.end();
});
