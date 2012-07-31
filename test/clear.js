var test = require('tap').test;
var fs = require('fs');
var kv = require('../main.js');

test('clear', function (t) {
    kv.root('../../../kvdb');
    kv.newDB('clearTest');
    kv.DB('clearTest');
    kv.newTable('hasTest');
    kv.Table('hasTest');
    var K = "abc";
    var V = "efg";
    kv.set(K,V);
    kv.clearTable( 'hasTest', 'clearTest' );
    setTimeout( function() {
	    keys = kv.list();
	    t.equal( keys.length, 0 );
	    kv.set(K,V);
	    keys = kv.list();
	    t.equal( keys.length, 1 );
	    kv.backup({'DB':'clearTest','Table':'hasTest'});
	  },1000 );
    setTimeout( function() {
    	kv.delTable( 'hasTest', 'clearTest' );
    },2000 );
    setTimeout( function() {
    	kv.hasTable('hasTest', function(ret) {
    		t.equal(ret,false);
    	});
    },3000 );
    t.end();
});
