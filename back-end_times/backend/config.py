from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import json
from os import path, remove
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
db_path = path.dirname(path.abspath(__file__)) 
db_file = path.join(db_path, 'teams.db')
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///" + db_file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)