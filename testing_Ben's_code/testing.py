import os
print( "\n\n\t\t\t*** INSTALLING PIP WHEELS ***\n")
names = [name for name in os.listdir("/srv/pips/repo/pip/")if name.endswith(".whl")]

for i in names:
    os.system("pip install /srv/pips/repo/pip/"+i)
