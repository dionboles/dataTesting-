# from keras.preprocessing.text import Tokenizer
# from keras.preprocessing.sequence import pad_sequences
import nltk
import tflearn
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()
import tensorflow as tf
import random
from flask import Flask,render_template,request
import numpy as np
import json 
from flask import Flask,render_template,request
app = Flask(__name__)
# f = open("data.txt").read()


# nb_words = 3
# text = []
# text.append(f)
# token = Tokenizer(num_words=nb_words)
# token.fit_on_texts(text)


# word_index = token.word_index

# print(token.texts_to_sequences(text))
# print("found %s unquie tokens" % len(word_index))
def train():
    with open('questions.json') as json_data:
        intents = json.load(json_data)
        words = []
        classes = []
        documents = []
        ignore_words = ['?']
        for intent in intents['intents']:
            for pattern in intent['patterns']:
                 w = nltk.word_tokenize(pattern)
                 words.extend(w)
                 documents.append((w, intent['tag']))
                 if intent['tag'] not in classes:
                     classes.append(intent['tag'])
        words = [stemmer.stem(w) for w in words if w not in ignore_words]
        words = sorted(list(set(words)))
        classes = sorted(list(set(classes)))
        # print (len(documents), "documents")
        # print (len(classes), "classes", classes)
        # print (len(words), "unique stemmed words", words)
   
        
    for doc in documents:
        output = []
        output_empty =[0] * len(classes)
        bag =[]
        pattern_words = doc[0]
        pattern_words = [stemmer.stem(word.lower()) for word in pattern_words]
        for w in words:
            training = []
            bag.append(1) if w in pattern_words else bag.append(0)
            output_row = list(output_empty)
            output_row[classes.index(doc[1])] = 1
            training = np.concatenate([bag,output_row])
            random.shuffle(training)
            

            # tf.reset_default_graph()
            # net = tflearn.input_data(shape=([None,len(train_x[0])]))
            # net = tflearn.fully_connected(net, 8)
            # net = tflearn.fully_connected(net, 8)
            # net = tflearn.fully_connected(net, len(train_y[0]), activation='softmax')
            # net = tflearn.regression(net)
            # model = tflearn.DNN(net,tensorboard_dir='tflearn_logs')
            # model.fit(train_x, train_y, n_epoch=1000, batch_size=8, show_metric=True)
            # model.save('model.tflearn')
# @app.route("/")
# def hello():
#     return render_template("index.html")

# @app.route("/data",methods=['POST'])
# def data():
#     word=request.form['word']
#     return word

# if __name__ == "__main__":
#     app.run( debug=True)

train()