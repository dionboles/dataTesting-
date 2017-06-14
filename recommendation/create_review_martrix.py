import pandas as pd
import numpy as np 
import os 
import webbrowser
# -*- coding: utf-8 -*
# reads the dateset into a data table 
df = pd.read_csv("movie_ratings_data_set.csv")

ratungs_df = pd.pivot_table(df, index="user_id", columns="movie_id",aggfunc=np.max)

html = ratungs_df.to_html(na_rep="")

with open("review_matrix.html","w") as f:
    f.write(html.encode("UTF-8"))

full_filename = os.path.abspath("review_matrix.html")
webbrowser.open("file://{}".format(full_filename))