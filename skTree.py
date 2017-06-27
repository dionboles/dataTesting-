from sklearn import tree
from flask import Flask,render_template,request
import numpy
app = Flask(__name__)

X = [[180, 80, 44], [177,70,43], [160,60,38], [154,54,37], [171,75,42], [150,60,33]]

Y = ["boy","girl","boy","girl","boy","girl"]


clf = tree.DecisionTreeClassifier()

clf = clf.fit(X,Y)

# predeiction = clf.predict([[height,weight,shoe]])


@app.route("/")
def hello():
    return render_template("index.html")

@app.route("/data",methods=['POST'])
def data():
    height=request.form['height']
    weight=request.form['weight']
    shoe=request.form['shoe']
    X.append([height,weight,shoe])
    print(X)
    predeiction = clf.predict([[height,weight,shoe]])
    Y.append([predeiction[0]])

    return predeiction[0]

if __name__ == "__main__":
    app.run( debug=True)