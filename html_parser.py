from bs4 import BeautifulSoup
import re
soup = BeautifulSoup(open("./list.1.html"),"html.parser")

for i in soup.find_all("option"):
    p = re.compile(r'<.*?>')
    i.attrs = None
    i = str(i)
    i = p.sub('',i)
    print(i)
    with open("clean_html.txt","a") as f:
        f.write(i+"\n")
