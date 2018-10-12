import tensorflow as tf
import MySQLdb
import numpy as np 
db = MySQLdb.connect(host="localhost",user="user",password="######",database="test",port=8888)
cursor = db.cursor()
cursor.execute("Select * from data");
results = cursor.fetchall()
timestamp =[]
for i in results:
    timestamp.append(i[2])






