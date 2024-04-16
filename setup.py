import os
os.system("python -m ensurepip --upgrade")
os.system("python get-pip.py")
os.system("python -m pip install --upgrade pip")
os.system("pip install -r requirements.txt")