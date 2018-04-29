from flask import Flask
from flask_sqlalchemy  import SQLAlchemy
import os , psycopg2
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
app.config.from_object(__name__)# Flask-Login login manager
csrf = CSRFProtect(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
login_manager.session_protection = "strong"

UPLOAD_FOLDER = './app/static/uploads'
DATABASE_URL = os.environ['DATABASE_URL'] #'postgresql://user[:password]@localhost/photogram'

app.config['SECRET_KEY'] = 's\x97\xc2y\x9f\xb2l6\x17\x0f\xf4\x00R\xe6\x16\xff\xccSl\xda\x93\xde]%'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] 	= True
app.config['TOKEN_SECRET'] = '\xff\xd4\xd5\xef<\xa4F\xcc\xff\xd7H\xa7?n\x1d\xbbtP\xdfj\xff\x8d\x90\xd7'


conn = psycopg2.connect(DATABASE_URL)
db = SQLAlchemy(app)

from app import views
