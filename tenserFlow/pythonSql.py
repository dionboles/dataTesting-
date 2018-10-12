import MySQLdb
import tensorflow as tf
import numpy as np 
db = MySQLdb.connect(host="localhost",user="user",password="#######",database="test",port=8888)
data = []
date = []
user = []
log = []
cursor = db.cursor()

with open("data.txt") as f:
    for i in f:
        data.append(i.split(" "))

for i in data:
    date.append(i[0]+" "+i[1]+" "+i[2])
    user.append(i[3])
    log.append(i[4]+" "+i[5]+i[6])


# try:
#    # Execute the SQL command
#    for i in range(len(date)): 
#         cursor.execute("INSERT INTO  data (user,time,log) VALUES(%s,%s,%s)",(user[i],date[i],log[i]))
#    # Commit your changes in the database
#    db.commit()
# except:
#    # Rollback in case there is any error
#    db.rollback()

# # disconnect from server
# db.close()

timestamp = np.array[[]]
cursor.execute("Select * from data");
results = cursor.fetchall()




print(timestamp)





