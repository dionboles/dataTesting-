# Supervised classification 

EX: 
- tagged photos
- music [temp,Genre] 

## Feature and Labels 
what is a feature of musics
- inteusity 
- tempo
- genre 
- gender 

how do we use features to make labels 

it is a 1 or 0  == like or dislike 

from the data you get back from the features to do i like the 
temp and the inteusity you can make that desiontion 


ML table for temp and inteusity

|temp |inteusity|Like|User|
|-----|---------|----|---|
|fast|high| Green|Jon
|slow|high| Green|Jon
|fast|high| Green|Jon
|slow|light| Red|Jon
|slow|light|Red| Jane|
|slow|high|Red| Jane|
|slow|high|Red| Jane|
|fast|light|Red| Jane|

you can make a prediction about jon 

He likes High inteusity music 

And jane like 
slow music 
# ML Makes decision surface 
to make were is makes prediction that are green and red by d
# unsupervied learning 

# What Ml libary will i use 

###sklearn 
```
 import numpy as np 
 from sklean.naive_bayes import GaussianNB
 clf = GaussianNB()
 clf.fit()
 print(clf.)

```


