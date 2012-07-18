var fs = require('fs')
	, root = '/kvdb'

exports.version = '0.0.1';

exports.init = function( aRoot ) {
	root = aRoot;
	console.log('DB root :'+root);
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

exports.delAsync = function(K) {
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

exports.del = function(K) {
	var fn = root+'/'+K;
	fs.unlinkFile(fn);
	}

exports.fn = function(K) {
	var fn = root+'/'+K;
	return fn;
}	
