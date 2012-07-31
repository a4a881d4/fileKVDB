# ***FileKVDB***
* 文件名为K
* 文件内容为V

**FileKVDB是**
* 小型
* 超轻量级
* 基于操作系统文件系统
* KV
* 数据库

**FileKVDB不是**
* 大型的
* 关系型的
* 高效的    
数据库的项数受一个目录下最大文件数目限制。

## javascript 调用接口
### 基本使用 
`kv=require('filekvdb');`  
`kv.root('/kvdb')`  
`kv.DB('myDB')`  
`kv.Table('USER')`  
`kv.set(K,V);`      
`V=kv.get(K);`      
`keys=kv.list();`    
`kv.del(K);`   
### 新建DB和表
`kv.newDB('yourDB')`  
`kv.DB('yourDB')`  
`kv.newTable('yourTable')`  
### 查询
`root = kv.root()`  
`DB = kv.DB()`  
`Tab = kv.Table()`  
`kv.hasDB('DB',function(ret) { if(ret==true) do some has DB })`  
`kv.hasTable('tabel', function(ret) { if(ret==true) do some has table })`  
`DBs = kv.find('table')`
`Tree = kv.Tree()`
### 备份\恢复\清除
`kv.backup({'DB':'myDB','Table':'myTable'})`  
`kv.backup({'DB':'myDB'})`  
`kv.restore({'DB':'myDB','Table':'myTable'})`  
`kv.restore({'DB':'myDB'})`  
`kv.clear()`  
`kv.clearDB('DB')`  
`kv.clearTable('table')`  



