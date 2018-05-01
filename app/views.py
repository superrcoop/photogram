"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
"""

from app import app, db, login_manager 
from flask import render_template, request, session, redirect, url_for ,jsonify,g,_request_ctx_stack,flash
from controllers import form_errors , allowed_file
from flask_login import login_user, logout_user, current_user, login_required
from forms import LoginForm, RegistrationForm, PostsForm
from models import Users, Posts, Follows, Likes
from werkzeug.utils import secure_filename
from werkzeug.datastructures import CombinedMultiDict
import jwt
from functools import wraps
import base64


# Create a JWT @requires_auth decorator
# This decorator can be used to denote that a specific route should check
# for a valid JWT token before displaying the contents of that route.
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

@login_manager.user_loader
def load_user(id):
   return Users.query.get(int(id))

@app.route('/')
def index():
    """Render website's initial page and let VueJS take over."""
    return render_template('index.html')

@app.route('/dashboard')
@login_required
def dashboard():
    #user = g.current_user
    """
    payload = {'id': current_user.id, 'username': current_user.user_name}
    token = jwt.encode(payload, app.config['TOKEN_SECRET'], algorithm='HS256') 
    userdata = [current_user.current_user_name,current_user.first_name,current_user.last_name,token]
    message="Token Generated"
    """

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
            return jsonify(data={"user": username,"password":plain_password},message="You have successfully registered")
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
            userdata = [current_user.user_name,current_user.first_name,current_user.last_name,current_user.location,current_user.joined_on,token,current_user.id]
            return jsonify(data={'user_credentials': userdata}, message="Token Generated")
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
    return jsonify(message= 'You have successfully logged out')    

@app.route('/api/<user_id>/newpost', methods = ['POST'])
@login_required
@requires_auth
def newPost(user_id):
    error=None
    form = PostsForm()
    if request.method =='POST' and form.validate_on_submit():
        photo = form.photo.data
        caption = form.caption.data
        if photo.filename == '':
            error='No selected file'
        if photo and allowed_file(photo.filename):
            filename = secure_filename(photo.filename)
            newpost=Posts(user_id=user_id,photo=photo,caption=caption)
            file.save(os.path.join(newpost.post_URI, filename))
            db.session.add(newpost)
            db.session.commit()
            return jsonify(message="Post successfully")
        else:
            error='File not allowed'
            return jsonify({'errors': error})
    else:
        return jsonify({'errors':form_errors(form)})

"""

@app.route('/api/users/<user_id>/posts', methods = ['GET'])
def userPosts(user_id):

@app.route('/api/posts', methods = ['GET'])
@login_required
def allPosts():
    posts=Posts.query.order_by(Posts.created_on).all()
    return jsonify({'posts': add array function})



@app.route('/api/users/<int:user_id>/follow', methods = ['POST'])
@login_required
@requires_auth
def userFollow(user_id):
    if request.method == 'POST':
        userfollow=Follows(user_id,current_user.id)
        db.session.add(userfollow)
        db.session.commit()
        user=Users.query.filter_by(id=user_id).first()
        return jsonify(response = [{'message':'Now following'+user.username}])


@app.route('/api/posts/<int:post_id>/like', methods =['POST'])
@login_required
@requires_auth
def userLike(post_id):
    if request.method == 'POST':
        userlike=Likes(post_id,current_user.id)
        db.session.add(userlike)
        db.session.commit()

        # add count function
        def countlikes(post_id):
            count=Likes.query.filter_by(post_id=post_id).all()
            return len(count)
        return jsonify(response= [{'message':'Liked','Likes':count}])

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

@app.errorhandler(500)
def internal_server_error(error):
    """Custom 500 page."""
    return render_template('500.html'), 500



if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")
