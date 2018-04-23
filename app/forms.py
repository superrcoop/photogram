from wtforms import StringField
from wtforms.validators import Required 
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

class upload_Form(FlaskForm):
    description = StringField('Description', validators=[Required('Please provide a description')])
    upload = FileField('files[]', validators=[FileRequired(),FileAllowed(ALLOWED_EXTENSIONS, 'File not allowed')])
