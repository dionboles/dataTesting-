import numpy as np 
import pandas as pd 
import matrix_factorization_untilities

df = pd.read_csv('movie_ratings_data_set.csv')

movie_df = pd.read_csv("movies.csv",index_col="movie_id")

ratings_df = pd.pivot_table(df,index="user_id",columns="movies_id",aggfunc=np.max)

U,M = matrix_factorization_untilities.low_rank_matrix_factorization(ratings_df.as_matrix(),num_features=15,regularization_amount=1.0)

movie_id = 5


movie_infomation = movie_df.loc[5]

print("We are finding movie similar to this movie:")
print("Movie title: {}".format(movie_infomation.title))
print("Gene: {}".format(movie_infomation.genre))

# the main logic for finding smilar movies:

pcurrent_moive_features = M[movie_id -1]

difference = M - current_moive_features

abosolute_difference = 

total_difference = 

m