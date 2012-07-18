var test = require('tap').test;
var fs = require('fs');
var kv = require('../main.js');

test('list', function (t) {
   	kv.init('../../../kvdb');
    var keys = kv.list();
    for( k in keys )
    {
    	var K = keys[k];
    	console.log(K);
    	fs.exists(kv.fn(K), function (ex) {
        	if (!ex) t.fail('k not created')
        		else fs.stat(kv.fn(K), function (err, stat) {
            if (err) t.fail(err)
            	else {
                	t.equal(stat.mode & 0777, 0664);
                	t.ok(stat.isFile(), 'target is a Key '+keys.length);
               	}
        	})
    	})
    }
    t.end();
});
