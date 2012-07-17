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
 
`kv=require('FileKVDB');`    
`kv.init('/kvdb');`    
`kv.set(K,V);`    
`V=kv.get(K);`    
`keys=kv.list();`   
`kv.del(K);`   

