var fs = require('fs')
	, root = '/kvdb'

exports.version = '0.0.1';

exports.fn = function(K) {
	return fn(K);
}	

fn = function(K) {
	K=K.replace(new RegExp('\/',"gm"),'');
	var fn = root+'/'+K;
	return fn;
}
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
	fs.writeFile(fn(K),V,function(err) {
		if( err ) {
			console.log('fail set key '+K);
			throw err;
		}
		else
			console.log('set key '+K);
		});
	}

exports.set = function( K, V ) {
	var err = fs.writeFileSync(fn(K),V);
	console.log(err+' '+K+' '+V+' '+fn);
	}
	
exports.get = function( K ) {
	V = fs.readFileSync(fn(K));
	return V;
	}
	
exports.list = function() {
	keys = fs.readdirSync(root);
	return keys;
}

exports.delAsync = function(K) {
	fs.unlink(fn(K),function(err) {
		if( err ) {
			console.log('fail del key '+K);
			throw err;
		}
		else
			console.log('del key '+K);
		});
	}

exports.del = function(K) {
	fs.unlink(fn(K));
}




