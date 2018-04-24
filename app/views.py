"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
"""

from app import app, db, login_manager
from flask import render_template, request, session
from controllers import form_errors
from flask_login import login_user, logout_user, current_user, login_required
from forms import LoginForm, RegistrationForm, PostsForm
from models import Users, Posts, Follows, Likes
from werkzeug.utils import secure_filename
from werkzeug.datastructures import CombinedMultiDict


@app.route('/')
def index():
    """Render website's initial page and let VueJS take over."""
    return render_template('index.html')


"""
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

        UserProfile.query.filter_by(username=username, password=password).first():

        filename= secure_filename(photo.filename)
        photo.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))

        user = UserProfile(user_name=username, password=password, first_name=firstname, last_name=lastname, email=email, location=location, biography=biography, profile_photo=filename)

        db.session.add(user)
        db.session.commit()
        return redirect(url_for('register'))

@app.route('/api/auth/login', methods = ['POST'])
def userLogin():
    form = LoginForm()
    if request.method == 'POST' and form.validate_on_submit():
        username = form.username.data
        password = form.password.data

@app.route('/api/auth/logout', methods = ['GET'])
def userLogout():

@app.route('/api/users/<user_id>/posts', methods = ['POST'])
def addPost():
    form = PostsForm()
    if request.method =='POST' and form.validate_on_submit():
        photo = form.photo.data
        caption = form.caption.data 

@app.route('/api/users/<user_id>/posts', methods = ['GET'])
def userPosts():

@app.route('/api/users/>user_id>/follow', methods = ['POST'])
def userFollow():


@app.route('/api/posts', methods = ['GET'])
def allPosts():


@app.route('/api/posts/<post_id>/like', methods = ['POST'])
def userLike():

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
def page_not_found(error):
    """Custom 500 page."""
    return render_template('500.html'), 500



if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")
