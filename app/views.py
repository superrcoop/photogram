"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
"""

from app import app, db, login_manager 
from flask import render_template, request, session, redirect, url_for ,jsonify,g,_request_ctx_stack,flash
from controllers import form_errors , allowed_file,get_uploaded_image
from flask_login import login_user, logout_user, current_user, login_required
from forms import LoginForm, RegistrationForm, PostsForm
from models import Users, Posts, Follows, Likes
from werkzeug.utils import secure_filename
from werkzeug.datastructures import CombinedMultiDict
import jwt ,os ,json
from functools import wraps
import base64


@login_manager.user_loader
def load_user(id):
   return Users.query.get(int(id))

# Create a JWT @requires_auth decorator
# This decorator can be used to denote that a specific route should check
# for a valid JWT token before displaying the contents of that route.
def requires_auth(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    auth = request.headers.get('Authorization', None)
    if not auth:
        return render_template('401.html',description='authorization_header_missing'), 401

    parts = auth.split()

    if parts[0].lower() != 'bearer':
        return render_template('401.html',description='invalid_header:Authorization header must start with Bearer'), 401
    elif len(parts) == 1:
        return render_template('401.html',description='invalid_header:Token not found'), 401
    elif len(parts) > 2:
        return render_template('401.html',description='invalid_header:Authorization header must be Bearer + \s + token'), 401
        
    token = parts[1]
    try:
        payload = jwt.decode(token, app.config['TOKEN_SECRET'])

    except jwt.ExpiredSignature:
        return render_template('401.html',description='token_expired'), 401
    except jwt.DecodeError:
        return render_template('401.html',description='token_invalid_signature'), 401
        
    g.current_user = user = payload
    return f(*args, **kwargs)

  return decorated

@app.route('/')
def index():
    """Render website's initial page and let VueJS take over."""
    return render_template('index.html')

@app.route('/dashboard')
@login_required
def dashboard():
    """Render website's initial page and let VueJS take over."""
    return render_template('feed.html')

@app.route('/api/users/register', methods = ['POST'])
def register():
    error=None
    form = RegistrationForm()
    if request.method == 'POST' and form.validate_on_submit():
        username = form.username.data
        plain_password = form.plain_password.data
        conf_password = form.conf_password.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        email = form.email.data
        location = form.location.data
        if not Users.query.filter_by(email = email).first() and not Users.query.filter_by(user_name = username).first():
            user = Users(user_name = username, first_name = first_name, last_name = last_name, email = email, plain_password = plain_password,location=location)
            db.session.add(user)
            db.session.commit()
            return jsonify({'messages':'You have successfully registered'})
        else:
            error = "Email and/or username already exists"
            return jsonify({'errors': error})
    else:
        return jsonify({'errors':form_errors(form)})

@app.route('/api/auth/login', methods = ['POST'])
def login():
    error=None
    form = LoginForm()
    if request.method == 'POST' and form.validate_on_submit():
        username = form.username.data
        plain_password = form.plain_password.data
        user = Users.query.filter_by(user_name = username).first()
        if user and user.is_correct_password(plain_password): 
            login_user(user)
            payload = {'id': current_user.id, 'username': current_user.user_name}
            token = jwt.encode(payload, app.config['TOKEN_SECRET'], algorithm='HS256') 
            post=Posts.query.filter_by(user_id=user.id).all();
            following=Follows.query.filter_by(user_id=user.id).all();
            followers=Follows.query.filter_by(follower_id=user.id).all();
            userdata = [len(post),len(following),len(followers),current_user.user_name,current_user.first_name,current_user.last_name,current_user.location,current_user.joined_on,token,current_user.id]
            return jsonify({'user_credentials': userdata, 'messages':"Token Generated"})
        else:
            error = "Invalid email and/or password"
            return jsonify({'errors': error})
    else:
        return jsonify({'errors':form_errors(form)})

@app.route('/api/auth/logout', methods = ['GET'])
@login_required
@requires_auth
def userLogout():
    g.current_user = None
    logout_user()
    return jsonify({'messages':'You have successfully logged out'})    

@app.route('/api/posts/new', methods = ['POST'])
@login_required
@requires_auth
def newPost():
    error=None
    form = PostsForm(CombinedMultiDict((request.files, request.form)))
    if request.method =='POST' and form.validate_on_submit():
        if form.photo.data:
            photo=form.photo.data
            caption = form.caption.data
            if photo.filename == '':
                error='No selected file'
            if photo and allowed_file(photo.filename):
                filename = secure_filename(photo.filename)
                newpost=Posts(user_id=current_user.id,image_URI=photo,caption=caption)
                photo.save(os.path.join(newpost.image_URI, filename))
                db.session.add(newpost)
                db.session.commit()
                return jsonify({'messages':'Photo Post successfully'})
            else:
                error='File not allowed'
                return jsonify({'errors': error})
        else:
            caption = form.caption.data
            newpost=Posts(user_id=current_user.id,caption=caption)
            db.session.add(newpost)
            db.session.commit()
            return jsonify({'messages':'Post successfully'})
    else:
        return jsonify({'errors':form_errors(form)})


@app.route('/api/posts/like', methods =['POST'])
@login_required
@requires_auth
def like_post():
    if request.method == 'POST':
        """
        like=Likes(post_id,current_user.id)
        db.session.add(like)
        db.session.commit()   
        """    
        return jsonify(response= [{'messages':'Post successully liked'}])

@app.route('/api/posts/unlike', methods =['POST'])
@login_required
@requires_auth
def unlike_post():
    if request.method == 'POST':
        """
        like=Likes.query.filter_by(post_id=post_id).first();
        db.session.delete(like)
        db.session.commit()     
        """  
        return jsonify(response= [{'message':'Post unliked'}])


@app.route('/api/posts/all', methods = ['GET'])
@login_required
def get_all_posts():
    error=None
    if request.method =='GET':
        posts=Posts.query.order_by(Posts.created_on.desc()).all()
        listposts=[]
        liked=False
        for i in range (0,len(posts)):
            count=Likes.query.filter_by(post_id=posts[i].id).all()
            user=Users.query.filter_by(id=posts[i].user_id).first();
            if Likes.query.filter_by(post_id=posts[i].id, user_id=current_user.id):
                liked=True

            post_data={
            'id':posts[i].id,
            'photo':posts[i].image_URI,#get_uploaded_image(posts[i].image_URI),
            'caption':posts[i].caption,
            'date_post':posts[i].created_on,
            'likes':len(count),
            'liked':liked,
            'username':user.user_name,
            'userphoto':user.profile_photo
            }
            listposts.append(post_data)
        return jsonify({'posts': listposts})
    else:
        return jsonify({'errors':error})

@app.route('/api/posts/delete', methods = ['GET','POST'])
@login_required
def delete_post():
    error=None
    if request.method =='POST':
        """
        data=request.data
        post=Posts.query.filter_by(id=data.id).first();
        if post:
            db.session.delete(post)
            db.session.commit()
            return jsonify({'messages':'Post sucessfully deleted'})
        """
        return jsonify({'messages':'Post received'})
    else:
        return jsonify({'errors':error})

""" A P I

@app.route('/api/users/<username>', methods = ['GET'])
@login_required
@requires_auth
def get_profile(username):
    error=None
    if request.method =='GET':
        user=Users.query.filter_by(username=username).first()
        post=Posts.query.filter_by(user_id=user.id).all();
        following=Follows.query.filter_by(user_id=user.id).all();
        followers=Follows.query.filter_by(follower_id=user.id).all();
        if Follows.query.filter_by(user=)
        user_info={
            'id':user.id,
            'username':user.username,
            'bio':user.bio,
            'posts':len(posts),
            'followers':len(followers),
            'following':len(following),
            'photo':user.file_URI,
            'follow':follow
        }
        listposts=[]
        for i in range (0,len(posts)):
            count=Likes.query.filter_by(post_id=posts[i].post_id).all()
            post_data={
            'id':posts[i].id,
            'photo':post[i].Post_URI,
            'caption':posts[i].caption,
            'created_on':posts[i].created_on,
            'likes':len(count),
            'username':user.username,
            'userphoto':user.profile_photo
            }
            listposts.append(post_data)
        return jsonify({'profile_info': user_info,'posts':listposts})
    else:
        return jsonify({'errors':error})

@app.route('/api/users/<username>/bio/update', methods = ['POST'])
@login_required
@requires_auth
def update_profile_bio(username):
    error=None
    if request.method =='POST':
        return jsonify({'errors': error})
    else:
        return jsonify({'errors':error})

@app.route('/api/users/<int:username>/profile_photo/update', methods = ['POST'])
@login_required
@requires_auth
def update_profile_photo(username):
    error=None
    if request.method =='POST':
        return jsonify({'errors': error})
    else:
        return jsonify({'errors':error})

@app.route('/api/posts/<int:post_id>', methods = ['GET'])
@login_required
def get_post(post_id):
    error=None
    if request.method=='GET':
        post=Posts.query.filter_by(id=post_id).first();
        user=Users.query.filter_by(id=post.user_id).first();
        count=Likes.query.filter_by(post_id=post_id).all()
        return jsonify({
        'post_id':posts.id,
        'photo':posts.post_URI,
        'caption':posts.caption,
        'created_on':posts.created_on,
        'likes':len(count),
        'username':user.username,
        'userphoto':user.profile_photo
        })
    else:
        return jsonify({'errors':error})


@app.route('/api/users/<username>/follow', methods = ['POST','GET'])
@login_required
@requires_auth
def follow_user(username):
    if request.method == 'POST':
        user=Users.query.filter_by(username=username).first()
        if user:
            follow=Follows(user.id,current_user.id)
            db.session.add(follow)
            db.session.commit()
            return jsonify(response = [{'messages':'You are now following '+ username}])
        else:
            return jsonify(response = [{'errors':'User not found'}])


@app.route('/api/users/<username>/unfollow', methods = ['POST'])
@login_required
@requires_auth
def unfollow_user(username):
    if request.method == 'POST':
        user=Users.query.filter_by(username=username).first()
        follow=Follows.query.filter_by(user_id=user.id)
        #unfollow da bitch
        return jsonify({'messages':'Unfollowing '+user.username})


"""
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


@app.errorhandler(401)
def unauthorized(error):
    """Custom 401 page."""
    return render_template('401.html'), 401

@app.errorhandler(500)
def internal_server_error(error):
    """Custom 500 page."""
    return render_template('500.html'), 500


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")
