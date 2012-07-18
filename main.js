var fs = require('fs')
	, root = '/kvdb'

exports.version = '0.0.1';

exports.init = function( aRoot ) {
	root = aRoot;
	fs.exists(root, function (ex) {
        if (!ex) {
        	console.log('DB Root does not exist');
        	throw ex;
        }
        else 
        	fs.stat( root, function (err, stat) {
            	if (err) 
            		throw err;
            	else {
                	if( stat.isDirectory() )
                		console.log('DB root :'+root);
                	else
                		console.log('DB root :'+root+' invaild');
                }
            });
	});
}

exports.setAsync = function( K, V ) {
	var fn = root+'/'+K;
	fs.writeFile(fn,V,function(err) {
		if( err ) {
			console.log('fail set key '+K);
			throw err;
		}
		else
			console.log('set key '+K);
		});
	}

exports.set = function( K, V ) {
	var fn = root+'/'+K;

	var err = fs.writeFileSync(fn,V);

	console.log(err+' '+K+' '+V+' '+fn);
	}
	
exports.get = function( K ) {
	var fn = root+'/'+K;
	V = fs.readFileSync(fn);
	return V;
	}
	
exports.list = function() {
	keys = fs.readdirSync(root);
	return keys;
}

exports.del = function(K) {
	var fn = root+'/'+K;
	fs.unlinkSync(fn);
	}

exports.fn = function(K) {
	var fn = root+'/'+K;
	return fn;
}	
