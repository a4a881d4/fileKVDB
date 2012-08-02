#include <sys/types.h>
#include <dirent.h>
#include <errno.h>
#include <vector>
#include <string>
#include <iostream>
#include 'FileKVDB.h'

string FileKVDB::validK(string K)
{
	while(1) {
		int pos = K.find('/');
		if( pos!= K.npos ) {
			K=K.subst(0,pos-1)+subst(pos+1);
		}
		else
			break;
	}
	return K;
}
string FileKVDB::joinPath( int level )
{
	string str = "";
	for( int i=0;i<level;i++ ) {
		str.append(dbPath[i]+'/');
	}
	return str;
}
vector<string>& internalList( level )
{
	string dir = joinPath(level);
	vector<string>* files = dirAdir( dir );
    vector<string> *ret = new vector<string>;
	for( int k=0;k<files->size;k++ ) {
		var name = realName( (*files)[k], 3 );
		if( name.find('.tar.gz')==name.npos ) {
			ret->push_back(name);
		}
	}
	delete files;
	return *ret;	
}

vector<string>* FileKVDB::dirAdir( string dir )
{
	vector<string>* files = new vector<string>;
    DIR *dp;
    struct dirent *dirp;
    if((dp  = opendir(dir.c_str())) == NULL) {
        cout << "Error(" << errno << ") opening " << dir << endl;
        return errno;
    }

    while ((dirp = readdir(dp)) != NULL) {
        files->push_back(string(dirp->d_name));
    }
    closedir(dp);
    return files;
}
void FileKVDB::clearBackup( string dir )
{
	vector<string> *files = dirAdir( dir );
	vector<string> *ret = new vector<string>;
	for( int k=0;k<files->size;k++ ) {
		var name = realName( (*files)[k], 3 );
		if( name.find('.tar.gz')!=name.npos ) {
			remove(dir+(*files)[k]);
		}
	}
	delete files;
	delete ret;
}

FileKVDB::FileKVDB( string root )
{
	dbPath[0]=root;
}

string FileKVDB::clearTable( string Table, string db )
{
	string dir = dbPath[0]+'/'
		+ dbPrefix[1]+db+'/'
		+ dbPrefix[1]+Table+'/';
	vector<string> *files = dirAdir( dir );
	for( int i=0;i<files->size;i++ )
	{
		remove(dir+(*file)[i]);
	}
	delete files;		
	return dir;
}
void FileKVDB::delTable( string Table, string db )
{
	string dir = clearTable( Table,db );
	remove( dir );
}
void FileKVDB::clearDB( string db )
{
	string backupDB = DB();
	DB(db);
	vector<string> tables = listDB();
	for( int i=0;i<tables.size;i++ )
	{
		delTable(tables[i],db);	
	} 
	clearTableBackup(db);
}
		
void FileKVDB::set( string K, string V )
{
	string filename = fn(K);
	ofstream out(filename);
	out<<V;
	out.close(); 
}
string FileKVDB::get( string K )
{
	string filename = fn(K);
	ifstream in(filename);
	string V = "";
	in>>V;
	in.close();
	return V; 
}

void FileKVDB::del( string K )
{
	string filename = fn(K);
	remove(filename);
}
bool FileKVDB::has( string K )
{
	string filename = fn(K);
	ifstream in(filename);
	if(in) {
		in.close();
		return true;
	}
	return false;
}

bool FileKVDB::hasDir( int level )
{
	string dir = joinPath(level);
	DIR *pDir;
    bool bExists = false;
    pDir = opendir (dir);
    if (pDir != NULL)
    {
        bExists = true;    
        (void) closedir (pDir);
    }

    return bExists;
}
