from sklearn import tree
from flask import Flask,render_template,request,jsonify
import numpy
import MySQLdb
db = MySQLdb.connect(host="localhost",user="root",password="root",database="ml",port=8889)
app = Flask(__name__)
cursor = db.cursor()

cursor.execute("SELECT heigth,weight,shoe FROM `dataSet`");
x = cursor.fetchall();
# X = [[180, 80, 44], [177,70,43], [160,60,38], [154,54,37], [171,75,42], [150,60,33]]
cursor.execute("SELECT label FROM `label`");
y = cursor.fetchall();

print(y)

clf = tree.DecisionTreeClassifier()

clf = clf.fit(x,y)



@app.route("/")
def hello():
    return render_template("index.html",X=x)
@app.route("/graph")
def graph():
    return render_template("graph.html")
@app.route("/data",methods=['POST',"GET"])
def data():
    height=int(request.form['height'])
    weight=int(request.form['weight'])
    shoe=int(request.form['shoe'])
    cursor.execute("INSERT INTO `ml`.`dataSet` (`heigth`, `weight`, `shoe`) VALUES(%s,%s,%s)",(height,weight,shoe))
    db.commit()
    # X.append([height,weight,shoe])
    # print(X)
    predeiction = clf.predict([[height,weight,shoe]])
    print()
    guess = str(predeiction[0])
    print(guess)
    cursor.execute("INSERT INTO `ml`.`label` (`label`) VALUES (%s)",([guess]))
    db.commit()
    return jsonify(predeiction[0]);

if __name__ == "__main__":
    app.run( debug=True)