from flask_wtf import FlaskForm
from wtforms import StringField, FileField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError


class ReviewForm(FlaskForm):
    rating = DecimalField(
        'rating', validators=[DataRequired()])
    content = StringField(
        'content', validators=[DataRequired()])
