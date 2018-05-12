from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField
from wtforms.validators import Required, InputRequired, Email,Length
from flask_wtf.file import FileField, FileAllowed, FileRequired

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

class LoginForm(FlaskForm):

	username = StringField('Username', validators = [InputRequired()])
	password = PasswordField('Password', validators = [InputRequired()])

class RegistrationForm(FlaskForm):
	username = StringField('Username', validators = [InputRequired()])
	password = PasswordField('Password', validators = [InputRequired()])
	confirm_password = PasswordField('Confirm Password', validators = [InputRequired()])
	firstname = StringField('Firstname', validators = [InputRequired()])
	lastname = StringField('Lastname', validators = [InputRequired()])
	email =  StringField('Email', validators=[Email()])
	location = StringField('Location', validators = [InputRequired()])
	biography = TextAreaField('Biography', validators=[InputRequired(), Length(max=200)])
	profile_photo = FileField('Photo', validators=[FileRequired(),FileAllowed(ALLOWED_EXTENSIONS, 'File not allowed')])

class PostsForm(FlaskForm):
	photo = FileField('files[]', validators=[FileRequired(),FileAllowed(ALLOWED_EXTENSIONS, 'File not allowed')])
	caption = TextAreaField('Caption', validators = [InputRequired(),Length(max=200)])
