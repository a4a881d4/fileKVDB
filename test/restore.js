var test = require('tap').test;
var fs = require('fs');
var kv = require('../main.js');

test('restore', function (t) {
    kv.root('../../../kvdb');
    var K = "abc";
    var V = "efg";
    kv.restore({'DB':'clearTest','Table':'hasTest'});
    setTimeout( function() {
	    kv.DB('clearTest');
	    kv.Table('hasTest');
    	t.equal( kv.get(K), V );
    	t.end(); 
    },1000);
});
