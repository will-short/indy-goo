from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func


class Cart_listings(db.Model):
    __tablename__ = 'cart_listings'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
    )
    listing_id = db.Column(
        db.Integer,
        db.ForeignKey("listings.id"),
    )


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(260), nullable=True,
                          default="https://res.cloudinary.com/dc9htgupc/image/upload/v1636503578/ck9zfxgjkh8ovbvsczmu.png")
    created_at = db.Column(db.DateTime(), nullable=False,
                           server_default=func.now())
    updated_at = db.Column(
        db.DateTime(), onupdate=func.now(), default=func.now())

    listings = db.relationship('Listing', back_populates='users')
    reviews = db.relationship('Review', back_populates='users')
    cart_listings = db.relationship(
        "Listing",
        secondary='cart_listings',
        back_populates="users",
        cascade="all, delete"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def info(self):
        return{
            'username': self.username,
            'email': self.email,
            'image_url': self.image_url
        }

    def to_dict(self):
        listingInfo = [listing.to_dict()
                       for listing in self.listings[::-1]]

        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'image_url': self.image_url,
            'listings': listingInfo,
            'cart_listings': [listing.listingInfo() for listing in self.cart_listings],
            'reviews': [review.to_dict() for review in self.reviews],
            'created_at': self.created_at.strftime('%m/%d/%Y %H:%M:%S'),
            'updated_at': self.updated_at.strftime('%m/%d/%Y %H:%M:%S')
        }
