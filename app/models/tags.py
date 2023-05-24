from .db import db


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    action = db.Column(db.Boolean())
    adventure = db.Column(db.Boolean())
    rpg = db.Column(db.Boolean())
    mmo = db.Column(db.Boolean())
    casual = db.Column(db.Boolean())
    sports = db.Column(db.Boolean())
    simulation = db.Column(db.Boolean())
    strategy = db.Column(db.Boolean())
    racing = db.Column(db.Boolean())
    rts = db.Column(db.Boolean())
    horror = db.Column(db.Boolean())
    platformer = db.Column(db.Boolean())
    listing_id = db.Column(db.Integer, db.ForeignKey(
        'listings.id'), nullable=False)

    listings = db.relationship('Listing', back_populates='tags')

    def to_list(self):
        print([tag for tag in self.__dict__ if self.__dict__[tag]
              == True and tag != "id" and tag != "listing_id"])
        return [tag for tag in self.__dict__ if self.__dict__[tag] == True and tag != "id" and tag != "listing_id"]
