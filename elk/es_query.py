from elasticsearch import Elasticsearch
es = Elasticsearch()
time = []
message =[]
name = []
def _collect_samples():
        on = es.ping()
        if(on is True):
         records = es.search()
         for doc in records['hits']['hits']:
             time.append(records['hits']['hits'][2]['_source']['@timestamp'])
             message.append( records['hits']['hits'][2]['_source']['message'])
             name.append(records['hits']['hits'][2]['_source']['beat']['name'])
         else:
              print("elasticsearch is not working")
        print(time)
        print("\n")
        print(message)
   
               
if __name__ == '__main__':
    _collect_samples()