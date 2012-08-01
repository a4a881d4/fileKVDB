
/*!
 * FileKVDB
 * Copyright(c) 2012 a4a881d4 <a4a881d4@163.com>
 * MIT Licensed
 */

/**
 * DB prefix is DB_
 * Table Prefix is T_
 * Key Prefix is K_
 */
var fs = require('fs')
	, dbPath = [ 'kvdb', 'DB', 'Table', 'Item' ]
	, dbPathName = [ 'DB->root:', 'DB->DB:', 'DB->Table:', 'DB->item:' ]
	, dbPrefix = ['', 'DB_', 'T_', 'K_' ]

/**
 * version.
 */
exports.version = '0.0.4';

/**
 * internal file or dir check.
 *
 * @param {Key} ...
 * @return {Key without `\`}
 * @utility function
 */
validK = function(K) {
	if( K !== undefined )
		return K.replace(new RegExp('\/',"gm"),'');
	else
	{
		console.error('may be a null key');
		return K;
	}
}

/**
 * internal/export build filename.
 *
 * @param {Key} ...
 * @return {DB file system file name}
 * @utility function
 */
exports.fn = fn = function(K) {
	K = validK(K);
	var fn = joinPathWithPrefix(3)+K;
	return fn;
}

/**
 * Export set get DB root.
 *
 * @param {DB root path} ...
 * @return {if no param return current root}
 */
exports.root = function( aRoot ) {
	return DBPath( 0, aRoot );
}

/**
 * Export set get current DB .
 *
 * @param {DB name} ...
 * @return {if no param return current DB}
 */
exports.DB = setDB = function( DB ) {
	return DBPath( 1, DB );
}

/**
 * Export set get current Table .
 *
 * @param {Table name} ...
 * @return {if no param return current Table}
 */
exports.Table = setTable = function( Table ) {
	return DBPath( 2, Table );
}

/**
 * internal build path.
 *
 * @param {level 0:root 1:DB 2:table } ...
 * @return {DB file system path}
 * @utility function
 */
joinPath = function( level ) {
	var str = '';
	for( var i=0;i<level;i++ ) {
		str += dbPath[i]+'/';
	}
	return str;
}

joinPathWithPrefix = function( level ) {
	return joinPath( level ) + dbPrefix[level];
}
/**
 * internal get set path.
 *
 * @param {level 0:root 1:DB 2:table } ...
 * @return {if no second param return current name}
 * @utility function
 */
DBPath = function( level, mypath ) {
	if( mypath !== undefined ) {
		var aRoot = joinPathWithPrefix(level);
		if( level==0 )
		{
			aRoot += mypath;
			dbPath[0] = mypath;
		}
		else
		{
			aRoot += validK(mypath);
			dbPath[level] = dbPrefix[level]+validK(mypath);
		}		
		fs.exists(aRoot, function (ex) {
			if (!ex) {
				console.log(dbPathName[level]+': not exist ('+aRoot+')');
				console.error(ex);
			}
      else 
				fs.stat( aRoot, function (err, stat) {
					if (err) 
						console.error( err );
					else {
						if( stat.isDirectory() ) {
							console.log(dbPathName[level]+dbPath[level]);
						}
						else
							console.error(dbPathName[level]+mypath+' invaild');
	        }
				});
		});
	}
	else {
		return realName( dbPath[level], level );
	}
}

realName = function( str, level ) {
	var inx = str.indexOf('_');
	if( level==0 )
		return str;
	else
		return str.substring(inx+1);		
}

/**
 * internal make dir->DB or table.
 *
 * @param {level 1:DB 2:table } ...
 * @return {if no second param return current name}
 * @utility function
 */
newDir = function( level, dir ) {
	var aRoot = joinPathWithPrefix(level) + dir;
	var mkdirp = require('mkdirp');
	mkdirp.sync( aRoot );
}	

/**
 * Export new DB .
 * if DB exist do nothing
 * @param {DB name} ...
 * @return none
 */
exports.newDB = function( DB ) {
	newDir( 1, DB );
}

/**
 * Export new Table .
 * if Table exist do nothing
 * @param {DB name} ...
 * @return none
 */
exports.newTable = function( table ) {
	newDir( 2, table );
}

/**
 * internal check dir exist.
 *
 * @param {level 1:DB 2:table } ...
 * @return {if no second param return current name}
 * @utility function
 */
hasDir = function( level,dir,fn ) {
	var aRoot = joinPathWithPrefix(level)+dir;
	fs.exists(aRoot, function (ex) {
		if (!ex) {
			fn(false);
			console.error('not this file/dir:'+aRoot);
		}
		else {
			fs.stat( aRoot, function (err, stat) {
					if (err) {
						console.error( err + 'else no use');
						fn(false);
					}
					else {
						if( stat.isDirectory() ) {
							fn(true);
						}
						else
							fn(false);
	        }
				});
			}
	});
}

/**
 * Export check DB exist .
 *
 * @param {DB name, fn callback} ...
 * @return none
 */
exports.hasDB = function(DB,fn) {
	hasDir(1,DB,fn);
}

/**
 * Export check table exist .
 *
 * @param {DB name, fn callback} ...
 * @return none
 */
exports.hasTable = function(table,fn) {
	hasDir(2,table,fn);
}

/**
 * Export get whole DB structure .
 *
 * @param {} ...
 * @return object
 */
exports.Tree = function () {
	var aRoot = joinPath(1);
	var DBs = fs.readdirSync(aRoot);
	var ret = {};
	for( var i in DBs ) {
		if( DBs[i].indexOf('.tar.gz')==-1 ) {
			tables = fs.readdirSync(aRoot+'/'+DBs[i]);
			var m = 0;
			var minT = [];
			for( var j in tables ) {
				if( tables[j].toString().indexOf('.tar.gz')==-1 ) {
					minT[m] = realName( tables[j], 2 ); 
					m++;
				}
			}
			ret[realName(DBs[i],1)] = minT;
		}
	}
	return ret;
}

exports.backup = function( task ) {
	var dir = joinPathWithPrefix(1);
	dir += task['DB'];
	if( task['Table'] !== undefined ) {
		dir += '/'+dbPrefix[2]+task['Table'];
	}
	var fileName = dir+'.tar.gz';
	var fstream = require('fstream');
	var tar = require('tar');
	var zlib = require('zlib');
	console.log("tar gzipping " + dir + " -> " + fileName);
	fstream.Reader({path: dir, type: 'Directory'})
		.pipe(tar.Pack())  
		.pipe(zlib.createGzip())  
		.pipe(fstream.Writer(fileName));
}

exports.restore = function( task ) {
	var dir = joinPathWithPrefix(1);
	dir += task['DB'];
	if( task['Table'] !== undefined ) {
		dir += '/'+dbPrefix[2]+task['Table'];
	}
	var fileName = dir+'.tar.gz';
	dir = joinPath(1);
	if( task['Table'] !== undefined ) {
		dir += task['DB'];
	}
	var fstream = require('fstream');
	var tar = require('tar');
	var zlib = require('zlib');
	console.log( "tar ungzipping " + fileName + " -> " + dir );
	fstream.Reader(fileName)
		.pipe(zlib.createGunzip())  
		.pipe(tar.Extract({path: dir}));
}

exports.clearTable = clearTable =function( Table, DB ) {
	var backDBPath = dbPath.slice(0);
	if( DB !== undefined ) {
		setDB(DB);
	}
	setTable(Table);
	var Keys = itemList();
	for( var i in Keys )
		internalDelAsync(Keys[i]);
	dbPath = backDBPath.slice(0);
}

exports.delTable = delTable = function(Table, DB ) {
	var backDBPath = dbPath.slice(0);
	setDB(DB);
	setTable(Table);
	clearTable(Table,DB);
	if( DB !== undefined ) {
		dbPath[1] = dbPrefix[1]+DB;
	}
	var dir = joinPathWithPrefix(2)+Table;
	fs.rmdirSync(dir);
	dbPath = backDBPath.slice(0);
}
 
exports.clearDB = clearDB = function(DB) {
	var backDBPath = dbPath.slice(0);
	setDB(DB);
	var tables = tabelList();
	for( var i in tables ) 
		delTable( tables[i], DB );
	clearBackup(2);
	dbPath = backDBPath.slice(0);
}	

exports.delDB = delDB = function(DB) {
	var backDBPath = dbPath.slice(0);
	setDB(DB);
	var tables = tabelList();
	console.log(JSON.stringify(tables));
	for( var i in tables ) 
		delTable( tables[i], DB );
	clearBackup(2);
	var dir = joinPathWithPrefix(1)+DB;
	fs.rmdirSync(dir);
	dbPath = backDBPath.slice(0);
}

exports.setAsync = function( K, V ) {
	fs.writeFile(fn(K),V,function(err) {
		if( err ) {
			console.log('fail set key '+K);
			console.log(err);
		}
		else
			console.log('set key '+K);
		});
}

exports.set = function( K, V ) {
	var err = fs.writeFileSync(fn(K),V);
}
	
exports.get = function( K ) {
	var V = fs.readFileSync(fn(K));
	return V.toString();
	}

internalList = function( level ) {
	var dir = joinPath(level);
	var keys = fs.readdirSync(dir);
	var j = 0;
	var ret = [];
	for( var k in keys ) {
		var name = realName( keys[k], 3 );
		if( name.indexOf('.tar.gz')==-1 ) {
			ret[j]=name;
			j++;
		}
	}
	return ret;	
}

clearBackup = function( level ) {
	var dir = joinPath(level);
	var keys = fs.readdirSync(dir);
	for( var k in keys ) {
		if( keys[k].indexOf('.tar.gz')!=-1 ) {
			fs.unlinkSync(dir+keys[k]);		
		}
	}
}

exports.clearTableBackup = function( DB ) {
	var backDBPath = dbPath.slice(0);
	setDB(DB);
	clearBackup(2);
	dbPath = backDBPath.slice(0);
}

exports.clearDBBackup = function() {
	clearBackup(1);
}

exports.list = itemList = function() {
	return internalList(3);
}

exports.listTable = tabelList = function() {
	return internalList(2);
}

exports.listDB = dbList = function() {
	return internalList(1);
}

exports.delAsync = internalDelAsync = function(K) {
	fs.unlink(fn(K),function(err) {
		if( err ) {
			console.error('fail del key '+K);
			console.error(err);
		}
		else
			console.log('del key '+K);
		});
	}

exports.del = function(K) {
	fs.unlink(fn(K));
}

exports.has = function( K, callbackF ) {
	if( callbackF === undefined )
		return fs.existsSync(fn(K));
	else {
		fs.exists( fn(K), function(ex) {
			if(!ex)
				callbackF(false);
			else {
				fs.stat( fn(K), function (err, stat) {
					if (err) {
						console.error( err + 'else no use');
						callbackF(false);
					}
					else {
						if( stat.isFile() ) {
							callbackF(true);
						}
						else
							callbackF(false);
	        }
				});
			}
		});
	}
}



