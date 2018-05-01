from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField
from wtforms.validators import Required, Email,Length, EqualTo, DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

class LoginForm(FlaskForm):

	username = StringField('Username', validators = [DataRequired('Please provide an email address')])
	plain_password = PasswordField('Password', validators = [DataRequired()])

class RegistrationForm(FlaskForm):
	first_name = StringField('First Name', validators=[Length(min=1,max=40,message=('First Name does not satisfy condition ( 1 < name.length <= 40 )')),DataRequired('Please provide a First Name')])
	last_name = StringField('Last Name', validators=[Length(min=1,max=40,message=('Last Name does not satisfy condition ( 1 < name.length <= 40 )')),DataRequired('Please provide a Last Name')])
	username = StringField('Username', validators=[Length(min=1,max=40,message=('Username does not satisfy condition ( 1 < name.length <= 40 )')),DataRequired('Please provide a username')])
	email = StringField('Email Address', validators=[Email(message='Email not Valid'),DataRequired('Please provide an email address')])
	plain_password = PasswordField('Enter Password',validators=[DataRequired('Enter a Password'),EqualTo('conf_password',message=('Passwords must Match'))])
	conf_password=PasswordField('Repeat Password',validators=[DataRequired('Re-enter password')])
	location = StringField('Location', validators = [DataRequired('Whats your location?')])

class PostsForm(FlaskForm):
	photo = FileField('files[]', validators=[FileRequired(),FileAllowed(ALLOWED_EXTENSIONS, 'File not allowed')])
	caption = TextAreaField('Caption', validators = [DataRequired(),Length(max=100)])

class uploadphoto(FlaskForm):
	photo = FileField('files[]', validators=[FileRequired(),FileAllowed(ALLOWED_EXTENSIONS, 'File not allowed')])

class updateBio(FlaskForm):
	biography = TextAreaField('Biography', validators=[DataRequired('Enter something about yourself'), Length(max=200)])

		