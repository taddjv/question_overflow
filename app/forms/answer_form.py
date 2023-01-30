from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Answer


def valid_picture(form,field):
    #checks if the picture is a .png or .jpg
    picture_url = field.data
    if ".jpg" not in picture_url or ".png" not in picture_url:
        raise ValidationError("Not a valid image.")


class AnswerForm(FlaskForm):
    answer = StringField("answer", validators=[DataRequired()])
    url = StringField("url", validators=[valid_picture])
