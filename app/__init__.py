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

app.config['SECRET_KEY'] = 'pH0t 0Gr@l^l'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] 	= True
app.config['TOKEN_SECRET'] = 't0k3ns3cr3+'


conn = psycopg2.connect(DATABASE_URL)
db = SQLAlchemy(app)

from app import views
