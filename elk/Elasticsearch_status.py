from elasticsearch import Elasticsearch
elastic = Elasticsearch([{'host':'localhost', 'port':5601}])

on = elastic.ping()

if on is False:
    print("Elasticsearch is off");
else:
    print("ok")

