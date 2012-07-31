var test = require('tap').test;
var fs = require('fs');
var kv = require('../main.js');

test('delDB', function (t) {
	kv.root('../../../kvdb');
 	kv.delDB('forTest');
	t.end();
});
