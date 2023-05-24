from .db import db
from sqlalchemy.sql import func
import json
from .user import Cart_listings


class Listing(db.Model):
    __tablename__ = 'listings'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    video_url = db.Column(db.String(255), nullable=True)
    image_urls = db.Column(db.Text(), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    price = db.Column(db.Numeric(6, 2), nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False,
                           server_default=func.now())
    updated_at = db.Column(
        db.DateTime(), onupdate=func.now(), default=func.now())

    users = db.relationship('User', back_populates='listings')
    reviews = db.relationship(
        'Review', back_populates='listings', cascade="all, delete")
    tags = db.relationship(
        'Tag', back_populates='listings', cascade="all, delete")
    cart_owners = db.relationship(
        "User",
        secondary='cart_listings',
        back_populates="listings",
        overlaps="cart_listings"
    )

    def owner(self):
        return self.users.to_dict()

    def listingId(self):
        return self.id

    def listingInfo(self):
        return {
            'name': self.name,
            'video_url': self.video_url,
            'image_urls': json.loads(self.image_urls.replace("'", '"')),
            'description': self.description,
            "price": str(self.price),
            'owner_id': self.owner_id,
        }

    def to_dict(self):
        reviews = [review.to_dict() for review in self.reviews]
        return {
            'id': self.id,
            'name': self.name,
            'video_url': self.video_url,
            'image_urls': json.loads(self.image_urls.replace("'", '"')),
            'description': self.description,
            "price": str(self.price),
            'owner_id': self.owner_id,
            'owner': self.users.info(),
            'tags': self.tags[0].to_list() if self.tags else [],
            'reviews': reviews,
            'created_at': self.created_at.strftime('%m/%d/%Y %H:%M:%S'),
            'updated_at': self.updated_at.strftime('%m/%d/%Y %H:%M:%S')
        }
