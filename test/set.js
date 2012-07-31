var test = require('tap').test;
var fs = require('fs');
var kv = require('../main.js');

test('set', function (t) {
    t.plan(2);
    var x = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    var y = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    var z = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    kv.root('../../../kvdb');
    kv.newDB('forTest');
    kv.DB('forTest');
    kv.newTable('Test');
    kv.Table('Test');
    var K = [x,y,z].join('_');
    var V = 'Hello World';
    kv.set(K,V);
    fs.exists(kv.fn(K), function (ex) {
        if (!ex) t.fail('K not created')
        else fs.stat(kv.fn(K), function (err, stat) {
            if (err) t.fail(err)
            else {
                t.equal(stat.mode & 0777, 0664);
                t.ok(stat.isFile(), 'target is a Key');
                t.end();
            }
        })
    })
	K='a/b/c';
	V='Hello World';
	kv.set(K,V);
});
