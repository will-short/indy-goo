from flask_wtf import FlaskForm
from wtforms import StringField, FileField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError


class ListingForm(FlaskForm):
    name = StringField(
        'name', validators=[DataRequired()])
    description = StringField(
        'description', validators=[DataRequired()])
    price = DecimalField("price")
    video = FileField("video")
    image1 = FileField("image1", validators=[DataRequired()])
    image2 = FileField("image2", validators=[DataRequired()])
    image3 = FileField("image3")
    image4 = FileField("image4")
    image5 = FileField("image5")
    tags = StringField("tags")
