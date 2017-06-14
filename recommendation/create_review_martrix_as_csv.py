import pandas as pd
import numpy as np 
import os 
import webbrowser
# -*- coding: utf-8 -*
# reads the dateset into a data table 
df = pd.read_csv("movie_ratings_data_set.csv")

ratungs_df = pd.pivot_table(df, index="user_id", columns="movie_id",aggfunc=np.max)

ratungs_df.to_csv("review_matrix.csv",na_rep='')