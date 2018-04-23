from time import time
from datetime import date
from . import db


def get_new_id():
	new_id = long(time())
	return new_id
	

class UserProfile(db.Model):
    __tablename__ = 'UserProfile'
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(80))
    password = db.Column(db.String(80))
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    email= db.Column(db.String(80))
    location=db.Column(db.String(80))
    biography = db.Column(db.String(250)) 
    profile_photo=db.Column(db.String(80))
    joined_on = db.Column(db.String(30))

    def __init__(self,user_name,password,first_name,last_name,email,location,biography,profile_photo,joined_on):
        self.id=get_new_id()
        self.user_name = user_name
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.location=location
        self.biography=biography
        self.profile_photo=profile_photo
        self.joined_on=joined_on

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
        
class UserPosts(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    photo = db.Column(db.String(80))
    caption = db.Column(db.String(80))
    created_on = db.Column(db.String(80))


class UserLikes(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    post_id = db.Column(db.Integer)


class UserFollows(db.Model):
    __tablename__ = 'follows'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    follower_id = db.Column(db.Integer)

    