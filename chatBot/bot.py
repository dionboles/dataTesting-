from sklearn.feature_extraction import text
import nltk 
from nltk import word_tokenize
from nltk.stem.porter import PorterStemmer

stemmer = PorterStemmer()

def stem_tokenes(tokens,stemmer):
    stremmed = []
    for item in tokens:
        stremmed.append(stemmer.stem(item))
    return stremmed

def tokenize(text):
    tokens = word_tokenize(text)
    stems = stem_tokenes(tokens,stemmer)
    return stems

vocab = ["hello world how are you "]
vect = text.CountVectorizer(tokenizer = tokenize,stop_words="english")
vec = vect.fit(vocab)
nexts = vec.transform(["hello how are yuo shoes"])

print(nexts.toarray())
