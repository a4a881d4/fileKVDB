[![build status](https://secure.travis-ci.org/a4a881d4/fileKVDB.png)](http://travis-ci.org/a4a881d4/fileKVDB)
# ***FileKVDB***
* �ļ���ΪK
* �ļ�����ΪV

**FileKVDB��**
* С��
* ��������
* ���ڲ���ϵͳ�ļ�ϵͳ
* KV
* ���ݿ�

**FileKVDB����**
* ���͵�
* ��ϵ�͵�
* ��Ч��    
���ݿ���������һ��Ŀ¼�������ļ���Ŀ���ơ�

## javascript ���ýӿ�
### ����ʹ�� 
`kv=require('filekvdb');`  
`kv.root('/kvdb')`  
`kv.DB('myDB')`  
`kv.Table('USER')`  
`kv.set(K,V);`      
`V=kv.get(K);`      
`keys=kv.list();`    
`kv.del(K);`   
### �½�DB�ͱ�
`kv.newDB('yourDB')`  
`kv.DB('yourDB')`  
`kv.newTable('yourTable')`  
### ��ѯ
`root = kv.root()`  
`DB = kv.DB()`  
`Tab = kv.Table()`  
`kv.hasDB('DB',function(ret) { if(ret==true) do some has DB })`  
`kv.hasTable('tabel', function(ret) { if(ret==true) do some has table })` 
`kv.has(K, function(ret) { if(ret==true) do some if K exist })` 
`kv.has(K) //if K exist return true`   
`Tree = kv.Tree()`
### ����\�ָ�\����
`kv.backup({'DB':'myDB','Table':'myTable'})`  
`kv.backup({'DB':'myDB'})`  
`kv.restore({'DB':'myDB','Table':'myTable'})`  
`kv.restore({'DB':'myDB'})`  
`kv.clearDB('DB')`  
`kv.clearTable('table')`  
`kv.clearTable('table','DB')`   

## C++ ���ýӿ�
### ����ʹ�� 
`FileKVDB kv("kvdb");`  
`kv.DB('myDB')`  
`kv.Table('USER')`  
`kv.set(K,V);`      
`string V=kv.get(K);`      
`vector<string> keys=kv.list();`    
`kv.del(K);`
### �½�DB�ͱ�
`kv.newDB("yourDB")`  
`kv.DB("yourDB")`  
`kv.newTable("yourTable")`  
### ��ѯ
`DB = kv.DB()`  
`Tab = kv.Table()`  
`kv.hasDB("DB")`  
`kv.hasTable("tabel")`  
`kv.has(K)` 
### ����
`kv.clearDB('DB')`  
`kv.clearTable('table','DB')`   

## C++  ����
`mkdir work`  
`make Test`  
`mkdir kvdb`  
`work/Test`  


