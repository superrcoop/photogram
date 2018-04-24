from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField
from wtforms.validators import Required, InputRequired, Email,Length, EqualTo, DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

class LoginForm(FlaskForm):

	username = StringField('Username', validators = [InputRequired('Please provide an email address')])
	password = PasswordField('Password', validators = [InputRequired()])

class RegistrationForm(FlaskForm):
	username = StringField('Username', validators = [InputRequired()])
	password = PasswordField('Enter Password',validators=[DataRequired('Enter a Password'),EqualTo('conf_password',message=('Passwords must Match'))])
	conf_password=PasswordField('Repeat Password',validators=[DataRequired('Re-enter password')])
	firstname = StringField('Firstname', validators = [InputRequired()])
	lastname = StringField('Lastname', validators = [InputRequired()])
	email =  StringField('Email', validators=[Email(message='Email not valid')])
	location = StringField('Location', validators = [InputRequired()])
	biography = TextAreaField('Biography', validators=[InputRequired(), Length(max=200)])
	photo = FileField('files[]', validators=[FileRequired(),FileAllowed(ALLOWED_EXTENSIONS, 'File not allowed')])

class PostsForm(FlaskForm):
	photo = FileField('files[]', validators=[FileRequired(),FileAllowed(ALLOWED_EXTENSIONS, 'File not allowed')])
	caption = TextAreaField('Caption', validators = [InputRequired(),Length(max=100)])