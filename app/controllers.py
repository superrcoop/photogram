from .models import Users
import os 
from .forms import ALLOWED_EXTENSIONS

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

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_uploaded_images(user_URI):
    rootdir = os.getcwd()
    for subdir,dirs,files in os.walk(rootdir +user_URI[1:-1]):
        for file in files:
            ls=os.path.join(subdir,file).split('/')[-2:]
    return '/'.join(ls)