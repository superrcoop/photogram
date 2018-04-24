"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""
import os
from app import app, login_manager
from flask import render_template, request, session, jsonify
from flask_login import login_user, logout_user, current_user, login_required
from forms import LoginForm, RegistrationForm, PostsForm
from models import Users, Posts, Follows, Likes
from werkzeug.utils import secure_filename
###
# Routing for your application.
###


@app.route('/')
def index():
    """Render website's initial page and let VueJS take over."""
    return render_template('index.html')

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

@app.route('/api/users/register', methods = ['POST'])
def userRegister():
    form = RegistrationForm()
    if request.method == 'POST' and form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        firstname = form.firstname.data
        lastname = form.lastname.data
        email = form.email.data
        location = form.location.data
        biography = form.biography.data
        photo = form.photo.data

        # UserProfile.query.filter_by(username=username, password=password).first():

        filename= secure_filename(photo.filename)
        photo.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))

        user = Users(user_name=username, password=password, first_name=firstname, last_name=lastname, email=email, location=location, biography=biography, profile_photo=filename)

        db.session.add(user)
        db.session.commit()
        #return redirect(url_for('register')) I think vuejs should handle the redirect

@app.route('/api/auth/login', methods = ['POST'])
def userLogin():
    #if current_user.is_authenticated:
    #    return jsonify({'message': 'User already logged in'})
    form = LoginForm()
    if request.method == 'POST' #and form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user=Users.query.filter_by(username=username,password=password).first()
        if user is not None:
            login_user(user)
            return jsonify({'message': 'You have successfully logged in'})
        else:
            return jsonify({'message': 'Username or password is incorrect'})
    return jsonify({'error':form_errors(form)})

@app.route('/api/auth/logout', methods = ['GET'])
@login_required
def userLogout():
    logout_user()
    return jsonify({'message': 'You have successfully logged out'})
    
    

@app.route('/api/users/<user_id>/posts', methods = ['POST'])
def addPost():
    form = PostsForm()
    if request.method =='POST' and form.validate_on_submit():
        photo = form.photo.data
        caption = form.caption.data 

@app.route('/api/users/<user_id>/posts', methods = ['GET'])
def userPosts():
    return 1

@app.route('/api/users/<user_id>/follow', methods = ['POST'])
def userFollow():
    return 1


@app.route('/api/posts', methods = ['GET'])
def allPosts():
    return 1


@app.route('/api/posts/<post_id>/like', methods = ['POST'])
def userLike():
    return 1


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
