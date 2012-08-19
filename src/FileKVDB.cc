#include <sys/types.h>
#include <sys/stat.h>
#include <assert.h>
#include <dirent.h>
#include <errno.h>
#include <stdio.h>
#include <vector>
#include <string>
#include <iostream>
#include <fstream>

using namespace std;

#include "FileKVDB.h"

string FileKVDB::dbPathName[4] = { "DB->root:", "DB->DB:", "DB->Table:", "DB->item:" };
string FileKVDB::dbPrefix[4] = {"", "DB_", "T_", "K_" };
string FileKVDB::version = "0.0.4";
  
string FileKVDB::validK(string K)
{
  while(1) {
    int pos = K.find('/');
    if( pos!= K.npos ) {
      K=K.substr(0,pos-1)+K.substr(pos+1);
    }
    else
      break;
  }
  return K;
}
string FileKVDB::joinPath( int level )
{
  assert( level>=0 && level<4 );
  string str = "";
  for( int i=0;i<level;i++ ) {
    str.append(dbPath[i]+'/');
  }
  return str;
}
vector<string>& FileKVDB::internalList( int level )
{
  assert( level>=0 && level<4 );
  string dir = joinPath(level);
  vector<string>* files = dirAdir( dir );
  vector<string> *ret = new vector<string>;
  for( int k=0;k<files->size();k++ ) {
    string name = realName( (*files)[k], 3 );
    if( name.find(".tar.gz")==name.npos ) {
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
        return NULL;
    }

    while ((dirp = readdir(dp)) != NULL) {
        string sdir = string(dirp->d_name);
        if( sdir==".." || sdir=="." )
          continue;
        files->push_back(sdir);
    }
    closedir(dp);
    return files;
}
void FileKVDB::newDir( int level, string d )
{
  assert( level>=0 && level<4 );
  string dir = joinPathWithPrefix(level)+d;
  mkdir( dir.c_str(),0755);
}
void FileKVDB::clearBackup( string dir )
{
  vector<string> *files = dirAdir( dir );
  vector<string> *ret = new vector<string>;
  for( int k=0;k<files->size();k++ ) {
    string name = realName( (*files)[k], 3 );
    if( name.find(".tar.gz")!=name.npos ) {
      string fullname = dir+(*files)[k];
      remove(fullname.c_str());
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
  if( hasDB( db ) ) {
    string backupDB = DB();
    DB(db);
    if( hasTable( Table ) ) {
      string dir = dbPath[0]+'/'
        + dbPrefix[1]+db+'/'
        + dbPrefix[1]+Table+'/';
      vector<string> *files = dirAdir( dir );
      for( int i=0;i<files->size();i++ ) {
        string fullname = dir+(*files)[i];
        remove(fullname.c_str());
      }
      delete files;    
      return dir;
    }
    DB( backupDB );
  }
  return "";
}
void FileKVDB::delTable( string Table, string db )
{
  if( hasDB( db ) ) {
    string backupDB = DB();
    DB(db);
    if( hasTable( Table ) ){
      string dir = clearTable( Table, db );
      if( dir != "" )
        remove( dir.c_str() );
    }
    DB( backupDB );
  }
}
void FileKVDB::clearDB( string db )
{
  if( hasDB( db ) ) {
    string backupDB = DB();
    DB(db);
    vector<string> tables = listDB();
    for( int i=0;i<tables.size();i++ ) {
      delTable(tables[i],db);  
    } 
    clearTableBackup(db);
    DB(backupDB);
  }
}
    
void FileKVDB::set( string K, string V )
{
  string filename = fn(K);
  ofstream out(filename.c_str());
  out<<V;
  out.close(); 
}
string FileKVDB::get( string K )
{
  string filename = fn(K);
  ifstream in(filename.c_str());
  string V = "";
  in.unsetf(ios::skipws); 
  do {
    char a;
    in>>a;
    V+=a;
  } while (!in.eof());
  V=V.substr(0,V.length()-1);
  in.close();
  return V; 
}

void FileKVDB::del( string K )
{
  if( has(K) ) {
    string filename = fn(K);
    remove(filename.c_str());
  }
}
bool FileKVDB::has( string K )
{
  string filename = fn(K);
  ifstream in(filename.c_str());
  if(in) {
    in.close();
    return true;
  }
  return false;
}

bool FileKVDB::hasDir( int level, string d )
{
  assert( level>=0 && level<4 );
  string dir = joinPathWithPrefix(level)+d;
  DIR *pDir;
  bool bExists = false;
  pDir = opendir (dir.c_str());
  if (pDir != NULL) {
    bExists = true;    
    (void) closedir (pDir);
  }
  return bExists;
}


#ifdef SELFTEST
void TESTSet() {
  FileKVDB ttu("kvdb");
  ttu.newDB("myDB");
  ttu.DB("myDB");
  ttu.newTable("myTable");
  ttu.Table("myTable");
  ttu.set("1","Hello World!- ");
}

void TESTGet() {
  FileKVDB ttu("kvdb");
  if( ttu.hasDB("myDB") ) {
    ttu.DB("myDB");
    if( ttu.hasTable("myTable") ) {
      ttu.Table("myTable");
      if( ttu.has("1") ) {
        string V = ttu.get("1");
        cout << "Get :" << V <<'|' << endl;
        return;
      }
    }
  }
  cout << "Get Error" << endl;
}

int main() {
  TESTSet();
  TESTGet();
}

#endif

