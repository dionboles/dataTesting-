# Python elasticsearch code 
___
```
Glob vars 
from elasticsearch import Elasticsearch
es = Elasticsearch()
es.indices.create(index='test-index', ignore=400)
```

check the status of elasticsearch  this code can be use to ping the sever 
```
 This is calling on the Glob var  es 
on =  es.ping ()
    will return True or False 
    so i can do a if 
if (on is True):
    print("We are ok")
else:
    print("we are not ok")

This well return all data in elk 

es.search()