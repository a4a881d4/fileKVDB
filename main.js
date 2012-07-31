var fs = require('fs')
	, dbPath = { 'kvdb', 'DB', 'Table' }
	, dbPathName = { 'DB->root', 'DB->DB', 'DB->Table' }

Exports.version = '0.0.3';

exports.fn = function(K) {
	return fn(K);
}
	
validK = function(K) {
	return K.replace(new RegExp('\/',"gm"),'');
}

fn = function(K) {
	K = validK(K);
	var fn = joinPath(3)+'/'+K;
	return fn;
}

exports.root = function( aRoot ) {
	return DBPath( 0, aRoot );
}

exports.DB = function( DB ) {
	return DBPath( 1, DB );
}

exports.Table = function( Table ) {
	return DBPath( 2, Table );
}

joinPath = function( level ) {
	var str = "";
	for( var i=0;i<level;i++ ) {
		str += dbPath[i]+'/';
	}
}

DBPath = function( level, mypath ) {
	if( mypath !== undefined ) {
		var aRoot = joinPath(level) + mypath;
		fs.exists(aRoot, function (ex) {
			if (!ex) {
				console.log(dbPathName[level]+': not exist ');
				throw ex;
			}
      else 
				fs.stat( aRoot, function (err, stat) {
					if (err) 
						throw err;
					else {
						if( stat.isDirectory() ) {
							if( level !=0 )
								dbPath[level] = validK(myPath);
							else
								dbPath[level] = myPath;
							console.log(dbPathName[level]+myPath);
						}
						else
							console.log(dbPathName[level]+myPath+' invaild');
	        }
				});
		});
	}
	else {
		return dbPath[level];
	}
}

Exports.setAsync = function( K, V ) {
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




