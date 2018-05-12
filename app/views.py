"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

import os
from app import app, db,uploadfolder,token_key 
from flask import render_template, request, session, redirect, url_for ,jsonify,g,flash
from forms import LoginForm, RegistrationForm, PostsForm
from models import Users, Posts, Follows, Likes
from werkzeug.utils import secure_filename
import jwt
import datetime
from functools import wraps



###
# Routing for your application.
###



def requires_auth(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    auth = request.headers.get('Authorization', None)
    if not auth:
      return jsonify({'code': 'authorization_header_missing', 'description': 'Authorization header is expected'}), 401

    parts = auth.split()

    if parts[0].lower() != 'bearer':
      return jsonify({'code': 'invalid_header', 'description': 'Authorization header must start with Bearer'}), 401
    elif len(parts) == 1:
      return jsonify({'code': 'invalid_header', 'description': 'Token not found'}), 401
    elif len(parts) > 2:
      return jsonify({'code': 'invalid_header', 'description': 'Authorization header must be Bearer + \s + token'}), 401

    token = parts[1]
    try:
         payload = jwt.decode(token, app.config['TOKEN_SECRET'])

    except jwt.ExpiredSignature:
        return jsonify({'code': 'token_expired', 'description': 'token is expired'}), 401
    except jwt.DecodeError:
        return jsonify({'code': 'token_invalid_signature', 'description': 'Token signature is invalid'}), 401

    g.current_user = user = payload
    return f(*args, **kwargs)

  return decorated

@app.route('/')
def index():
    """Render website's initial page and let VueJS take over."""
    return render_template('index.html')

@app.route('/api/users/register', methods = ['POST'])
def register():
    error=None
    form = RegistrationForm()
    if request.method == 'POST' and form.validate_on_submit():
        if form.confirm_password.data==form.password.data:
            username = form.username.data
            plain_password = form.password.data
            first_name = form.firstname.data
            last_name = form.lastname.data
            email = form.email.data
            biography=form.biography.data
            location = form.location.data
            if not Users.query.filter_by(email = email).first() and not Users.query.filter_by(username = username).first():
                userimage=form.profile_photo.data
                filename=secure_filename(userimage.filename)
                created=datetime.datetime.now()
                user = Users(first_name = first_name, last_name = last_name,username = username, email = email, password = plain_password,location=location,biography=biography,profile_photo=filename,joined_on=created)
                db.session.add(user)
                db.session.commit()
                userimage.save(os.path.join(uploadfolder,filename))
                return jsonify(data={"message":"You have successfully registered. Please login"})
            else:
                error = "Email and/or username already exists"
                return jsonify({'errors': error})
        else:
            return jsonify({'errors':'Passwords do not match'})
    else:
        return jsonify({'errors':form_errors(form)})

@app.route('/api/auth/login', methods = ['POST'])
def login():
    error=None
    form = LoginForm()
    if request.method == 'POST' and form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = Users.query.filter_by(username = username, password=password).first()
        if user: 
            payload = {'user_id' : user.id}
            token = jwt.encode(payload, token_key)
            session['userid'] = user.id;
            return jsonify(response=[{'token': token, 'userid': user.id}])
        else:
            error = "Invalid email and/or password"
            return jsonify({'errors': error})
    return jsonify({'errors':form_errors(form)})

@app.route('/api/auth/logout', methods = ['GET'])
@requires_auth
def userLogout():
    g.current_user = None
    if session['userid'] is not None:
        session.pop('userid')
    return jsonify(response= 'You have successfully logged out')    


@app.route('/api/<int:user_id>/newpost', methods = ['POST','GET'])
@requires_auth
def posts(user_id):
    error=None
    form = PostsForm()
    if request.method =='POST':
        if form.validate_on_submit():
            photo = form.photo.data
            caption = form.caption.data
            filename = secure_filename(photo.filename)
            added_on=datetime.datetime.now()
            newpost=Posts(user_id=user_id,photo=filename,caption=caption,created_on=added_on)
            photo.save(os.path.join(uploadfolder, filename))
            db.session.add(newpost)
            db.session.commit()
            return jsonify(response="Your post was added successfully")
        else:
            return jsonify({'errors':form_errors(form)})
    if request.method=='GET':
        def following(user_id):
            isfollower=Follows.query.filter_by(follower_id=session['userid'],user_id=user_id).first()
            if isfollower:
                return True
            else:
                return False
        user=Users.query.filter_by(id=user_id).first()
        if not user:
            return jsonify(error={'error':'User does not exist'});
        else:
            userinfo={'userid':user.id,'username':user.username,'first_name':user.first_name,'last_name':user.last_name,'location':user.location,'photo':uploadfolder+user.profile_photo,'biography':user.biography,'membersince':user.joined_on.strftime("%B %Y")}
            posts=[{'photo':uploadfolder+x.photo,'caption':x.caption} for x in Posts.query.filter_by(user_id=user_id).all()]
            follows=Follows.query.filter_by(user_id=user_id).all()
            return jsonify(response={'userinfo':userinfo,'posts':posts,'numposts':len(posts),'numfollowers':len(follows),'following':following(user_id)})

@app.route("/api/users/<int:user_id>/tofollow",methods=["GET"])
@requires_auth
def tofollowuser(user_id):
    if request.method=='GET':
        follow=Follows.query.filter_by(follower_id=session['userid'],user_id=user_id).first()
        if follow:
            return jsonify(response=True)
        else:
            return jsonify(response=False)
            
        
@app.route('/api/users/<int:user_id>/follow', methods = ['POST'])
@requires_auth
def userFollow(user_id):
    if request.method == 'POST':
        userfollow=Follows(user_id,session['userid'])
        db.session.add(userfollow)
        db.session.commit()
        user=Users.query.filter_by(id=user_id).first()
        return jsonify(response = [{'message':'You are following '+user.username}])

@app.route("/api/users/<int:user_id>/unfollow",methods=["POST"])
@requires_auth
def unfollow(user_id):
    if request.method=="POST":
        userfollow=Follows.query.filter_by(follower_id=session['userid'],user_id=user_id).first()
        Follows.query.filter_by(id=userfollow.id).delete()
        db.session.commit()
        count=len(Follows.query.filter_by(user_id=user_id).all())
        user=Users.query.filter_by(id=user_id).first()
        return jsonify(response = [{'message':'You are no longer following '+user.username}])    


@app.route("/api/posts/<int:post_id>/tolike",methods=["GET"])
@requires_auth
def tolikepost(post_id):
    if request.method=='GET':
        postlike=Likes.query.filter_by(user_id=session['userid'],post_id=post_id).first()
        if postlike:
            return jsonify(response=True)
        else:
            return jsonify(response=False)

@app.route("/api/posts/<int:post_id>/like",methods=["POST"])
@requires_auth
def likepost(post_id):
    if request.method=="POST":
        postlike=Likes(session['userid'],post_id)
        db.session.add(postlike)
        db.session.commit()
        count=len(Likes.query.filter_by(post_id=post_id).all())
        return jsonify(response=[{'message':'You Liked a post','numposts':count}])    
        
@app.route("/api/posts/<int:post_id>/unlike",methods=["POST"])
@requires_auth
def unlikepost(post_id):
    if request.method=="POST":
        like=Likes.query.filter_by(user_id=session['userid'],post_id=post_id).first()
        Likes.query.filter_by(id=like.id).delete()
        db.session.commit()
        count=len(Likes.query.filter_by(post_id=post_id).all())
        return jsonify(response=[{'message':'You Unliked a post','numposts':count}])    
    


@app.route('/api/posts', methods = ['GET'])
@requires_auth
def allPosts():
    def liketest(post_id):
        like=Likes.query.filter_by(post_id=post_id,user_id=session['userid']).first()
        if like is None:
            return False
        else:
            return True

    def getusername(user_id):
        user=Users.query.filter_by(id=user_id).first()
        return user.username
    
    def getprofilephoto(user_id):
        user=Users.query.filter_by(id=user_id).first()
        return user.profile_photo
    
    error=None
    if request.method =='GET':
        posts=[{'post_id':x.id,
                'photo':uploadfolder+x.photo,
                'caption':x.caption,
                'created_on':x.created_on.strftime("%d %b %Y"),
                'likes':len(Likes.query.filter_by(post_id=x.id).all()),
                'username':getusername(x.user_id),
                'userphoto':getprofilephoto(x.user_id),
                'userpostlike':liketest(x.id)} for x in
        Posts.query.order_by(Posts.created_on).all()]
        return jsonify(response={'posts': posts})



# Here we define a function to collect form errors from Flask-WTF
# which we can later use
def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                    getattr(form, field).label.text,
                    error
                )
            error_messages.append(message)

    return error_messages


###
# The functions below should be applicable to all Flask apps.
###


@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")
