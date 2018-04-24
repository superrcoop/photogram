from flask import Flask
from flask_sqlalchemy  import SQLAlchemy
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect


app = Flask(__name__)
app.config.from_object(__name__)# Flask-Login login manager

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
login_manager.session_protection = "strong"

UPLOAD_FOLDER = './app/static/uploads'


app.config['SECRET_KEY'] = 'pH0t0Gr@l^l'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://project2:password@localhost/photogram"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] 	= True
csrf = CSRFProtect(app)


db = SQLAlchemy(app)

from app import views
