import tensorflow as tf
import MySQLdb
import numpy as np 
db = MySQLdb.connect(host="localhost",user="root",password="root",database="test",port=8889)
cursor = db.cursor()
cursor.execute("Select * from data");
results = cursor.fetchall()
timestamp =[]
for i in results:
    timestamp.append(i[2])






