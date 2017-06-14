from sklearn.neighbors import KNeighborsClassifier
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np 
import pandas as pd 

data = []
user = []
path = []
date =[]
tDate = ["Dec 30 16:33:00","Dec 30 16:32:00","Dec 30 11:33:00"]

# reads the text log 
with open("data.txt") as f:
   for i in f:
       data.append(i.split(" "))


for i in data:
    date.append(i[0]+" "+i[1]+" "+i[2])
    user.append(i[3])
    path.append (i[4])

# 
n = np.array([date,path,user])
df  = pd.DataFrame(n)
df.to_csv("test.csv")


