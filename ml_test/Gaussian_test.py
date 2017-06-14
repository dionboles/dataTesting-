import numpy as np 
from sklearn.naive_bayes import GaussianNB
import MySQLdb
import random
import pandas as pd

db = MySQLdb.connect(host="localhost",user="root",password="root",database="test",port=8889)
cursor = db.cursor()
cursor.execute("Select time from data");
results = [item for item in cursor.fetchall()];
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
fakeData = []
for i in range(309):
    num = random.randint(0,11)
    days  =random.randint(1,28)
    hours = random.randint(00,23)
    mins = random.randint(00,59)
    sec = random.randint(00,59)
    fakeData.append(months[num]+" "+str(days)+" "+str(hours)+":"+str(mins)+":"+str(sec))



df = pd.DataFrame(results)

print(df)
 