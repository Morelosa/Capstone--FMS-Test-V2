from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
  return uuid4().hex



class User(db.Model):
  __tablename__ = "users" #for table name
  id = db.Column( db.String(11), primary_key=True, unique=True, default = get_uuid) #assigns an id as a primary Key
  name = db.Column(db.String(100))
  email = db.Column( db.String(300), unique = True ) #each email given has to be unique
  password = db.Column(db.String(30)) #limit bycrypt password hash 30
