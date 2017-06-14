from sklearn.feature_extraction import text 
from nltk.corpus import stopwords
import numpy as np 
# history of data then compare active 
data = open("text.txt")
bits = str(data.read()).strip().split(" ")
CleanList = list(set(bits))
for w in CleanList:
    print(str(w).find("President"))
d = [(lambda w: str(w).find(w) if w is 0 else -1 )(w) for w in CleanList]
vectorizer = text.CountVectorizer(binary=True).fit(bits)
vectorizer_text = vectorizer.transform(bits)

stop_words = set(stopwords.words("english"));

# for w in box:
#     if w not in stop_words:
#         print(w)

#print(data)





# js alert(mesage) -> prumpt("take action?"  yes : no ) ->  api -> 
def alert(message):
        print(message)

