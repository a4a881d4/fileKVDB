
var fs = require('fs')
  , root = '/kvdb'
  
exports.version = '0.0.1';

export.init = function( aRoot ) {
	root = aRoot;
}

export.set = function( K, V ) {
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
	
export.get = function( K ) {
	var fn = root+'/'+K;
	V = fs.readFileSync(fn);
	return V;
	}
	
export.list = function() {
	keys = fs.readdirSync(root);
	return keys;
}

export.del = function(K) {
	var fn = root+'/'+K;
	fs.unlinkFile(fn,function(err) {
		if( err ) {
			console.log('fail del key '+K);
			throw err;
		}
		else
			console.log('del key '+K);
		});
	}
	