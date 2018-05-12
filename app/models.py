from . import db


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    username = db.Column(db.String(80), unique=True)
    email= db.Column(db.String(255),unique=True)
    password= db.Column(db.String(255))
    location=db.Column(db.String(100))
    biography=db.Column(db.String(255))
    profile_photo=(db.Column(db.String(255)))
    joined_on=(db.Column(db.DateTime))
    
    def __init__(self,first_name,last_name,username,email,password,location,biography,profile_photo,joined_on):
        self.username=username
        self.first_name=first_name
        self.last_name=last_name
        self.password=password
        self.location=location
        self.biography=biography
        self.email=email
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
            return unicode(self.id)  # python 2 supportu
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<User %r>' % (self.username)
        
class Likes(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id=db.Column(db.Integer,db.ForeignKey('posts.id'))
    
    def __init__(self,user_id,post_id):
        self.user_id=user_id
        self.post_id=post_id
    
class Posts(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('users.id'))
    photo=db.Column(db.String(255))
    caption=db.Column(db.String(244))
    created_on=db.Column(db.DateTime)
    
    def __init__(self,user_id,photo,caption,created_on):
        self.user_id=user_id
        self.photo=photo
        self.caption=caption
        self.created_on=created_on

class Follows(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('users.id'))
    follower_id=db.Column(db.Integer,db.ForeignKey('users.id'))
    
    def __init__(self,user_id,follower_id):
        self.user_id=user_id
        self.follower_id=follower_id
    