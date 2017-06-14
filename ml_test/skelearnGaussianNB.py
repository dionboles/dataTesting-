import numpy as np  
from sklearn import svm
X = np.array([[1,2],[1,2],[0,2],[2,2]])
Y = np.array([0,0,0,1])
n_samples = len(X)
print(n_samples)
classifier = svm.SVC(gamma=0.001)
classifier.fit(X,Y)
predicted = classifier.predict([1,2])

print(predicted)