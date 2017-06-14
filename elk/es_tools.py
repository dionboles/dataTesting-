from elasticsearch import Elasticsearch

# def format_results(results):
#     """Print results nicely:
#     doc_id) content
#     """
#     data = [doc for doc in results['hits']['hits']]
#     for doc in data:
#         print("%s) %s" % (doc['_id'], doc['_source']['content']))

class ES():
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.elastic = Elasticsearch([{'host':self.host, 'port':self.port}])

    def search(self, index, doc_type, search, keyword):
        body_str = "{\"query\": {\"match\": {\"" + search + "\": \"" + keyword + "\"}}}"
        # print(body_str)
        res = self.elastic.search(index=index, doc_type=doc_type, body = body_str )
        return res

    def search_time_range(self, index, doc_type, search, keyword, time_0, time_f):
        # temp = "\"filter\":{\"range\" : {\"@timestamp\" : {\"gt\" : \"" + time_0 + "\",\"lt\" : \"" + time_f + "\", \"time_zone\": \"+05:00\" }}}"
        temp = "\"filter\":{\"range\" : {\"@timestamp\" : {\"gt\" : \"" + time_0 + "\",\"lt\" : \"" + time_f + "\"}}}"
        # body_str = "{\"query\": {\"filtered\": {\"query\": {\"match\": {\"" + search + "\": \"" + keyword +  "\"}},\"filter\": {\"bool\": {\"must\": [{\"range\": {\"date\": {\"gte\": \"15-11-01\",\"lte\": \"15-11-30\"}}},{\"range\": {\"time\": {\"gte\": \"10:00:00\",\"lte\": \"12:00:00\"}}}]}}}}}"
        # body_str = "{\"query\": {\"filtered\": {\"query\": {\"match\": {\"" + search + "\": \"" + keyword +  "\"}},\"filter\": {\"bool\": {\"must\": [{\"range\": {\"date\": {\"gte\": \"17-02-21\",\"lte\": \"17-02-23\"}}},{\"range\": {\"time\": {\"gte\": \"00:00:00\",\"lte\": \"12:00:00\"}}}]}}}}}"


        # print(temp)
        # body{"query":{"match": {"message": "Installed" } },"filter":{"range":{"timestamp":{"gte":"time_0", "lte":"time_f"}}}}
        #    {"query":{"match": {"message": "Installed"}},filter":{"range" : {"timestamp" : {"gt" : "2017-02-22 17:07:52","lt" : "2017-02-22 17:07:52" }}}}
        body_str = "{\"query\":{\"match\": {\"" + search + "\": \"" + keyword + "\"}}," + temp + "}"
        # print(body_str)
        res = self.elastic.search(index=index, doc_type=doc_type, body = body_str )
        return res
#
#
# print("%d documents found" % res['hits']['total'])
# for doc in res['hits']['hits']:
#     print(doc)