var test = require('tap').test;
var fs = require('fs');
var kv = require('../main.js');

test('has', function (t) {
    kv.root('../../../kvdb');
    kv.newDB('forTest');
    kv.newDB('hasTest');
    kv.DB('forTest');
    kv.newTable('Test');
    kv.newTable('hasTest');
    kv.Table('Test');
    kv.hasDB('forTest', function(ret) {
    	t.equal(ret,true);
    	console.log('has: 1');
    });
    kv.hasTable('Test', function(ret) {
    	t.equal(ret,true);
    	console.log('has: 2');
    });
    kv.hasTable('hasTest', function(ret) {
    	t.equal(ret,true);
    	console.log('has: 5');
    });
    kv.hasDB('notForTest', function(ret) {
    	t.equal(ret,false);
    	console.log('has: 3');
   });
    kv.hasTable('notTest', function(ret) {
    	t.equal(ret,false);
    	console.log('has: 4');
    });
    t.equal( kv.DB(), 'forTest' );
    t.equal( kv.Table(), 'Test' );
    t.equal( kv.root(), '../../../kvdb' );
    var ret = kv.Tree();
    console.log(JSON.stringify(ret));
    kv.set('abc','efg');
    t.equal( kv.has('abc'), true );
    t.equal( kv.has('efg'),false );
    kv.has('abc',function(ret) {
    	t.equal(ret,true);
    });
    kv.has('efg',function(ret) {
    	t.equal(ret,false);
    });
    t.end();
});
