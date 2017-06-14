# This file is testing how are ratings system works 

# this is a ratings vector ex data from users 
ratings =[5,2,3,3,4,5,5,1,5,1,3,4]

# loops makes the user rating go up on a 10 point scale
for i , value in enumerate(ratings):
    print("Updating rating {}".format(i))
    ratings[i] = value*2

print(ratings)