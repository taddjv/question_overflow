from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Question


def valid_picture(form, field):
    # checks if the picture is in correct format
    picture_url = field.data
    if len(picture_url):
        if not picture_url.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tif', '.tiff')):
            raise ValidationError("Not a valid image.")


class QuestionForm(FlaskForm):
    question = StringField("question", validators=[DataRequired()])
    detail = StringField("detail")
    url = StringField("url", validators=[valid_picture])
