#ifndef __FILEKVDB_H
#define __FILEKVDB_H
class FileKVDB {
	private:
		string dbPath[4];
		static string dbPathName[];
		static string dbPrefix[];
		string validK(string K);
		void setDB(string db) {return DBPath(1,db);};
		string setDB() {return DBPath(1);};
		void setTable(string t) {return DBPath(2,t);};
		string setTable() {return DBPath(2);};
		string joinPath( int level );
		string joinPathWithPrefix( int level ) { return joinPath(level)+dbPrefix[level];};
		string DBPath( int level ){return realName( dbPath[level], level );};
		void DBPath( int level, string mypath ){dbPath[level]=dbPrefix[level]+mypath;};
		string realName ( string str, int level ){int pos=str.find('_');if(pos!=str.npos) return str.substr(pos+1); else return str;};
		void newDir( int level, string dir );
		bool hasDir( int level, string dir );
		vector<string>& internalList( int level );
		void clearBackup( string dir );
		vector<string>* dirAdir( string dir );

	public:
		FileKVDB( string root );
		static string version;
		string fn( string k ){	return joinPathWithPrefix(3)+validK(k);};
		void root( string aRoot ) {return DBPath( 0, aRoot );};
		string root() { return DBPath(0); };
		void DB( string db ) { return setDB(db); };
		string DB() { return setDB(); };
		void Table( string table ) {return setTable( table );}; 
		string Table() { return setTable(); };
		void newDB( string db ) { newDir( 1, db ); };
		void newTable( string table ) {	newDir( 2, table );};
		bool hasDB(string db) {	return hasDir(1,db); };
		bool hasTable(string table) { return hasDir(2,table); };
		string clearTable( string Table, string db );
		void delTable( string Table, string db );
		void clearDB( string db );
		void clearTableBackup( string db ) {clearBackup(dbPath[0]+'/'+dbPrefix[1]+db+'/');};
		void clearDBBackup() {clearBackup(dbPath[0]+'/');};
		vector<string> list() {return internalList(3);};
		vector<string> listTable() {return internalList(2);};
		vector<string> listDB() {	return internalList(1); };
		void set( string K, string V );
		string get( string K );
		void del( string K );
		bool has( string K );
};
#endif
