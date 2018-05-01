import uuid , datetime , random , os ,errno
from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method
from bcrypt import hashpw, gensalt ,checkpw
from . import db ,UPLOAD_FOLDER
from flask_login import UserMixin

def get_newlike_id():
    return int(str(uuid.uuid4().int)[:8])

def get_newpost_id():
    return str(uuid.uuid4())[:6]

def get_new_id():
    return int(str(uuid.uuid4().int)[:8])


def get_date():
    return datetime.datetime.now().today()

def generate_file_URI(id=None):
    if id:      
        URI=UPLOAD_FOLDER+'/posts'+id
    URI=UPLOAD_FOLDER+'/'+str(uuid.uuid4().get_hex()[0:12])+'/'
    if not os.path.exists(URI):
        try:
            os.makedirs(URI)
        except OSError as e:
            if e.errno != errno.EEXIST:
                raise
    return URI

class Users(db.Model,UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(80),unique=True)
    password = db.Column(db.String(255),nullable=False)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    email= db.Column(db.String(80),unique=True,nullable=False)
    location=db.Column(db.String(80))
    biography = db.Column(db.String(300)) 
    profile_photo=db.Column(db.String(80))
    joined_on = db.Column(db.Date,nullable=False)
    posts=db.relationship("Posts",backref='users')
    userposts=db.relationship("Likes",backref='users')
    follows=db.relationship("Follows",backref='users')

    def __init__(self,user_name,plain_password,first_name,last_name,email,location):
        self.id=get_new_id()
        self.user_name = user_name
        self.password = hashpw(plain_password.encode('utf-8'),gensalt())
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.location=location
        self.file_URI=generate_file_URI()
        self.joined_on=get_date()
    
    def is_correct_password(self, plain_password):
		return checkpw(plain_password.encode('utf-8'),self.password.encode('utf-8'))

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
		return '<Users %r>' % (self.username)
        
class Posts(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.String(10), primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)
    post_URI = db.Column(db.String(80),nullable=False)
    caption = db.Column(db.String(120))
    created_on =db.Column(db.Date,nullable=False)
    likes=db.relationship("Likes",backref='posts')

    def __init__(self,user_id,photo,caption):
        self.id=get_newpost_id()
        self.user_id=user_id
        self.post_URI= generate_file_URI(user_id)
        self.caption=caption
        self.created_on=get_date()

    def __repr__(self):
		return '<Posts %r>' % (self.id)


class Likes(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)
    post_id = db.Column(db.String(10),db.ForeignKey('posts.id'),nullable=False)

    def __init__(self,user_id,post_id):
        id=get_newlike_id()
        self.user_id=user_id
        self.post_id=post_id


class Follows(db.Model):
    __tablename__ = 'follows'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,nullable=False)
    follower_id = db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)

    def __init__(self,user_id,follower_id):
        id=get_new_id()
        self.user_id=user_id
        self.follower_id=follower_id

    