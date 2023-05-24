from .db import db
from sqlalchemy.sql import func
import json


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    rating = db.Column(db.Numeric(3, 2), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey(
        'listings.id'), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           server_default=func.now())
    updated_at = db.Column(
        db.DateTime(), onupdate=func.now(), default=func.now())

    listings = db.relationship('Listing', back_populates='reviews')
    users = db.relationship('User', back_populates='reviews')

    def reviewId(self):
        return self.id

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'rating': str(self.rating),
            'listing_id': self.listing_id,
            'listing_info': self.listings.listingInfo(),
            'owner_id': self.owner_id,
            'owner': self.users.info(),
            'created_at': self.created_at.strftime('%m/%d/%Y %H:%M:%S'),
            'updated_at': self.updated_at.strftime('%m/%d/%Y %H:%M:%S')
        }
