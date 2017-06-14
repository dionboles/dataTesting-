import json 
import datetime
import csv
import numpy as np
import pandas as pd 
timestamp = []
message = []
package = []

with open("data.json") as fp:
    for i in fp:
        if str(i).find("message") is not -1:
            box = i.strip().split(" ")
            timestamp.append(box[2]+":"+box[3]+":"+box[4])
            message.append(box[5])
            package.append(box[6])
               
        


df = pd.DataFrame({"timestamp":timestamp,"message":message,"package":package})

print(df)


# 
# for i in range(len(message)):
#     print(data[0][0])
# with open("text.csv",'w',newline='')as fp:
#     a = csv.writer(fp,delimiter=",")
#     data=[["Timestamp","message","package"],d]
        
    
#     a.writerows(data)

# dic = json.dumps(data.read())
# box = dic.split(",")
# for i in box:
#     if str(i).find('message') is not -1:
#        tokenizer = Tokenizer(num_words="MAX_NB_WORDS")
#        tokenizer.fit_on_texts(dic)
#        sequences = tokenizer.texts_to_sequences(dic)
#        word_index = tokenizer.word_index
#        dat = pad_sequences(sequences, maxlen="MAX_SEQUENCE_LENGTH")
#        print(dat)   