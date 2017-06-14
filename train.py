from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
import numpy as np
import csv

f = open("data.txt").read()


nb_words = 3
text = []
text.append(f)
token = Tokenizer(num_words=nb_words)
token.fit_on_texts(text)

word_index = token.word_index

print("found %s unquie tokens" % len(word_index))
print(token.word_index)
