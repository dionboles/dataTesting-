# NOTE: This Script is a test with a recomnedtion 
# -*- coding: utf-8 -*-
import pandas,os
import webbrowser
data_table = pandas.read_csv("movie.csv")

html = data_table[0:100].to_html()

with open("data.html","w") as f:
    f.write(html.encode("UTF-8"))


full_filename = os.path.abspath("data.html")

webbrowser.open("file://{}".format(full_filename))