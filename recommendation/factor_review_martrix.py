import pandas as pd
import numpy as np
import matrix_factorization_untilities
# loads data from csv 
raw_dataset_df = pd.read_csv("movie_ratings_data_set.csv")
# makes a dataframe 
ratings_df = pd.pivot_table(raw_dataset_df,index='user_id',columns="movie_id",aggfunc=np.max)
U, M = predicted_ratings = matrix_factorization_untilities.low_rank_matrix_factorization(ratings_df.as_matrix(),num_features=15,regularization_amount=0.1)

predicted_ratings = np.matmul(U,M)
predicted_ratings_df = pd.DataFrame(index=ratings_df.index,columns=ratings_df.columns,data=predicted_ratings)

predicted_ratings_df.to_csv("predicted_ratings.csv")