# What is a data scientist 
import os 
import urllib
import pandas as pd
import numpy as np
import csv 
# makes a folder 

filename = "SchoolAdmissionData.csv"
if os.path.isdir("SchoolAdmissionData") is False:
    os.mkdir("SchoolAdmissionData")

# moves into the folder that was just made 
os.chdir("SchoolAdmissionData")
# goes on the web to download the data
if os.path.isfile(filename) is False:
    response = urllib.request.urlopen("http://www.calvin.edu/~stob/data/Berkeley.csv")
# makes a file and 
    # this will get http response and read in the bytearray then convert it into a string and change it to ascii 
    cleanString =str(response.read().decode('ascii'))
    print(cleanString)
    file = open(filename,"w+");
    file.write(cleanString)

df = pd.read_csv(filename)
print(df)