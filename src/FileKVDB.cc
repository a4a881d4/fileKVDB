string FileKVDB::validK(string K)
{
	return K.replace("/\//g","");
}
string FileKVDB::joinPath( int level )
{
	string str = "";
	for( int i=0;i<level;i++ ) {
		str += dbPath[i]+"/";
	}
	return str;
}
string[] internalList( level )
{
	string dir = joinPath(level);
	string[] keys = fs.readdirSync(dir);
	var j = 0;
	string[] ret;
	for( var k in keys ) {
		var name = realName( keys[k], 3 );
		if( name.indexOf('.tar.gz')==-1 ) {
			ret[j]=name;
			j++;
		}
	}
	return ret;	
}
void clearBackup( int level );
	public:
		FileKVDB( string root );
		const string version = "0.0.4";
		string fn( string k );
		void root( string aRoot ) {return DBPath( 0, aRoot );};
		string root() { return DBPath(0); };
		void DB( string db ) { return setDB(db); };
		string DB() { return setDB(); };
		void Table( string table ) {return setTable( table );}; 
		string Table() { return setTable(); };
		void newDB( string db ) { newDir( 1, db ); };
		void newTable( string table ) {	newDir( 2, table );};
		bool hasDB(string db) {	return hasDir(1,DB); };
		bool hasTable(string table) { return hasDir(2,table); };
		string Tree();
		void clearTable( string Table, string db );
		void delTable( string Table, string db );
		void clearDB( string db );
		void set( string K, string V );
		string get( string K );
		void clearTableBackup( string db ) {clearBackup(2);};
		void clearDBBackup() {clearBackup(1);};
		string[] list() {return internalList(3);};
		string[] listTablefunction() {return internalList(2);};
		string[] listDB() {	return internalList(1); };
		void del( string K );
		bool has( string K );
};
