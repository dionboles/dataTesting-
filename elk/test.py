# from anomoly import SteadyState
import sys
from es_tools import ES
import time, calendar #, random

# import requests, json
# from elasticsearch import Elasticsearch



def _collect_samples():

    # setup an instance of ES object for querying Elasticsearch
    # just need the hostname and port on which Elasticsearch is running,
    # i believe we are using 5601 for ES and Kibana right now
    es = ES("localhost", 5601)

    # search any and all filebeat records and return any "logs" which have
    # "Installed" in the message field
    records = es.search("filebeat-*", "log", "message", "Installed")

    # this will return an array of JSON log records so we need to iterate through
    # and print out the various records
    for doc in records['hits']['hits']:
        print("\n" + str(doc))

if __name__ == '__main__':
    _collect_samples()



    # records = es.search("filebeat-2017.02.22", "log", "message", "Installed")
    # records = es.search_time_range("filebeat-2017.02.22", "log", "message", "Installed","now-2d", "now" )
    # records = es.search_time_range("filebeat-2017.02.22", "log", "message", "Installed","2017-02-22 00:07:00", "2017-02-23T10:07:52" )
# every 15 seconds (default):
#      1) tally the number of target events (failed login attempts) since the last 15 seconds
#      2) add this tally as a new sample value, and update in the current dataset
#
    # create instance of Elasticsearch connector for doing our necessary queries
    # es = ES("localhost", 9200)
    # # records = es.search("filebeat-2017.02.22", "log", "message", "Feb 22 11:20:16 Installed:")
    # records = es.search("filebeat-2017.02.22", "log", "message", "Installed")
    # # records = es.search_time_range("filebeat-2017.02.22", "log", "message", "Installed","now-2d", "now" )
    # # records = es.search_time_range("filebeat-2017.02.22", "log", "message", "Installed","2017-02-22 00:07:00", "2017-02-23T10:07:52" )
    # for doc in records['hits']['hits']:
    #     print("\n" + str(doc))



    # login_fails = SteadyState()
    #
    # while( login_fails.get_dataset_size() < 20 ):
    #     # failed login attempts
    #     if( time.time() > (login_fails.get_sample_time() + login_fails.get_sample_rate())  ):
    #         login_fails.set_sample_time(time.time())
    #         login_fails.update(random.randint(0,50))
    #         login_fails.report()
    #