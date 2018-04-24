import uuid , datetime , random , os ,errno
from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method
from bcrypt import hashpw, gensalt
from . import db ,UPLOAD_FOLDER


def get_new_id():
	new_id = long(time())
	return new_id

def get_date():
    return datetime.datetime.now().today()

def generate_file_URI():
    URI=UPLOAD_FOLDER+'/'+str(uuid.uuid4().get_hex()[0:12])+'/'
    if not os.path.exists(URI):
        try:
            os.makedirs(URI)
        except OSError as e:
            if e.errno != errno.EEXIST:
                raise
    return URI


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(80),unique=True)
    _password = db.Column(db.String(255),nullable=False)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    email= db.Column(db.String(80),unique=True,nullable=False)
    location=db.Column(db.String(80))
    biography = db.Column(db.String(255)) 
    profile_photo=db.Column(db.String(80),nullable=False)
    joined_on = db.Column(db.Date,nullable=False)
    posts=db.relationship("Posts",backref='users')
    userposts=db.relationship("Likes",backref='users')
    follows=db.relationship("Follows",backref='users')
    follower=db.relationship("Follows",backref='users')

    def __init__(self,user_name,plain_password,first_name,last_name,email,location,biography,profile_photo):
        self.id=get_new_id()
        self.user_name = user_name
        self.password = plain_password
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.location=location
        self.biography=biography
        self.profile_photo=generate_file_URI()+profile_photo
        self.joined_on=get_date()

	@hybrid_property
	def password(self):
		return self._password

	@password.setter
	def password(self,plain_password):
		self._password = hashpw(plain_password,gensalt())
 
	@hybrid_method
	def is_correct_password(self, plain_password):
		return hashpw(plain_password,self.password)==self.password

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
		return '<User %r>' % (self.username)
        
class Posts(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)
    photo = db.Column(db.String(80),nullable=False)
    caption = db.Column(db.String(120))
    created_on =db.Column(db.Date,nullable=False)
    likes=db.relationship("Likes",backref='posts')

    def __init__(self,user_id,photo,caption):
        self.user_id=user_id
        self.photo= photo #get_file_URI()
        self.caption=caption
        self.created_on=get_date()

    def __repr__(self):
		return '<Post id: %r>' % (self.id)


class Likes(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)
    post_id = db.Column(db.Integer,db.ForeignKey('posts.id'),nullable=False)

    def __init__(self,user_id,post_id):
        self.user_id=user_id
        self.post_id=post_id


class Follows(db.Model):
    __tablename__ = 'follows'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)
    follower_id = db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)

    def __init__(self,user_id,follower_id):
        self.user_id=user_id
        self.follower_id=follower_id

    